import axios from "axios";
import cheerio from "cheerio";
import {URL} from "./constant";

const PRODUCT_BRAND_SELECTOR = '#main > div.s-pdp.product-detail.js-product-detail > div.b-pdp-container > div.l-container > div.l-row > div.l-col-12.l-col-md-5.l-col-lg-6.l-col-xl-5.l-order-2.l-order-md-0 > div.b-pdp-product-info > div > ul > li.b-pdp-product-top-list-item.brand.h-hide-sm > a > span'
const PRODUCT_MODEL_SELECTOR = '#main > div.s-pdp.product-detail.js-product-detail > div.b-pdp-container > div.l-container > div.l-row > div.l-col-12.l-col-md-5.l-col-lg-6.l-col-xl-5.l-order-2.l-order-md-0 > div.b-pdp-product-info > div > ul > li:nth-child(2) > span.value.product-model.js-product-model'
const PRODUCT_IMAGE_SELECTOR = '#galleryModal > div > div > div.b-product-gallery-modal-body > div > div.l-col-12.l-col-md-7 > div > :first-child'

export const getProductDetails = async (productUrl: string) => {
	const {data} = await axios.get(productUrl)
	const $ = cheerio.load(data)
	
	const $productBrand = $(PRODUCT_BRAND_SELECTOR)
	const $productModel = $(PRODUCT_MODEL_SELECTOR)
	const $productImage = $(PRODUCT_IMAGE_SELECTOR)
	
	const productBrand = $productBrand.text().replace(/[\n\t]/g, "")
	const productModel = $productModel.text().replace(/[\n\t]/g, "")
	const productImage = $productImage.html().split('data-src="')[1].split('"')[0]
	
	return {
		brand: productBrand,
		model: productModel,
		image: `${URL}${productImage}`,
		technicalDetails: {}
	}
}
