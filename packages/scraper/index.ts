import {mapProductsLinksList} from "./wallaShops/products"
import {getProductDetails} from "./wallaShops/productDetails"
import {getAllCategories} from "./wallaShops/categoriesMapper"

export const saveData = (data) => {

}

export async function wallaShops() {
	// all the categories can be listed with the following line of code...
	// const categoriesList = await getAllCategories()
	
	// it might be a better practice when we'll use the full categories
	// list to save them in a file or in the DB and update it once in a while...
	
	// for now I've hardcoded the categories list with the following categories:
	const categoriesList: Record<string, any>[] = [
		{
			title: 'מסכי טלוויזיה',
			link: "https://www.wallashops.co.il/אלקטרוניקה/טלויזיות-ומסכים/מסכי-טלויזיה",
		},
		{
			title: 'מחשבים ניידים',
			link: "https://www.wallashops.co.il/אלקטרוניקה/מחשבים-וציוד-היקפי/מחשבים-ניידים",
		},
		{
			title: 'טלפונים סלולרים וסמארטפונים',
			link: "https://www.wallashops.co.il/סלולר-ותקשורת/טלפונים-סלולרים-וסמארטפונים",
		},
		{
			title: 'אוזניות',
			link: "https://www.wallashops.co.il/אלקטרוניקה/אוזניות-ורמקולים/אוזניות",
		},
		{
			title: 'מכונות כביסה',
			link: "https://www.wallashops.co.il/מוצרי-חשמל/מכונות-כביסה-מייבשים-ומגהצים/מכונות-כביסה",
		},
	]
	
	
	for (const category of categoriesList) {
		category.productsLinks = await mapProductsLinksList(category.link)
		
		
		for (const productLink of category.productsLinks) {
			const productDetails = await getProductDetails(productLink)
			
			category.products = [...(category.products || []), productDetails]
		}
	}
	
	saveData(categoriesList)
}

(async () => await wallaShops())()
