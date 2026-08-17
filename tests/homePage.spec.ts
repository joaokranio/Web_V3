import { test, expect } from '../fixtures/home.fixture'
import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'

test('Abrir menu "Clientes"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/indicadores')

    // Quando clico no menu "clientes"
    await home.menuComercial.click()
    await home.menuClientes.click()

    // Então devo ser redirecionado para a tela de clientes
    await page.waitForURL('/#/comercial/clientes')
    
})

test('Abrir menu "Pedidos de Venda"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/indicadores')
    
    // Quando clico no menu "Pedidos de Vendas"
    await home.menuComercial.click()
    await home.menuPedidosVendas.click()
    
    // Então devo ser redirecionado para a tela de Pedidos de Vendas
    await page.waitForURL('/#/comercial/pedidos')
    
})

test('Abrir menu "Negativas"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/indicadores')
    
    // Quando clico no menu "Negativas"
    await home.menuComercial.click()
    await home.menuNegativas.click()
    
    // Então devo ser redirecionado para a tela de Negativas
    await page.waitForURL('/#/comercial/negativas')
    
})

test('Abrir menu "Pedidos de Compra"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/indicadores')
    
    // Quando clico no menu "Pedidos de Compra"
    await home.menuCompras.click()
    await home.menuPedidosCompra.click()
    
    // Então devo ser redirecionado para a tela de pedido de compra 
    await page.waitForURL('/#/compras/pedidos')
    
})

test('Abrir menu "Lista de Materiais"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/indicadores')
    
    // Quando clico no menu "Lista de Materiais"
    await home.menuMateriais.click()
    await home.menuListaMateriais.click()
    
    // Então devo ser redirecionado para a tela da Lista de materias
    await page.waitForURL('/#/material/materiais')
    
})

test('Abrir menu "Indicadores"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Lista de Materiais"
    await home.menuIndicadores.click()
    
    // Então devo ser redirecionado para a tela da Lista de materias
    await page.waitForURL('/#/indicadores')
    
})

test('Abrir menu "Configurações"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Configurações"
    await home.menuSuperior.click()
    await home.menuConfiguracoes.click()
    
    // Então devo ser redirecionado para a tela de configurações do Sistema
    // await page.waitForURL('/#/indicadores')
    
})

test('Abrir menu "Diagnostico"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Diagnostico"
    await home.menuSuperior.click()
    await home.menuDiagnostico.click()
    
    // Então devo ser redirecionado para a tela de diagnostico do Sistema
    await page.waitForURL('/#/diagnostico')
    
})

test('Abrir menu "Trocar Filial"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Trocar Filial"
    await home.menuSuperior.click()
    await home.menuTrocarFilial.click()
    
    // Então devo ser redirecionado para a tela para selecionar a filial
    await page.waitForURL('/#/trocar-filial')
    
})

test('Abrir menu "Sobre o Sistema"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Sobre o Sistema"
    await home.menuSuperior.click()
    await home.menuTrocarFilial.click()
    
    // Então devo ser redirecionado para a tela com informações Sobre o Sistema
    // await page.waitForURL('/#/troca-filial')
    
})

test('Abrir menu "Modo Escuro"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico na Switch do "Modo Escuro" deixando na posição "Ativa"
    await home.menuSuperior.click()
    await home.menuDark.click()
    
    // Então a tela do sistema deverá assumir o modo escuro(dark)
    // await page.waitForURL('/#/troca-filial')
    await page.waitForTimeout(2000)
    
})

test('Abrir menu "Sair"', { tag: ['@Critical', '@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Sobre o Sistema"
    await home.menuSuperior.click()
    await home.menuSair.click()
    
    // Então devo ser redirecionado para a tela de login do Sistema
    await page.waitForURL('/#/login')

})
