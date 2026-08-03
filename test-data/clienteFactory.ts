import { ClientePayload } from '../api/queries/cliente'

function unique(): string {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`
}

// Gera um cliente com dados únicos a cada chamada (evita colisão de
// unicidade quando os testes rodam em paralelo) e prefixados com
// "AUTOMACAO_" para facilitar identificar/limpar manualmente registros que
// escaparem do teardown automático.
export function buildClientePayload(overrides: Partial<ClientePayload> = {}): ClientePayload {
    const id = unique()

    return {
        razaoSocial: `AUTOMACAO_TESTE_${id}`,
        fantasia: `AUTOMACAO_${id}`,
        categoria: '15',
        // TODO: gerar CNPJ com dígito verificador válido se a API validar o checksum.
        cnpj: `32.368.696/0001-${id.slice(-2).padStart(2, '0')}`,
        ie: '926.439.328.266',
        endereco: {
            pais: '1058',
            cep: '14820-792',
            endereco: 'AV DUQUE DE CAXIAS',
            numero: '999',
            bairro: 'VILA XAVIER',
            cidade: 'ARARAQUARA',
            uf: 'SP',
            ibge: '3503208',
        },
        ...overrides,
    }
}
