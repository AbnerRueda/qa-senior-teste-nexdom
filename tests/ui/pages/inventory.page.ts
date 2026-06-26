import { Page } from '@playwright/test';
export class InventoryPage {
  readonly page: Page;
  readonly itemSelector = '.inventory_item';
  readonly addToCartBtn = (index: number) => `.inventory_item:nth-of-type(${index}) button`;
  readonly firstAddToCartBtn = '.inventory_item:first-of-type button';
  readonly shoppingCartLink = '.shopping_cart_link';
  readonly checkoutBtn = '[data-test="checkout"]';
  constructor(page: Page) {
    this.page = page;
  }
  async goto(url = '/') {
    await this.page.goto(url);
  }
  // mantém compatibilidade com chamadas que usam slug/nome
  async addItemToCart(itemNameSlug: string) {
    // seletor genérico por data-test se existir, fallback para primeiro botão
    const selector = `button[data-test="add-to-cart-${itemNameSlug}"]`;
    if (await this.page.$(selector)) {
      await this.page.click(selector);
    } else {
      await this.page.click(this.firstAddToCartBtn);
    }
  }
  // método requerido pelo spec: adiciona o primeiro item
  async addFirstItemToCart() {
    await this.page.click(this.firstAddToCartBtn);
  }
  async itemCount() {
    return (await this.page.$$(this.itemSelector)).length;
  }
  async goToCart() {
    await this.page.click(this.shoppingCartLink);
  }
  // move o fluxo de checkout — se o checkout for parte de outra página, 
  // aqui simulamos navegação e preenchimento pelos seletores comuns do desafio
  async checkout(firstName: string, lastName: string, postalCode: string) {
    // assume que já está no carrinho e existe botão checkout
    await this.page.click(this.checkoutBtn);
    // preencher formulário de checkout (seletor genérico)
    if (await this.page.$('[data-test="firstName"]')) {
      await this.page.fill('[data-test="firstName"]', firstName);
      await this.page.fill('[data-test="lastName"]', lastName);
      await this.page.fill('[data-test="postalCode"]', postalCode);
      await this.page.click('[data-test="continue"]');
      // finalizar
      await this.page.click('[data-test="finish"]');
    } else {
      // fallback: tentar seletores alternativos
      if (await this.page.$('#first-name')) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
        await this.page.click('#continue');
        await this.page.click('#finish');
      }
    }
  }
}
