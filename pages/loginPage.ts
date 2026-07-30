import {Locator, Page} from '@playwright/test'
import { ENV } from '../config/env'

export class LoginPage {
    readonly page: Page;

    // Locators
    readonly inputUsuario: Locator
    readonly inputSenha: Locator
    readonly selectFilial: Locator

    // Buttons
    readonly btnEntrar: Locator 
    readonly btnConfirmar: Locator
    
    // Genérico
    readonly messageAlert: Locator
    readonly rememberMe: Locator
    
    

    constructor(page: Page) {
        this.page = page

        this.inputUsuario = page.locator('#login-input-usuario')
        this.inputSenha = page.locator('#login-input-senha input')
        this.selectFilial = page.locator('#filiais')

        // Buttons
        this.btnEntrar = page.locator('button', {hasText:'Entrar'})
        this.btnConfirmar = page.locator('button', {hasText:'Confirmar'})
        
        // Genérico
        this.messageAlert = page.locator('div.p-message-text')
        this.rememberMe = page.locator('#rememberMe')

    }

    async goto() {
        await this.page.goto(ENV.BASE_URL)
    }

    async preencherUsuario(Usuario:string): Promise<void> {
        await this.inputUsuario.fill(Usuario)

    }

    async preencherSenha(Password:string): Promise<void> {
        await this.inputSenha.fill(Password)
    }

    async selecionarFilial(): Promise<void> {
        await this.selectFilial.click()
        const opcaoFilial = this.page.locator(`#filiais_0`)
        await opcaoFilial.click()

    }

    async entrar(): Promise<void> {
        await this.btnEntrar.click()

    }

    async confirmar(): Promise<void> {
        await this.btnConfirmar.click()

    }

    async login(): Promise<void> {
        await this.goto()
        await this.preencherUsuario(ENV.USER)
        await this.preencherSenha(ENV.PASSWORD)
        await this.entrar()
        await this.selecionarFilial()
        await this.confirmar()

    }

}