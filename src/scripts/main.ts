import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { ProfileBuilder } from './lib/profile';
import { Cookie, Page } from 'playwright';
import { cookies, SEARCH_PAGE_URL } from "./constant";

chromium.use(StealthPlugin());

async function get_data(browser: any, index: number): Promise<ProfileBuilder> {
  const profileBuilder = new ProfileBuilder(browser);
  const context = await profileBuilder.openContext();
  const profileWithContext = context.addCookies(cookies[index] as Cookie[]);
  const profile =  (await (await (await profileWithContext).createNewPage()).goToUrl(SEARCH_PAGE_URL))
  await scrollToBottom(profile.getCurrentPage()!);
  
  return profile;
}

async function scrollToBottom(page: Page) {
  let countPost = 0;
  let previousHeight

  while (true) {
    previousHeight = await page.evaluate('document.body.scrollHeight')
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    await page.waitForTimeout(7000) 

    const newHeight = await page.evaluate('document.body.scrollHeight')
    if (newHeight === previousHeight){
      console.log(countPost)
      break;
    }
    countPost++;
  }
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const profilePromises: Promise<ProfileBuilder>[] = [];

  for (let i = 0; i < 2; i++) {
    profilePromises.push(get_data(browser, i));
  }

  const resolvedProfiles = await Promise.all(profilePromises);
  resolvedProfiles.forEach(async (profile) => {
    profile.build()
  });

  await browser.close();
}

main();