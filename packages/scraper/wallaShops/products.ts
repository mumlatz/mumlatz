import cheerio from "cheerio";
import axios from "axios";
import {URL} from "./constant";

const PRODUCTS_ELEMENT_SELECTOR = "#product-search-results > div > div.products-grid.l-col-sm-12.l-col-lg-10 > div.b-product-grid-wrapper > div > div > div.b-plp-section.l-container--d-lg.wal-product-grid.js-wal-product-grid > div > div > div.b-product-details-wrapper > div.b-product-details > div.b-product-link-wrapper > a"
const PRODUCTS_IN_PAGE_COUNT_ELEMENT_SELECTOR = "#product-search-results > div > div.products-grid.l-col-sm-12.l-col-lg-10 > div.b-product-grid-wrapper > div > div > div.l-col-12.grid-footer.b-plp-load-more > div > div.b-category-search-results-wrapper > span.product-search-count"

const searchQueryParam = (end: number | `${number}`, start: number | `${number}` = 0) => `?cgid=736&srule=Predictive%20Sorting&start=${start}&sz=${end}`

const getProductsInCategoryCount = async (categoryUrl: string) => {
	const {data} = await axios.get(categoryUrl)
	const $ = await cheerio.load(data)
	
	const productsInPageCountElement = $(PRODUCTS_IN_PAGE_COUNT_ELEMENT_SELECTOR)
	
	return productsInPageCountElement.text()
}

export const mapProductsLinksList = async (categoryUrl: string) => {
	const productsInCategoryCount = await getProductsInCategoryCount(categoryUrl)
	const searchQuery = searchQueryParam(parseInt(productsInCategoryCount))
	const searchUrl = `${categoryUrl}${searchQuery}`
	const {data} = await axios.get(searchUrl)
	const $ = await cheerio.load(data)
	
	const $productsElement = $(PRODUCTS_ELEMENT_SELECTOR)
	
	return $productsElement
		.map((i, el) => $(el).attr("href"))
		.get()
		.map((item) => item.startsWith("http") ? item : `${URL}${item}`)
}
