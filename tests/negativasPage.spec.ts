import { expect, test } from '../fixtures/api.fixture'
import { Negativas } from '../pages/negativasPage'
import { Pesquisa } from '../components/pesquisa'
import { BotoesGrid } from '../components/botoesGrid'
import { Toast } from '../components/toast'
import { validarDataAtual, aguardarLookupsPreenchidos } from '../components'
import { negativaPayloads, MARCADOR_AUTOMACAO, identificarTeste } from '../test-data/negativaFactory'

test.beforeEach(async ({ page }) => {
    const negativas = new Negativas(page)
    await page.goto('/#/comercial/negativas')
    await expect(negativas.topo).toBeVisible()
})

test.describe('Validação Grid', () => {
    test('Validar o funcionamento da pesquisa geral', { tag: ['@smoke', '@negativas'] }, async ({ page, negativaSeed }) => {
        const pesquisa = new Pesquisa(page)
        const negativas = new Negativas(page)

        // Dado que estou na tela de negativas
        await expect(negativas.topo).toBeVisible()

        // Quando faço uma pesquisa usnado o filtro geral
        await pesquisa.campoBusca.fill(negativaSeed.id)

        // Então o sistema deverá exibir na grid somente os registros que correspondem a pesquisa realizada
        await page.waitForTimeout(2000)
        await negativas.deleteNegativa(negativaSeed.id)

    })

    test('Validar o funcionamento do botão "limpar filtro"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const pesquisa = new Pesquisa(page)
        const negativas = new Negativas(page)
        const message = "Nenhum registro encontrado"

        // Dado que fiz uma pesquisa usando o filtro da pesquisa geral
        await pesquisa.campoBusca.fill('amafagafo')
        await expect(negativas.gridMessage).toHaveText(message)


        // Quando clico no botão "Limpar Filtro"
        await pesquisa.botaoLimparFiltro.click()

        // Então a pesquisa deverá ser resetada e a grid recarregada com todas as informações 
        await expect(negativas.gridMessage).not.toBeVisible()

    })

    test('Validar o funcionamento do botão "Inserir"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)

        // Dado que estou na tela de Negativas 
        await expect(negativas.topo).toBeVisible()

        // Quando clico no botão inserir 
        await botoesGrid.botaoInserir.click()

        // Então devo ser redirecionado para o formulário de preenchimento de Negativas 
        await expect(negativas.campoVendedor).toBeVisible()

    })
})

test.describe('Validação comportamento colunas', () => {
    test('Validar a ordenação das colunas tipo numérico crescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)

        //Captura os valores da coluna "Codigo" ao entrar na tela
        const codigos = await page.locator('tbody tr td:nth-child(3)').allTextContents()
        // Ordena os valores da coluna "Codigo" em ordem crescente
        const ordenados = [...codigos].sort((a, b) => Number(a) - Number(b))

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        // Quando clico na coluna "Codigo" para ordenar
        await negativas.colMotivo.click()

        // Captura os valores da coluna "Codigo" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(3)').allTextContents()

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar a ordenação das colunas tipo numérico decrescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)

        //Captura os valores da coluna "Codigo" ao entrar na tela
        const codigos = await page.locator('tbody tr td:nth-child(3)').allTextContents()
        // Ordena os valores da coluna "Codigo" em ordem decrescente
        const ordenados = [...codigos].sort((a, b) => Number(b) - Number(a))

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

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

        //Captura os valores da coluna "Descricao(Motivo)" ao entrar na tela
        const lista = await page.locator('tbody tr td:nth-child(4)').allTextContents()
        // Ordena os valores da coluna "Descricao(Motivo)" em ordem crescente
        const ordenados = [...lista].sort((a, b) => a.localeCompare(b))

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        // Quando clico na coluna "Descricao(Motivo)" para ordenar
        await negativas.colDescricao.click()

        // Captura os valores da coluna "Descricao(Motivo)" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar a ordenação das colunas tipo texto decrescente', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)

        //Captura os valores da coluna "Descrição(Motivo)" ao entrar na tela
        const codigos = await page.locator('tbody tr td:nth-child(4)').allTextContents()
        // Ordena os valores da coluna "Descricao(Motivo)" em ordem decrescente
        const ordenados = [...codigos].sort((a, b) => b.localeCompare(a))

        // Dado que estou na tela de Negativas e a grid está carregada
        await expect(negativas.topo).toBeVisible()

        // Quando clico na coluna "Descricao(Motivo)" para ordenar
        await negativas.colDescricao.click()
        await negativas.colDescricao.click()

        // Captura os valores da coluna "Descricao(Motivo)" após clicar na coluna para ordenar
        const codigosDepois = await page.locator('tbody tr td:nth-child(4)').allTextContents()

        // Então a ordenação deverá ser aplicada 
        expect(codigosDepois).toEqual(ordenados)

    })

    test('Validar o comportamento do botão "X" dentro do filtro da coluna', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)

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
        expect(resultado.every(valor=> valor.trim().endsWith(registro))).toBe(true)

    })

    test.fixme('BUG-616 Azure | Validar o funcionamento do filtro tipo "String" usando o "Não é igual a "', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)

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

