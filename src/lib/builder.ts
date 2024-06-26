import { BrowserContext, Browser } from "playwright";
import { Profile } from "./profile";
import { PageInjector, IPageInjector } from "./injector";
import { Navigation, INavigation} from "./navigation";


class ProfileBuilder {
  private profile: Profile;
  public readonly navigation: INavigation;
  public readonly page_info: IPageInjector;
  private readonly browser: Browser
  private context: BrowserContext | null = null;

  constructor(browser: Browser) {
    this.browser = browser;
    this.profile = new Profile();
    this.navigation = new Navigation();
    this.page_info = new PageInjector(this.navigation, this.profile);
  }
  public async openContext(): Promise<ProfileBuilder> {
    this.context = await this.browser.newContext();
    this.navigation.setContext(this.context);
    this.page_info.setContext(this.context);
    return this;
  }
  public async closeBrowser(): Promise<ProfileBuilder> {
    if (this.browser) {
      await this.browser.close();
    }
    return this;
  }
  public closeContext(): void {
    if (this.context) {
      this.context.close();
    }
  }
  getProfile(): Profile {
    return this.profile;
  }

}


export {ProfileBuilder}