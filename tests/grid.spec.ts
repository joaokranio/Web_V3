import { expect, test } from '../fixtures/api.fixture'
import { Pesquisa } from '../components/pesquisa'
import { BotoesGrid } from '../components/botoesGrid'
import { Negativas } from '../pages/negativasPage'
import { ClientePage } from '../pages/clientePage'

test.describe('Validação comportamento colunas', () => {
    test('Validar a ordenação das colunas tipo numérico crescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        await page.goto('/#/comercial/negativas')

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        // Quando clico na coluna "Codigo" para ordenar
        await negativas.colMotivo.click()

        // Captura os valores da coluna "Codigo" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(3)').allTextContents()
        const ordenados = [...codigosDepois].sort((a, b) => Number(a) - Number(b))

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar a ordenação das colunas tipo numérico decrescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        await page.goto('/#/comercial/negativas')


        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        //Captura os valores da coluna "Codigo" ao entrar na tela
        const codigos = await page.locator('tbody tr td:nth-child(3)').allTextContents()
        // Ordena os valores da coluna "Codigo" em ordem decrescente
        const ordenados = [...codigos].sort((a, b) => Number(b) - Number(a))

        // Quando clico na coluna "Codigo" para ordenar
        await negativas.colMotivo.click()
        await negativas.colMotivo.click()

        // Captura os valores da coluna "Codigo" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(3)').allTextContents()

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar a ordenação das colunas tipo texto crescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        await page.goto('/#/comercial/negativas')

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        //Captura os valores da coluna "Descricao(Motivo)" ao entrar na tela
        const lista = await page.locator('tbody tr td:nth-child(4)').allTextContents()
        // Ordena os valores da coluna "Descricao(Motivo)" em ordem crescente
        const ordenados = [...lista].sort((a, b) => a.localeCompare(b))

        // Quando clico na coluna "Descricao(Motivo)" para ordenar
        await negativas.colDescricao.click()

        // Captura os valores da coluna "Descricao(Motivo)" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar a ordenação das colunas tipo texto decrescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        await page.goto('/#/comercial/negativas')

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        //Captura os valores da coluna "Descrição(Motivo)" ao entrar na tela
        const codigos = await page.locator('tbody tr td:nth-child(4)').allTextContents()
        // Ordena os valores da coluna "Descricao(Motivo)" em ordem decrescente
        const ordenados = [...codigos].sort((a, b) => b.localeCompare(a))

        // Quando clico na coluna "Descricao(Motivo)" para ordenar
        await negativas.colDescricao.click()
        await negativas.colDescricao.click()

        // Captura os valores da coluna "Descricao(Motivo)" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar a ordenação das colunas tipo Data crescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const cliente = new ClientePage(page)
        const pesquisa = new Pesquisa(page)

        const registro = 'WAL'

        // Dado que estou na telda de cadastro de clientes 
        await page.goto('#/comercial/clientes')
        await expect(cliente.topo).toBeVisible()
        await cliente.colFantasia.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strComecaCom.click()    
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()

        //Captura os valores da coluna "Dt. Cadastro" ao entrar na tela
        const dtOriginal = await page.locator('tbody tr td:nth-child(25)').allTextContents()

        // Quando clico na coluna "Dt. Cadastro" 1x
        await cliente.colDtCadastro.click()

        // Ordena os valores da coluna "Dt. Cadastro" em ordem crescente
        const dtOrdenados = [...dtOriginal].sort((a, b) => {
            const [diaA, mesA, anoA] = a.trim().split('/').map(Number)
            const [diaB, mesB, anoB] = b.trim().split('/').map(Number)

            return new Date(anoA, mesA - 1, diaA).getTime() -
                new Date(anoB, mesB - 1, diaB).getTime()
        })

        // Captura os valores da coluna "Dt. Cadastro" após clicar na coluna para ordenar
        const dtDepois = await page.locator('tbody tr td:nth-child(25)').allTextContents()

        // Então a grid deverá ser recarregada e ordenada de forma crescente por data 
        expect(dtDepois).toEqual(dtOrdenados)

    })

    test('Validar a ordenação das colunas tipo Data decrescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const cliente = new ClientePage(page)
        const pesquisa = new Pesquisa(page)

        const registro = 'WAL'

        // Dado que estou na telda de cadastro de clientes 
        await page.goto('#/comercial/clientes')
        await expect(cliente.topo).toBeVisible()
        await cliente.colFantasia.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strComecaCom.click()    
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()

        //Captura os valores da coluna "Dt. Cadastro" ao entrar na tela
        const dtOriginal = await page.locator('tbody tr td:nth-child(25)').allTextContents()
        console.log('original', dtOriginal)

        // Quando clico na coluna "Dt. Cadastro" 2x
        await cliente.colDtCadastro.click()
        await cliente.colDtCadastro.click()

        // Ordena os valores da coluna "Dt. Cadastro" em ordem decrescente
        const dtOrdenados = [...dtOriginal].sort((b, a) => {
            const [diaA, mesA, anoA] = a.trim().split('/').map(Number)
            const [diaB, mesB, anoB] = b.trim().split('/').map(Number)

            return new Date(anoA, mesA - 1, diaA).getTime() -
                new Date(anoB, mesB - 1, diaB).getTime()
        })

        // Captura os valores da coluna "Dt. Cadastro" após clicar na coluna para ordenar
        const dtDepois = await page.locator('tbody tr td:nth-child(25)').allTextContents()

        // Então a grid deverá ser recarregada e ordenada de forma decrescente por data 
        expect(dtOrdenados).toEqual(dtDepois)
        
    })

    test('Validar o comportamento do botão "X" dentro do filtro da coluna', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        // Dado que cliquei no ícone de filtro de uma coluna
        await negativas.colMotivo.locator('..').locator('button').click()

        // Quando clico no botão "X" dentro do filtro da coluna
        await expect(page.locator('div.p-datatable-filter-overlay')).toBeVisible()
        await pesquisa.botaoPesquisarX.click()

        // Então o filtro deverá ser fechado e a grid recarregada com todas as informações
        await expect(page.locator('div.p-datatable-filter-overlay')).not.toBeVisible()

    })

    test.fixme('BUG-614 Azure | Validar o comportamento do botão "+ Adicionar Regra" dentro do filtro da coluna', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        // Dado que cliquei no ícone de filtro de uma coluna
        await negativas.colMotivo.locator('..').locator('button').click()

        // Quando clico no botão "+ Adicionar Regra" dentro do filtro da coluna
        await expect(page.locator('div.p-datatable-filter-overlay')).toBeVisible()
        await pesquisa.botaoPesquisarAddRegra.click()

        // Então então deverá ser exibido um novo campo para selecionar a opção/condição da pesquisa e o campo para preencher a informação a ser pesquisada
        await expect(pesquisa.botaoPesquisarRemoverRegra).toBeVisible()

    })

    test.fixme('BUG-614 Azure | Validar o comportamento do botão "Remover Regra" dentro do filtro da coluna', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        // Dado que cliquei no ícone de filtro de uma coluna
        await negativas.colMotivo.locator('..').locator('button').click()

        // E adicionei uma nova regra de pesquisa
        await expect(page.locator('div.p-datatable-filter-overlay')).toBeVisible()
        await pesquisa.botaoPesquisarAddRegra.click()

        // Quando clico no botão "Remover Regra" dentro do filtro da coluna
        await pesquisa.botaoPesquisarRemoverRegra.click()

        // Então então essa regra de pesquisa deverá ser removida
        await expect(pesquisa.botaoPesquisarRemoverRegra).not.toBeVisible()

    })

    test('Validar o funcionamento do filtro tipo "Numérico" usando o "É igual a"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        // Captura os valores da coluna "Codigo" ao entrar na tela
        const lista = await page.locator('tbody tr td:nth-child(2)').allTextContents()

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "Numérico" e selecionei a opção "É igual a"
        await negativas.colCodigo.locator('..').locator('button').click()

        // Quando preencho o campo de pesquisa com um valor numérico e clico no botão "Aplicar"
        await pesquisa.inputPesquisa.pressSequentially('138')
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(2)').allTextContents()

        // Então a grid deverá ser filtrada de acordo com o valor informado no campo de pesquisa
        expect(resultado).toEqual(['138'])

    })

    test.fixme('BUG-615 Azure | Validar o funcionamento do filtro tipo "Numérico" usando o "Não é igual a"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        // Captura os valores da coluna "Codigo" ao entrar na tela
        const lista = await page.locator('tbody tr td:nth-child(2)').allTextContents()
        console.log('Lista : ', lista)

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "Numérico" e selecionei a opção "Não é igual a"
        await negativas.colCodigo.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.nunNaoIgual.click()

        // Quando qundo preencho o campo de pesquisa com um valor numérico e clico no botão "Aplicar"
        await pesquisa.inputPesquisa.pressSequentially('138')
        await pesquisa.botaoPesquisarOK.click()

        const listaResultado = await page.locator('tbody tr td:nth-child(2)').allTextContents()
        console.log(listaResultado)

        // Então a grid deverá ser filtrada e o valor informado no campo de pesquisa não deverá ser exibido na grid

    })

    test('Validar o funcionamento do filtro tipo "Numérico" usando o "É menor que"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 155

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "Numérico" e selecionei a opção "É menor que"
        await negativas.colCodigo.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.nunMenorQue.click()

        // Quando preencho o campo de pesquisa com um valor numérico e clico no botão "Aplicar"
        await pesquisa.inputPesquisa.pressSequentially('155')
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(2)').allTextContents()

        // Então a grid deverá ser filtrada e os dados exibidos deverão ser menores que o valor informado no campo de pesquisa
        expect(resultado.every(valor => Number(valor) < registro)).toBe(true)

    })

    test('Validar o funcionamento do filtro tipo "Numérico" usando o "É menor ou igual a"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 155

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "Numérico" e selecionei a opção "É menor ou igual a"
        await negativas.colCodigo.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.nunMenorIgual.click()

        // Quando preencho o campo de pesquisa com um valor numérico e clico no botão "Aplicar"
        await pesquisa.inputPesquisa.pressSequentially('155')
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(2)').allTextContents()

        // Então a grid deverá ser filtrada e os dados exibidos deverão ser menores ou iguais ao valor informado no campo de pesquisa
        expect(resultado.every(valor => Number(valor) <= registro)).toBe(true)

    })

    test('Validar o funcionamento do filtro tipo "Numérico" usando o "É maior que"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 155

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "Numérico" e selecionei a opção "É maior que"
        await negativas.colCodigo.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.nunMaiorQue.click()

        // Quando preencho o campo de pesquisa com um valor numérico e clico no botão "Aplicar"
        await pesquisa.inputPesquisa.pressSequentially('155')
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(2)').allTextContents()

        // Então a grid deverá ser filtrada e os dados exibidos deverão ser maiores que o valor informado no campo de pesquisa
        expect(resultado.every(valor => Number(valor) > registro)).toBe(true)

    })

    test('Validar o funcionamento do filtro tipo "Numérico" usando o "É maior ou igual a"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 155

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "Numérico" e selecionei a opção "É maior ou igual a"
        await negativas.colCodigo.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.nunMaiorIgual.click()

        // Quando preencho o campo de pesquisa com um valor numérico e clico no botão "Aplicar"
        await pesquisa.inputPesquisa.pressSequentially('155')
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(2)').allTextContents()

        // Então a grid deverá ser filtrada e os dados exibidos deverão ser maiores ou iguais ao valor informado no campo de pesquisa
        expect(resultado.every(valor => Number(valor) >= registro)).toBe(true)

    })

    test('Validar o funcionamento do filtro tipo "String" usando o "É igual a"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 'PREÇO'

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "String" e selecionei a opção "É igual a"
        await negativas.colDescricao.locator('..').locator('button').click()

        // Quando clico no ícone de filtro da coluna "Descrição" e preencho o campo de pesquisa
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a grid deverá ser filtrada de acordo com o valor informado no campo de pesquisa (texto exato)
        expect(resultado.length).toBeGreaterThan(0)
        expect(resultado.every(valor => valor === registro)).toBe(true)

    })

    test('Validar o funcionamento do filtro tipo "String" usando o "Começa com"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 'MERC'

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "String" e selecionei a opção "Começa com"
        await negativas.colFantasia.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strComecaCom.click()

        // Quando clico no ícone de filtro da coluna "Descrição" e preencho o campo de pesquisa
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(6)').allTextContents()

        // Então a grid deverá filtrar todos os registros que iniciam com a palavra digitada 
        for (const valor of resultado) {
            expect(valor.trim().startsWith(registro)).toBe(true)
        }

    })

    test('Validar o funcionamento do filtro tipo "String" usando o "Contem"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 'MA'

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "String" e selecionei a opção "Contem"
        await negativas.colDescricao.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strContem.click()

        // Quando no ícone de filtro da coluna "Descrição" e preencho o campo de pesquisa
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a grid deverá filtrar todos os registros que contem a palavra digitada
        expect(resultado.every(valor => valor.trim().includes(registro))).toBe(true)

    })

    test('Validar o funcionamento do filtro tipo "String" usando o "Não Contem"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 'MA'

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "String" e selecionei a opção "Não Contem"
        await negativas.colDescricao.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strNaoContem.click()

        // Quando no ícone de filtro da coluna "Descrição" e preencho o campo de pesquisa
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a grid deverá filtrar todos os registros que não contem a palavra digitada
        expect(resultado.every(valor => valor.trim().includes(registro))).toBe(false)

    })

    test('Validar o funcionamento do filtro tipo "String" usando o "Terminca com"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 'VISITA'

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "String" e selecionei a opção "Termina com"
        await negativas.colDescricao.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strTerminaCom.click()

        // Quando no ícone de filtro da coluna "Descrição (Motivo)" e preencho o campo de pesquisa
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a grid deverá filtrar todos os registros que terminam com a palavra digitada
        expect(resultado.every(valor => valor.trim().endsWith(registro))).toBe(true)

    })

    test.fixme('BUG-616 Azure | Validar o funcionamento do filtro tipo "String" usando o "Não é igual a "', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        await page.goto('/#/comercial/negativas')
        await expect(negativas.topo).toBeVisible()

        const registro = 'PREÇO'

        // Dado que cliquei no ícone de filtro de uma coluna do tipo "String" e selecionei a opção "Não é igual a"
        await negativas.colDescricao.locator('..').locator('button').click()
        await pesquisa.selectoPesquisa.click()
        await pesquisa.strNaoIgual.click()

        // Quando clico no ícone de filtro da coluna "Descrição (Motivo)" e preencho o campo de pesquisa
        await pesquisa.inputPesquisaStr.fill(registro)
        await pesquisa.botaoPesquisarOK.click()
        const resultado = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a grid deverá ser filtrada e não aprecentar os registro com a informação pesquisada
        expect(resultado.length).toBeGreaterThan(0)
        expect(resultado.every(valor => valor === registro)).toBe(false)

    })

})