import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import { ENV } from '../config/env'
import { Toast } from '../components/toast'

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page)
    await login.goto()
})

test('Deve permitir login com credenciais válidas', { tag: ['@critical', '@smoke'] }, async ({ page }) => {
    const login = new LoginPage(page)
    const home = new HomePage(page)

    // Dado que preencho os campos com usuário se senha válido.
    await login.preencherUsuario(ENV.USER)
    await login.preencherSenha(ENV.PASSWORD)

    // Quando clico no botão "Entrar".
    await login.btnEntrar.click()


    // E selecionei a filial e clico em confirmar.
    await login.selecionarFilial()
    await login.btnConfirmar.click()

    // Então devo ver a pagina logada do sistema.
    await expect(home.menuUser).toBeVisible()

})

test('Não deve permitir login com usuário inválido', { tag: ['@critical', '@smoke'] }, async ({ page }) => {
    const login = new LoginPage(page)
    const toast = new Toast(page)
    const message = 'Usuário ou senha inválido.'

    // Dado que eu preencho um usuário incorreto.
    await login.preencherUsuario('SSSS')
    await login.preencherSenha('SSSS')

    // Quando clico no botão Entrar.
    await login.btnEntrar.click()

    // Então o sistema exibe uma mensagem de erro.
    await toast.toast(message)

})

test('Deve exibir toast ao falhar login', { tag: ['@smoke'] }, async ({ page }) => {
    const login = new LoginPage(page)
    const toast = new Toast(page)
    const message = 'Usuário ou senha inválido.'

    // Dado que eu informei o usuário correto mas a senha incorreta
    await login.preencherUsuario(ENV.USER)
    await login.preencherSenha('SSSS')

    // Quando clico no botão Entrar.
    await login.btnEntrar.click()

    // Então o sistema deverá exibir a mensagem "Usuário ou senha inválido." 
    await toast.toast(message)

})

test('Validar campos obrigatórios', { tag: ['@smoke'] }, async ({ page }) => {
    const login = new LoginPage(page)
    
    // Dado que eu não preencho os campos na área de login.
    await login.preencherUsuario('')
    await login.preencherSenha('')
    
    // Quando clico no botão Entrar.
    await login.btnEntrar.click()

    // Então o sistema me informa que os campos são obrigatórios.
    const mensagem = 'O campo não pode ser vazio.'
    await expect(login.messageAlert.nth(0)).toHaveText(mensagem)
    await expect(login.messageAlert.nth(1)).toHaveText(mensagem)
    
})

test('Manter o usuário preenchido após selecionar "Lembrar meus dados"', { tag: ['@smoke'] }, async ({ page }) => {
    const login = new LoginPage(page)
    const home = new HomePage(page)
    
    //Dado que o usuário está na tela de login
    //E informa um usuário e uma senha válidos
    await login.preencherUsuario(ENV.USER)
    await login.preencherSenha(ENV.PASSWORD)
    
    //E marca a opção "Lembrar meus dados"
    await login.rememberMe.click()
    
    //Quando realiza o login no sistema
    await login.btnEntrar.click()
    await login.selecionarFilial()
    await login.btnConfirmar.click()
    
    //E efetua o logout
    await home.menuSuperior.click()
    await home.menuSair.click()
    
    //Então o campo "Usuário" deve permanecer preenchido com o último usuário utilizado
    await expect(login.inputUsuario).toHaveValue(ENV.USER)
    
    //E a opção "Lembrar meus dados" deve permanecer marcada
    await expect(login.rememberMe).toBeChecked()

})

test('Validar mensagem de quantidade de digitação máxima de caracteres',{tag:['@smoke']}, async ({page})=>{
    const login = new LoginPage(page)
    const message = 'O campo não pode exceder 20 caracteres.'

    // Dado que estou na tela de login
    await expect(login.btnEntrar).toBeVisible()
    
    // Quando informe mais de 20 caracteres no campo de digitação
    await login.preencherUsuario('dlgkdlgkdlkgdlkgldkls')

    // Então logo abaixo do campo usuário deverá aparecer uma mensagem em vermelho.
    await expect(login.messageAlert).toHaveText(message)

})

test('Validar a funcionalidade do botão exibir senha',{tag:['@smoke']}, async ({page})=>{
    const login = new LoginPage(page)

    // Dado que preenchi o campo senha e a mesma é apresentado oculta
    await login.preencherSenha('SSSSS')
    await expect(login.inputSenha).toHaveAttribute('type', 'password')

    // Quando clico no botão para exiber senha
    await page.locator('svg.p-icon').click()

    // Então devo ver os caracteres digitados ao invés de ocultos por pontos.
    await expect(login.inputSenha).toHaveAttribute('type', 'text')

})