import { Locator, Page } from '@playwright/test'
import { getApiContext } from '../api/apiContext'
import { graphqlRequest } from '../api/graphqlClient'
import * as NegativaQueries from '../api/queries/negativa'
import { NegativaCriada, NegativaPayload } from '../api/queries/negativa'
import { buildNegativaPayload } from '../test-data/negativaFactory'

export class Negativas {
    readonly page : Page
    // Genéricos
    readonly topo: Locator

    // Grid
    readonly gridMessage: Locator

    // Formulario
    readonly campoVendedor: Locator
    readonly campoMotivo: Locator
    readonly campoCliente: Locator
    readonly campoObservacoes: Locator
    readonly campoDtCadastro: Locator

    // Alertas
    readonly alerta: Locator

    constructor(page: Page) {
        this.page = page

        // Genéricos
        this.topo = page.locator('span.text-primary', { hasText: 'Negativas' })

        // Grid
        this.gridMessage = page.locator('tr.p-datatable-empty-message')

        // Formulario
        this.campoVendedor = page.locator('#negativa-vendedor-lookup-id')
        this.campoMotivo = page.locator('#negativa-motivo-lookup-id')
        this.campoCliente = page.locator('#cliente-vendedor-lookup-id')
        this.campoObservacoes = page.getByPlaceholder('Observações')
        this.campoDtCadastro = page.locator('input.p-datepicker-input')
        
        // Alertas
        this.alerta = page.locator('div.p-message-text')
    }

    // --- API helpers ---------------------------------------------------
    // Criação/exclusão via GraphQL, usadas por testes e fixtures que
    // precisam de uma Negativa sem passar pela UI. Ficam aqui (e não
    // espalhadas pelos specs) pra existir um único lugar pra manter quando a
    // mutation/schema mudar. A autenticação é resolvida sozinha por
    // getApiContext() (cacheada por worker) — quem chama não precisa passar
    // nem se preocupar com request/apiAuthHeaders.

    // Cria uma Negativa via API e devolve o registro já com "id" (a mutation
    // de inserção não devolve o id, então busca em seguida pela observação
    // única gerada pelo factory).
    //
    // @example
    // const negativas = new Negativas(page)
    // const negativa = await negativas.createNegativa()
    // // ou sobrescrevendo algum campo do payload padrão:
    // const negativa = await negativas.createNegativa({ observacao: 'Minha observação' })
    async createNegativa(overrides: Partial<NegativaPayload> = {}): Promise<NegativaCriada> {
        const { request, headers } = await getApiContext()
        const payload = buildNegativaPayload(overrides)

        await graphqlRequest(request, headers, NegativaQueries.CREATE, { parameter: { id: 0, ...payload } })

        const negativa = await this.buscarNegativaPorObservacao(payload.observacao)
        if (!negativa) {
            throw new Error(`Negativa recém-criada (observacao: ${payload.observacao}) não foi encontrada na busca.`)
        }

        return negativa
    }

    // Mesma query usada pela pesquisa geral da grid (Pesquisa.campoBusca) —
    // localiza uma Negativa pela observação (útil pra descobrir o id de um
    // registro criado pela UI, que não vem em nenhuma resposta de mutation).
    //
    // @example
    // const negativas = new Negativas(page)
    // const negativa = await negativas.buscarNegativaPorObservacao('Teste de inclusão de negativa 123')
    // if (negativa) { ... }
    async buscarNegativaPorObservacao(observacao: string): Promise<NegativaCriada | undefined> {
        const { request, headers } = await getApiContext()

        const encontrada = await graphqlRequest<{ negativas: { edges: { node: NegativaCriada }[] } }>(
            request, headers, NegativaQueries.FIND, { search: observacao }
        )

        const negativa = encontrada.negativas.edges[0]?.node
        if (!negativa) return undefined

        // API devolve "id" como number — normaliza pra string (é o que o
        // resto do fluxo, ex.: locator.fill, espera).
        return { ...negativa, id: String(negativa.id) }
    }

    // Exclui uma Negativa via API pelo id. Aceita string ou number porque o
    // scalar GraphQL (Decimal) exige um literal numérico, mas o restante do
    // fluxo circula com o id como string.
    //
    // @example
    // const negativas = new Negativas(page)
    // const negativa = await negativas.createNegativa()
    // // ...usa a negativa no teste...
    // await negativas.deleteNegativa(negativa.id)
    async deleteNegativa(negativaId: string | number): Promise<void> {
        const { request, headers } = await getApiContext()
        await graphqlRequest(request, headers, NegativaQueries.DELETE, { negativaId: Number(negativaId) })
    }

    // Higienização de negativas criadas pela UI (a mutation de inserção não
    // devolve o id): busca pela observação única e exclui se encontrar.
    // Falha na exclusão/busca não deve mascarar o resultado do teste, por
    // isso só loga um aviso em vez de lançar.
    //
    // @example
    // // depois de cadastrar uma negativa pela UI, preenchendo campoObservacoes com "obs":
    // await negativas.deleteNegativaPorObservacao(obs)
    async deleteNegativaPorObservacao(observacao: string): Promise<void> {
        try {
            const negativa = await this.buscarNegativaPorObservacao(observacao)
            if (!negativa) {
                console.warn(`Negativa de teste (observacao: "${observacao}") não encontrada para exclusão.`)
                return
            }

            await this.deleteNegativa(negativa.id)
        } catch (error) {
            console.warn(`Falha ao excluir negativa de teste (observacao: "${observacao}"):`, error)
        }
    }
}