test.describe('Campos requeridos', () => {
    test('Validar a obrigatoriedade do campo "Vendedor"', { tag: ['@critical', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const message = "Por favor, preencha os campos obrigatórios."
        const message2 = "O campo é obrigatório."

        // Dado que não preenchi o campo "Vendedor"
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoMotivo.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando clico no botão "Salvar Alterações"
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então deverá ser exibido uma toast informando que o campo "Vendedor" é Requerido
        await expect(page.locator('.p-toast-message-text')).toBeVisible()
        await toast.toast(message)
        await expect(negativas.alerta.nth(0)).toHaveText(message2)
    })

    test('Validar a obrigatoriedade do campo "Motivo"', { tag: ['@critical', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const message = "Por favor, preencha os campos obrigatórios."
        const message2 = "O campo é obrigatório."

        // Dado que não preenchi o campo "Motivo"
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando clico no botão "Salvar Alterações"
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então deverá ser exibido uma toast informando que o campo "Motivo" é Requerido
        await expect(page.locator('.p-toast-message-text')).toBeVisible()
        await toast.toast(message)
        await expect(negativas.alerta.nth(0)).toHaveText(message2)

    })

    test('Validar a obrigatoriedade do campo "Cliente"', { tag: ['@critical', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const message = "Por favor, preencha os campos obrigatórios."
        const message2 = "O campo é obrigatório."

        // Dado que não preenchi o campo "Cliente"
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoMotivo.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando clico no botão "Salvar Alterações"
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então deverá ser exibido uma toast informando que o campo "Cliente" é Requerido
        await expect(page.locator('.p-toast-message-text')).toBeVisible()
        await toast.toast(message)
        await expect(negativas.alerta.nth(0)).toHaveText(message2)
    })


})

test.describe('Validação Inclusão', () => {
    test('Validar a inclusão de uma nova Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page }, testInfo) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        // Prefixo AUTOMACAO_ é obrigatório: deleteNegativaPorObservacao só
        // exclui registros marcados como criados pela automação (proteção
        // contra apagar dado alheio ao teste, ex.: do ERP) — sem o prefixo
        // a limpeza abaixo seria abortada e o registro ficaria órfão. O nome
        // do teste (via testInfo) embutido na observação ajuda a rastrear,
        // no ERP ou num trace, qual teste deixou o registro caso a limpeza
        // falhe.
        const obs = `${MARCADOR_AUTOMACAO}${identificarTeste(testInfo)}_${Date.now()}`
        const message = "Inserido com sucesso!"

        // Dado que estou na tela do formulário para o cadastro de negativas
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoMotivo.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill(obs)

        // Quando preencho todas as informações e clico no botão "Salvar Alterações"
        await validarDataAtual(negativas.campoDtCadastro)
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então o registro da Negativa deverá ser salvo
        await toast.toast(message)
        await expect(page.getByText(obs, { exact: true })).toBeVisible()

        // Deletar a negativa criada para não impactar outros testes
        await negativas.deleteNegativaPorObservacao(obs)
    })

    test('Validar o funcionamento do Botão "Cancelar" no cadastro de negativas', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)

        const message = "Nenhum registro encontrado"

        // Dado que estou na tela do formulário para o cadastro de negativas 
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoMotivo.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando preencho todas as informações e clico no botão "Cancelar"
        await botoesGrid.botaoCancelar.click()

        // Então o registro da Negativa não deverá ser salvo
        await expect(negativas.gridMessage).toHaveText(message)

    })

})

test.describe('Validação Exclusão', () => {
    test.use({ negativaSeedPreset: 'paraExclusao' })
    test('Validar a exclusão de uma Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page, negativaSeed }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        const toast = new Toast(page)
        const botoes = new BotoesGrid(page)

        const message = "Excluído com sucesso!"

        // Dado que existe uma Negativa cadastrada (via API, pelo negativaSeed)
        // localizo o registro na grid pela observação
        await pesquisa.campoBusca.fill(negativaSeed.observacao)
        await expect(page.locator('tr.p-datatable-selectable-row.p-row-even')).toHaveCount(1, { timeout: 5000 })

        // Confirma que a única linha retornada é de fato o registro que
        // criamos (não outro registro que a busca tenha casado por
        // engano) antes de acionar a exclusão — nunca excluir "o que
        // sobrou na grid", só o registro que sabemos ser nosso.
        await expect(page.getByText(negativaSeed.observacao, { exact: true })).toBeVisible()

        // Quando acabar de identificar o registro e clico em excluir
        await botoes.botaoAcao.click()
        await botoes.botaoExcluir.click()

        // Então o registro deverá ser removido da grid
        await toast.toast(message)
        await expect(page.getByText(negativaSeed.observacao, { exact: true })).not.toBeVisible()
    })
})

test.describe.skip('Validação Edição', () => {
    test.fixme('BUG-612 Azure | Validar a edição de uma Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page }, testInfo) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        const botoes = new BotoesGrid(page)

        const novaObs = `${MARCADOR_AUTOMACAO}${identificarTeste(testInfo)}_EDITADA_${Date.now()}`

        // Dado que existe uma Negativa cadastrada
        const negativa = await negativas.createNegativa(negativaPayloads.paraEdicao(testInfo))

        // localizo o registro na grid pela observação
        await pesquisa.campoBusca.fill(negativa.observacao)
        await expect(page.locator('tr.p-datatable-selectable-row.p-row-even')).toHaveCount(1)

        // Quando altero o campo "Observações" e salvo
        await botoes.botaoAcao.click()
        await botoes.botaoEditar.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoObservacoes.fill(novaObs)
        await botoes.botaoSalvar.click()

        // Então a alteração deverá ser persistida
        await expect(page.getByText(novaObs, { exact: true })).toBeVisible()

        // Higienização
        await negativas.deleteNegativa(negativa.id)
    })
})
