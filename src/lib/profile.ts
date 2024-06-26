import { Cookie } from 'playwright';


class Profile {
  private account_name: string | null = null;
  private cookies: Cookie[] | null = null;
  constructor() {}

  public setAccountName(account_name: string): void {
    this.account_name = account_name;
  }

  public setCookies(cookies: Cookie[]): void {
    this.cookies = cookies;
  }

  public getAccountName(): string {
    return this.account_name!;
  }

  public getCookies(): Cookie[] {
    return this.cookies!;
  }
}

export { Profile };