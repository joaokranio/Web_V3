// TODO: nomes de campos e mutations abaixo são placeholders — substituir pelo
// schema GraphQL real assim que for capturado (introspection ou observando o
// payload de uma criação de cliente feita pela UI).

export type ClientePayload = {
    razaoSocial: string
    fantasia: string
    categoria: string
    cnpj: string
    ie: string
    endereco: {
        pais: string
        cep: string
        endereco: string
        numero: string
        bairro: string
        cidade: string
        uf: string
        ibge: string
    }
}

export type ClienteCriado = ClientePayload & { id: string }

export const CREATE_CLIENTE_MUTATION = `
    mutation CreateCliente($input: ClienteInput!) {
        createCliente(input: $input) {
            id
            razaoSocial
        }
    }
`

export const DELETE_CLIENTE_MUTATION = `
    mutation DeleteCliente($id: ID!) {
        deleteCliente(id: $id) {
            id
        }
    }
`
