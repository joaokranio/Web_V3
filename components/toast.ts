import { Page, expect, Locator } from "@playwright/test"
export class Toast {
    readonly page: Page

    // Locators
    readonly toastMessage: Locator

    constructor(page: Page) {
        this.page = page

        this.toastMessage = page.locator('.p-toast-message-text')
    }

    async toast(message: string) {
        await expect(this.toastMessage).toHaveText(message, { timeout: 10000 })
    }

    // Função para capturar o HTML da página, útil para depuração
    async capturarHtml() {
        const html = await this.page.content()
        console.log(html)
    }

}
