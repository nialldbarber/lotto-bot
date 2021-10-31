const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function fetchData(URL: string): Promise<{amount: number} | void> {
  let eurosAmount = '';

  try {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(URL);
    const html = await page.content();

    const $ = cheerio.load(html);
    const euros = $('.jackpots').find('.amount_large');

    eurosAmount = euros.text();
    eurosAmount = eurosAmount.trim().replace(/\D+/g, '');

    await browser.close();

    return {amount: parseInt(eurosAmount)};
  } catch (err) {
    console.log(err);
  }
}

export async function doesJackpotExceedLimits(URL: string) {
  try {
    const data = await fetchData(URL);
    if (data && data.amount >= 100) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}
