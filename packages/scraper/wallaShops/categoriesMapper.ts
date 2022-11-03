import cheerio from "cheerio"
import axios from "axios"
import {URL} from "./constant"

const SUB_CATEGORIES_CONTAINER_ELEMENT_SELECTOR = "#main > div.l-category-landing.l-container--lg > div.l-row > div.l-main-content-wrapper.l-col-12.l-col-lg-10 > div.s-categories-strip.js-categories-strip.h-hide-sm.h-hide-md > ul"
const SUB_CATEGORY_ELEMENT_SELECTOR = "div.b-subcategories > :first-child"

const buildCategoriesList = ($categories: cheerio.Cheerio): { title: string, link: string }[] => {
	const $ = cheerio.load($categories.html())
	
	const textList = $categories
		.map((i, el) => $(el).text())
		.get()
		.map((item) => item.replace(/[\n\t]/g, ""))
	
	const linksList = $categories
		.map((i, el) => $(el).attr("href"))
		.get()
		.map((item) => item.startsWith("http") ? item : `${URL}${item}`)
	
	return textList.map((item, i) => ({title: item, link: linksList[i]}))
}

const getMainCategories = async (url: string): Promise<Record<string, string>[]> => {
	const {data} = await axios.get(url)
	const $ = cheerio.load(data)
	
	const $mainCategories = $(".first-level-list .first-level-list-item > a")
	
	return buildCategoriesList($mainCategories)
}

const getSubCategoriesContainer = async (url: string) => {
	const {data} = await axios.get(url)
	const $ = cheerio.load(data)
	
	return $(SUB_CATEGORIES_CONTAINER_ELEMENT_SELECTOR)
}

const getSubCategories = async (url: string) => {
	const $subCategoriesContainer = await getSubCategoriesContainer(url)
	
	if ($subCategoriesContainer.length === 0) return 'no sub categories'
	
	const $ = cheerio.load($subCategoriesContainer.html())
	
	const $subCategories = $(SUB_CATEGORY_ELEMENT_SELECTOR)
	
	if ($subCategories.length === 0) return 'no sub categories'
	
	return buildCategoriesList($subCategories)
}

const getNestedSubCategories = async (url: string) => {
	const subCategories = await getSubCategories(url)
	
	if (subCategories === 'no sub categories') return
	
	const flattenCategories = []
	
	for (const categoryObject of subCategories) {
		const categories = await getSubCategories(categoryObject.link)
		
		if (categories !== 'no sub categories')
			flattenCategories.push(...categories)
		
		if (categories === 'no sub categories')
			flattenCategories.push(categoryObject)
	}
	
	return flattenCategories
}

export const getAllCategories = async () => {
	const categories = await getMainCategories(URL)
	
	const flattenCategories = []
	
	for (const categoryObject of categories) {
		const categories = await getNestedSubCategories(categoryObject.link)
		
		flattenCategories.push(...categories)
	}
	
	return flattenCategories
}
