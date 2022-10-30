import cheerio from "cheerio";
import axios from "axios";
export async function wallaShops() {
  const { data } = await axios.get("https://www.wallashops.co.il");
  const $ = cheerio.load(data);

  // extract main nav menu items
  const $mainCategories = $(".first-level-list .first-level-list-item > a");
  // get inner text from mainNavItems and remove all \n and \t
  const mainCategoriesText = $mainCategories
    .map((i, el) => $(el).text())
    .get()
    .map((item) => item.replace(/[\n\t]/g, ""));

  console.log(mainCategoriesText);
}

wallaShops();
