// Mutations/queries confirmadas contra o servidor real: criação e busca via
// captura de rede (tests/_debug-negativa.spec.ts, descartado após uso);
// exclusão via as próprias mensagens de erro do GraphQL ao ajustar
// argumento/tipo até acertar (tests/_debug-cleanup.spec.ts, idem). Ainda não
// sabemos como a exclusão é acionada pela UI (só validamos via API).

export type NegativaPayload = {
    vendedorId: number
    negativaMotivoId: number
    clienteId: number
    observacao: string
    insertDate: string
    insertName: string
    latitude: number
    longitude: number
}

// "id" só existe na resposta da query de listagem/busca (GetNegativas) — a
// mutation de inserção não devolve id, só ecoa os campos enviados.
export type NegativaCriada = NegativaPayload & { id: string }

export const CREATE = `
    mutation InserirNegativa($parameter: NegativaParameterInput!) {
        inserirNegativa(parameter: $parameter) {
            vendedorId
            negativaMotivoId
            clienteId
            observacao
            insertDate
            insertName
            longitude
            latitude
        }
    }
`

// Reaproveita o mesmo parâmetro "search" que o campo de pesquisa geral da
// grid usa (Pesquisa.campoBusca) — filtra por observação para localizar o id
// do registro que acabamos de criar via API.
export const FIND = `
    query GetNegativas($search: String) {
        negativas(first: 1, search: $search) {
            edges {
                node {
                    id
                    observacao
                }
            }
        }
    }
`

// Nome do mutation e do argumento ("negativaId", não "id") confirmados via
// mensagem de erro do próprio GraphQL ao tentar com o argumento errado —
// ainda falta confirmar se ele é acionável pela UI (e como), mas o mutation
// em si já está correto e funcionando.
export const DELETE = `
    mutation ExcluirNegativa($negativaId: Decimal!) {
        excluirNegativa(negativaId: $negativaId)
    }
`
