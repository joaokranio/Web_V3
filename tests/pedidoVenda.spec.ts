import { expect, test } from '../fixtures/home.fixture'
import { PedidoPage } from '../pages/pedidoPage'

test.beforeEach(async ({ page }) => {
    await page.goto('/#/comercial/pedidos')
})

test.describe.skip('Cadastro do Pedido', () => {
    test('Abrir tela de cadastro de pedido de venda', { tag: ['@critical', '@smoke', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou na página de cadastro de pedidos
        await expect(page.locator('button.p-button', { hasText: 'Novo Pedido' })).toBeVisible()

        // Quando clico no botão "novo"

        // Então deve abrir a tela para o cadastro de um novo pedido
    })

    test('Criar pedido preenchendo somente a cabeça', { tag: ['@critical', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Fluxo: preencher cabeça do pedido, salvar, localizar o pedido criado
        // pela busca e validar retorno na grid.
    })

})

test.describe.skip('Validações da Cabeça', () => {
    test('Validar campos obrigatórios da cabeça do pedido', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou na tela de cadastro de pedido

        // Quando eu clico no botão "Salvar" sem preencher nenhum campo

        // Então devo ver um Toast informando que preciso preencher os campos
        // obrigatórios e os campos ("Cliente", "Condição de Pagamento" e
        // "Lista de Preço") deverão ficar em destaque
    })

    test('Validar digitação de caracteres inválidos', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou na tela de cadastro de pedido

        // Quando digito um caracter inválido (letras) onde não é permitido
        // (campos numéricos: "cliente", "vendedor", "condição de pagamento" e
        // "lista de preço")

        // Então devo ver um Toast informando que houve um erro
    })

    test('BUG-43686 - validar campo Fator Lista Preço (Desconto)', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu informei o cliente e a condição de pagamento na cabeça
        // do pedido

        // Quando altero a condição de pagamento

        // Então o campo "Fator Lista Preço (Desconto)" deverá ser alterado
    })

})

test.describe.skip('Inclusão de Itens (Modal de Item)', () => {

    test('Abrir modal de inclusão de item', { tag: ['@critical', '@smoke', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que informei os dados da cabeça do pedido

        // Quando clico no botão "+" para adicionar os itens no pedido

        // Então é apresentado um modal para preencher as informações do item
        // que deverá ser acrescentado no pedido
    })

    test('Incluir item válido no pedido', { tag: ['@critical', '@smoke', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que informei os dados da cabeça do pedido
        // E selecionei um item válido e preenchi todos os campos

        // Quando clico no botão "Salvar"

        // Então o item do pedido deverá aparecer na grid do pedido com os
        // dados que foram informados
    })

    test('Editar item existente do pedido', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu já tenho um item inserido no pedido

        // Quando eu seleciono a função para editar o item, troco as
        // informações desse item e clico em "salvar"

        // Então os dados do item deverão ser atualizados de acordo com as
        // informações preenchidas no momento da edição do item
    })

    test('Cancelar inclusão de item no pedido', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu iniciei a inclusão de um novo item no pedido
        // E informo os dados do item

        // Quando clico no botão "Cancelar"

        // Então o modal deverá fechar e voltar para tela de pedidos sem que
        // tenha incluído nenhum item
    })

})

test.describe.skip('Validações do Item', () => {

    test('Validar campos obrigatórios do item', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou na tela de inclusão de um item no pedido

        // Quando tento salvar o item sem preencher os campos obrigatórios

        // Então o sistema deverá impedir o salvamento
        // E exibir um Toast informando que é necessário informar os campos
        // obrigatórios
        // E os campos obrigatórios devem ser marcados como inválidos
    })

    test.skip('Bloquear preenchimento de campos numéricos com caracteres inválidos', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou na tela de inclusão de um item no pedido

        // Quando tento digitar letras em campos numéricos

        // Então o sistema deverá exibir um Toast com uma mensagem de erro

        // TODO: mensagem hoje não está sendo tratada, pedir para o
        // desenvolvimento tratar e deixar mais amigável para o usuário final.
    })

})

test.describe.skip('Cálculos do Item', () => {

    test('Calcular valor total do item ao informar quantidade e valor unitário', { tag: ['@critical', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que selecionei um item válido

        // Quando informo a quantidade do item

        // Então o sistema deverá exibir o valor total desse item no canto
        // inferior esquerdo da janela
    })

    test('Recalcular valor do item ao alterar quantidade', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu já selecionei um item válido e informei a quantidade

        // Quando altero a quantidade informada

        // Então o sistema deverá refazer o cálculo e exibir o novo valor
    })

    test('Aplicar desconto percentual no item', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que informei um item válido no pedido de venda

        // Quando aplico o desconto usando a opção de "Desconto Percentual (%)"

        // Então o sistema deverá informar o valor de desconto no campo
        // "Valor do desconto Total"
        // E fazer o abatimento desse valor no total do pedido
    })

    test('Aplicar desconto em valor no item', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que informei um item válido no pedido de venda

        // Quando aplico o desconto usando a opção de "Desconto Valor ($)"

        // Então o sistema deverá informar o valor de desconto no campo
        // "Valor do desconto Total"
        // E fazer o abatimento desse valor no total do pedido
    })

})

