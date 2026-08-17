import { Page, expect, Locator } from "@playwright/test"
import { mkdir, writeFile } from "fs/promises"
import path from "path"

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
    // Salva em arquivo em vez de console.log porque o terminal trunca HTML grande,
    // impossibilitando copiar o conteúdo. O arquivo pode ser aberto no navegador/editor sem esse limite.
    async capturarHtml() {
        const html = await this.page.content()

        const pasta = path.join('test-results', 'debug-html')
        await mkdir(pasta, { recursive: true })

        const arquivo = path.join(pasta, `html-${Date.now()}.html`)
        await writeFile(arquivo, html)

        console.log(`HTML salvo em: ${arquivo}`)
    }

}
