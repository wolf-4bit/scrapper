import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { ProfileBuilder } from '../lib/builder';
import {LOGIN_PAGE_URL, ACCOUNT_NAME_SELECTOR } from "../constant";

chromium.use(StealthPlugin());

async function getProfile(browser: any): Promise<ProfileBuilder> {
    const profileBuilder = await new ProfileBuilder(browser).openContext();
    (await (await profileBuilder.navigation.createNewPage()).goToUrl(LOGIN_PAGE_URL)).waitForSelector(ACCOUNT_NAME_SELECTOR);
    profileBuilder.navigation.createNewPage().
}


async function main() {
  const browser = await chromium.launch({ headless: false});
  const profilePromises: Promise<ProfileBuilder>[] = [];

  for (let i = 0; i < 6; i++) {
    profilePromises.push(getProfile(browser));
  }
  const resolvedProfiles = await Promise.all(profilePromises);
  resolvedProfiles.forEach(async (profile) => {
    const profileBuilder = profile.build();
    await profileBuilder.saveCookies();
  });

  await browser.close();
}

main();