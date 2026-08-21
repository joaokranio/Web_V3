import { test, expect } from '../fixtures/home.fixture'
import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'
import { Negativas } from '../pages/negativasPage'

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
    await expect(page.locator('tr th').getByText('Código', {exact:true })).toBeVisible()
    
})

test('Abrir menu "Negativas"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    const negativas = new Negativas(page)
    
    // Dado que estou na homepage
    await page.goto('/#/indicadores')
    
    // Quando clico no menu "Negativas"
    await home.menuComercial.click()
    await home.menuNegativas.click()
    
    // Então devo ser redirecionado para a tela de Negativas
    await page.waitForURL('/#/comercial/negativas')
    await expect(negativas.colCodigo).toBeVisible()
    
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
    await expect(page.locator('tr th').getByText('Código', {exact:true })).toBeVisible()
    
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
    await expect(page.locator('tr th').getByText('Código', {exact:true })).toBeVisible()
    
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

test.fixme('Abrir menu "Configurações"', { tag: ['@home'] }, async ({ page }) => {

    // Dado que estou na homepage

    // Quando clico no menu "Configurações"

    // Então devo ser redirecionado para a tela de configurações do Sistema

    // Página ainda não desenvolvida no sistema — cenário mantido apenas mapeado, para implementar quando a tela existir

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
    await expect(page.getByRole('columnheader',{name: 'Ação', exact: true})).toBeVisible()
    await expect(page.getByRole('columnheader',{name: 'Status', exact: true})).toBeVisible()
    await expect(page.getByRole('columnheader',{name: 'Detalhamento', exact: true})).toBeVisible()
    
})

test('Abrir menu "Trocar Filial"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    const login = new LoginPage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Trocar Filial"
    await home.menuSuperior.click()
    await home.menuTrocarFilial.click()
    
    // Então devo ser redirecionado para a tela para selecionar a filial
    await page.waitForURL('/#/trocar-filial')
    await expect(login.selectFilial).toBeVisible()
    
})

test.fixme('Abrir menu "Sobre o Sistema"', { tag: ['@home'] }, async ({ page }) => {

    // Dado que estou na homepage

    // Quando clico no menu "Sobre o Sistema"

    // Então devo ser redirecionado para a tela com informações Sobre o Sistema

    // Página ainda não desenvolvida no sistema — cenário mantido apenas mapeado, para implementar quando a tela existir

})

test('Abrir menu "Modo Escuro"', { tag: ['@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico na Switch do "Modo Escuro" deixando na posição "Ativa"
    await home.menuSuperior.click()
    await home.menuDark.click()
    
    // Então a tela do sistema deverá assumir o modo escuro(dark)
    await page.waitForTimeout(2000)
    
})

test('Abrir menu "Sair"', { tag: ['@critical', '@home'] }, async ({ page }) => {
    const home = new HomePage(page)
    const login = new LoginPage(page)
    
    // Dado que estou na homepage
    await page.goto('/#/dashboard')
    
    // Quando clico no menu "Sobre o Sistema"
    await home.menuSuperior.click()
    await home.menuSair.click()
    
    // Então devo ser redirecionado para a tela de login do Sistema
    await page.waitForURL('/#/login')
    await expect(login.btnEntrar).toBeVisible()

})
