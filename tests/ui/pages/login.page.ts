import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async goto() {
    await this.page.goto(process.env.BASE_URL_UI || 'https://www.saucedemo.com');
  }
  async login(standard_user: string, secret_sauce: string) {
    await this.page.fill('#user-name', standard_user);
    await this.page.fill('#password', secret_sauce);
    await this.page.click('#login-button');
  }
}
