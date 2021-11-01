import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

async function fetchData(): Promise<{amount: number} | void> {
  let eurosAmount = '';

  try {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(process.env.URL || '');
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

export async function doesJackpotExceedLimits(): Promise<boolean | void> {
  try {
    const data = await fetchData();
    if (data && data.amount >= 100) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}
