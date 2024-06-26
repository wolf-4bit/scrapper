import { BrowserContext } from "playwright";
import { ACCOUNT_NAME_SELECTOR } from "src/constant";
import { Navigation, INavigation } from "./navigation";
import { Profile } from "./profile";

interface IPageInjector {
    saveAccountName(): Promise<PageInjector>;
    saveCookies(): Promise<PageInjector>;
  }


class PageInjector implements IPageInjector {
    private context: BrowserContext | null = null;
    private navigation: INavigation;
    private profile: Profile;
    constructor(navigation: Navigation, profile: Profile) { 
        this.navigation = navigation;
        this.profile = profile;
     }

    setContext(context: BrowserContext): void {
        this.context = context;
    }
    
    public async saveAccountName(): Promise<PageInjector> {
        if (this.context) {
          await this.navigation.waitForSelector(ACCOUNT_NAME_SELECTOR);
          this.profile.setAccountName(await this.navigation.getCurrentPage()!.innerText(ACCOUNT_NAME_SELECTOR));
        }
        return this;
      }

    public async saveCookies(): Promise<PageInjector> {
        if (this.context) {
          this.profile.setCookies(await this.context.cookies());
        }
        return this;
      }

      public addListener(): ProfileBuilder {
        if (this.currentPage) {
          this.currentPage.on('requestfinished', async (request) => {
            if (!request.url().startsWith(TWITTER_SEARCH_URL)) return;
            const resp = await request.response()!;
            const json = await resp!.json();
            console.log(json['data']['search_by_raw_query']);
          });
        }
        return this;
      }
    
    
}

export { IPageInjector, PageInjector}