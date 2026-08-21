import { Locator, Page } from '@playwright/test'

// A grid busca seus dados através de uma operação GraphQL nomeada (ex.:
// "GetNegativas", "GetClientes" — confirmado inspecionando o tráfego real
// da tela). Qualquer clique que reordene, filtre ou pagine a grid dispara
// uma nova chamada a essa mesma operação, e só depois da resposta voltar o
// conteúdo da tabela reflete o novo estado.
//
// Testes que leem o texto das células logo após uma dessas ações
// (allTextContents(), por exemplo) correm o risco de ler um estado
// intermediário. Uma primeira tentativa de corrigir isso esperava a
// primeira célula da coluna deixar de estar vazia, mas isso falha quando a
// célula antiga já tinha texto — o problema não é célula vazia, é célula
// com dado desatualizado (a leitura pega o resultado de antes da
// ação, não o de depois). Esperar a resposta de rede em si resolve os dois
// casos de uma vez, porque não depende de nenhuma heurística sobre o
// conteúdo da célula.
//
// Precisa iniciar a escuta da resposta ANTES de disparar a ação que a
// causa — por isso recebe a ação como callback e dispara os dois dentro do
// mesmo Promise.all (se a ação disparasse antes, haveria uma corrida entre
// o clique/navegação e o listener ainda não estar armado).
//
// @example
// import { aguardarRespostaGrid } from '../components/grid'
//
// await aguardarRespostaGrid(page, 'GetNegativas', () => negativas.colMotivo.click())
// const codigos = await page.locator('tbody tr td:nth-child(3)').allTextContents()
//
// // também funciona pra esperar a carga inicial disparada pela navegação:
// await aguardarRespostaGrid(page, 'GetNegativas', () => page.goto('/#/comercial/negativas'))
export async function aguardarRespostaGrid(
    page: Page,
    operationName: string,
    acao: () => Promise<unknown>
): Promise<void> {
    await Promise.all([
        page.waitForResponse((res) => {
            if (res.request().method() !== 'POST' || !res.url().includes('graphql')) return false

            try {
                const body = JSON.parse(res.request().postData() ?? '{}')
                return body.operationName === operationName && res.ok()
            } catch {
                return false
            }
        }),
        acao(),
    ])
}

// Mecânica genérica de grid (PrimeVue DataTable), reaproveitável entre
// páginas — não guarda locator de coluna nenhum (isso é dado de negócio e
// continua morando no Page Object de cada tela, ex.: negativas.colMotivo,
// cliente.colTpPessoa). Cada método recebe o locator do header da coluna
// como parâmetro, então funciona igual pra qualquer tela que tenha grid.
//
// @example
// // dentro do Page Object da tela:
// export class Negativas {
//     readonly grid: Grid
//     constructor(page: Page) {
//         this.page = page
//         this.grid = new Grid(page)
//     }
// }
//
// // no teste:
// await negativas.grid.abrirFiltroColuna(negativas.colCodigo)
// const valores = await negativas.grid.valoresDaColuna(negativas.colMotivo)
// await negativas.grid.aguardarResposta('GetNegativas', () => negativas.colMotivo.click())
// await expect(negativas.grid.mensagemVazia).toHaveText('Nenhum registro encontrado')
export class Grid {
    readonly page: Page

    // Genéricos da grid (PrimeVue DataTable — mesma estrutura em qualquer
    // tela que usa o componente, não é específico de nenhum domínio)
    readonly mensagemVazia: Locator
    readonly filtroOverlay: Locator
    // readonly linhasCorpo: Locator

    constructor(page: Page) {
        this.page = page

        this.mensagemVazia = page.locator('tr.p-datatable-empty-message')
        this.filtroOverlay = page.locator('div.p-datatable-filter-overlay')
        // this.linhasCorpo = page.locator('tbody tr')
    }

    // Abre o popup de filtro de uma coluna, a partir do locator do header
    // (ex.: negativas.colCodigo) — evita repetir
    // `coluna.locator('..').locator('button').click()` em cada teste.
    async abrirFiltroColuna(coluna: Locator): Promise<void> {
        await coluna.locator('..').locator('button').click()
    }

    // Lê os valores de uma coluna a partir do locator do header, sem
    // depender de índice cravado (nth-child) — resolve a posição lendo o
    // próprio cabeçalho da grid, então continua correto se uma coluna for
    // adicionada, removida ou reordenada.
    async valoresDaColuna(coluna: Locator): Promise<string[]> {
        const indice = await this.indiceDaColuna(coluna)
        return this.page.locator(`tbody tr td:nth-child(${indice})`).allTextContents()
    }

    // Resolve a posição da coluna por conteção estrutural, não por
    // comparação de texto — o header <th> pode carregar mais conteúdo além
    // do rótulo (badge de prioridade de ordenação, ícone de filtro), o que
    // quebraria uma comparação de string mesmo com a coluna certa ali.
    // `coluna` já aponta pro nó exato do rótulo (ex.: negativas.colCodigo);
    // só precisamos achar o <th> que o contém e a posição dele entre os
    // irmãos.
    private async indiceDaColuna(coluna: Locator): Promise<number> {
        const header = this.page.locator('tr th').filter({ has: coluna })

        if (await header.count() === 0) {
            throw new Error('Coluna não encontrada no cabeçalho da grid')
        }

        return header.evaluate((th) => Array.from(th.parentElement!.children).indexOf(th) + 1)
    }

    // Mesmo comportamento de aguardarRespostaGrid, exposto como método pra
    // quem já tem uma instância de Grid via Page Object.
    async aguardarResposta(operationName: string, acao: () => Promise<unknown>): Promise<void> {
        await aguardarRespostaGrid(this.page, operationName, acao)
    }
}
