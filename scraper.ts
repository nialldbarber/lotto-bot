require('dotenv').config();

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
    console.error(err);
  }
}

type DoesExceedT = {
  doesExceed: boolean;
  amount?: number;
};

export async function doesJackpotExceedLimits(): Promise<DoesExceedT | void> {
  try {
    const data = await fetchData();
    if (data && data?.amount >= 100) {
      return {
        doesExceed: true,
        amount: data?.amount,
      };
    }
    return {
      doesExceed: false,
    };
  } catch (err) {
    console.error(err);
  }
}