test.describe.skip('Grid de Itens', () => {
    test('Exibir corretamente os valores calculados na grid de itens', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que informei um item válido no pedido de venda
        // E eu informei/inseri os itens dentro do pedido de venda

        // Quando volto para a grid

        // Então devo ver as informações apresentadas na grid respeitando o
        // cálculo:
        // Valor dos itens = (Qtde x Vlr. Material) - Vlr. Desoneração
        // Vlr. Total       = Valor dos itens
        //                   - Vlr. Desconto Total
        //                   + Vlr. Frete
        //                   + Vlr. IPI
        //                   + Vlr. ST
    })

    test('Atualizar valor total do pedido conforme itens da grid', { tag: ['@critical', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu alterei a quantidade do item dentro do pedido de venda

        // Quando volto para a grid

        // Então o sistema deverá recalcular o valor total do pedido
    })

})

test.describe.skip('Exclusão de Itens', () => {
    test('Excluir item individual pela grid', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu tenho um pedido de venda com itens inseridos

        // Quando utilizo a função de exclusão

        // Então o sistema deverá excluir o item do pedido e atualizar a grid
        // e o campo "Valor Total"
    })

    test('Excluir todos os itens do pedido', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu tenho um pedido de venda com itens inseridos

        // Quando utilizo a função "Excluir todos os Itens"

        // Então o sistema deverá excluir todos os itens do pedido
        // E a cabeça do pedido deverá ser mantida
        // E atualizar o campo "Valor Total" zerando essa informação
    })

})

test.describe.skip('Assistente de Digitação', () => {
    test('Abrir assistente de digitação de itens', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu preenchi as informações da cabeça do pedido de venda

        // Quando clico no botão do "Assistente de Digitação"

        // Então o sistema deverá abrir o pop-up do assistente de digitação
    })

    test('Incluir itens pelo assistente de digitação', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu preenchi as informações da cabeça do pedido de venda
        // E cliquei no botão do "Assistente de Digitação"

        // Quando preencho as informações de "Produto", "Tipo de Venda" e
        // "Quantidade"

        // Então ao clicar no botão "Salvar" o pop-up deverá fechar e abrir
        // novamente em branco para a seleção de um novo item
    })

})

test.describe.skip('Assistente (Lista de Materiais)', () => {
    test('Abrir assistente de inclusão por lista de materiais', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu preenchi as informações da cabeça do pedido de venda

        // Quando clico no Assistente (Lista de Materiais)

        // Então deverá abrir uma janela com o nome "Lista de Materiais"
        // E deverá ser exibido nessa tela a imagem do item, código do item,
        // descrição e valor
        // E um campo para digitação da quantidade e logo abaixo 2 botões
        // "-" e "+"
    })

    test('Incluir itens no pedido pela lista de materiais', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que eu preenchi as informações da cabeça do pedido de venda
        // E informei a quantidade dos itens que desejo inserir no pedido

        // Quando clico no botão "OK" no canto inferior direito

        // Então os itens que informei a quantidade deverão ser exibidos na
        // grid do pedido de venda
    })

})

test.describe.skip('Importação por Excel', () => {
    test('Abrir modal de importação de itens via Excel', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que tenho as informações da cabeça do pedido de venda
        // preenchidas

        // Quando clico na função "Importar (Excel)"

        // Então deverá ser exibido um pop-up para a importação do arquivo em
        // Excel
    })

    test('Importar itens no pedido via arquivo Excel', { tag: ['@high', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que tenho as informações da cabeça do pedido de venda
        // preenchidas
        // E já cliquei na função "Importar (Excel)"

        // Quando clico no botão "Procurar"

        // Então o sistema deverá abrir uma janela para que o usuário
        // selecione a planilha
        // E, após selecionar, o sistema deverá comparar os itens da planilha
        // e, se estiver de acordo com as margens parametrizadas no sistema,
        // permitir importar os itens para o pedido
    })

})

test.describe.skip('Documentos', () => {
    test('Incluir documento no pedido', { tag: ['@medium', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou cadastrando e/ou editando um pedido de venda

        // Quando clico no botão "Documentos" no canto inferior esquerdo

        // Então o sistema deverá exibir uma janela onde eu posso ver todos os
        // documentos inseridos no pedido e a opção de inserir novos
        // documentos
    })

    test('Excluir documento do pedido', { tag: ['@low', '@regression', '@pedidos_venda'] }, async ({ page }) => {
        const pedido = new PedidoPage(page)

        // Dado que estou na janela "Documentos" dentro de um pedido de venda

        // Quando clico no ícone da "Lixeira" de um documento

        // Então o sistema deverá excluir esse documento desse pedido de venda
    })

})
