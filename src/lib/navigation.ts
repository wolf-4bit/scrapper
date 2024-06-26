import { Page, BrowserContext } from 'playwright';

interface INavigation {
    setContext(context: BrowserContext): void;
    goToUrl(url: string): Promise<Navigation>;
    createNewPage(): Promise<Navigation>;
    waitForSelector(selector: string): Promise<Navigation>;
    waitforTimeout(time: number): Promise<Navigation>;
}


class Navigation implements INavigation{
    private current_page: Page | null = null;
    private browser_context: BrowserContext | null = null;

    constructor() { }
    private setCurrentPage(page: Page): void {
        this.current_page = page;
    }
    getCurrentPage(): Page | null {
        if (!this.current_page) {
            throw new Error('Page is not set');
        }
        return this.current_page;
    }
    setContext(context: BrowserContext): void {
        this.browser_context = context;
    }

    public async goToUrl(url: string): Promise<Navigation> {
        if (this.current_page) {
            await this.current_page.goto(url, {
                timeout: 0,
            });
        }
        return this;
    }

    public async createNewPage(): Promise<Navigation> {
        if (this.browser_context) {
            this.setCurrentPage(await this.browser_context.newPage());
        }
        return this;
    }

    public async waitForSelector(selector: string): Promise<Navigation> {
        if (this.current_page) {
            await this.current_page.waitForSelector(selector, {
                timeout: 0,
            })
        }
        return this;
    }
    public async waitforTimeout(time: number): Promise<Navigation> {
        if (this.current_page) {
            await this.current_page.waitForTimeout(time);
        }
        return this;
    }

}

export { INavigation, Navigation };