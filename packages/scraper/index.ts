import cheerio from "cheerio";

export async function wallaShops() {
  const response = await cheerio.load("https://www.wallashops.co.il");
  console.log(response);
}

wallaShops();
