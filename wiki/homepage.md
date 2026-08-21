# Home Page — Cenários de Teste

> Extraído de `tests/homePage.spec.ts` em 2026-07-30.
> Contém apenas títulos e estrutura Gherkin (Dado/Quando/Então), sem código de implementação, para reaproveitamento na migração Vue 2 -> Vue 3.

## Menu Lateral

### Abrir menu "Clientes"

- **Dado que** estou na homepage
- **Quando** clico no menu "clientes"
- **Então** devo ser redirecionado para a tela de clientes

### Abrir menu "Pedidos de Venda"

- **Dado que** estou na homepage
- **Quando** clico no menu "Pedidos de Vendas"
- **Então** devo ser redirecionado para a tela de Pedidos de Vendas

### Abrir menu "Negativas"

- **Dado que** estou na homepage
- **Quando** clico no menu "Negativas"
- **Então** devo ser redirecionado para a tela de Negativas

### Abrir menu "Pedidos de Compra"

- **Dado que** estou na homepage
- **Quando** clico no menu "Pedidos de Compra"
- **Então** devo ser redirecionado para a tela de pedido de compra

### Abrir menu "Lista de Materiais"

- **Dado que** estou na homepage
- **Quando** clico no menu "Lista de Materiais"
- **Então** devo ser redirecionado para a tela da Lista de materiais

### Abrir menu "Indicadores"

- **Dado que** estou na homepage
- **Quando** clico no menu "Indicadores"
- **Então** devo ser redirecionado para a tela da Lista de materiais

---

## Menu Superior

### Abrir menu "Configurações"

- **Dado que** estou na homepage
- **Quando** clico no menu "Configurações"
- **Então** devo ser redirecionado para a tela de configurações do Sistema

> ⚠️ **Tela ainda não desenvolvida.** A página de Configurações ainda não
> foi implementada no sistema — o cenário fica apenas **mapeado**
> (`test.fixme`, sem interação alguma), mantido só como referência pra
> implementar quando a tela existir.

### Abrir menu "Diagnóstico"

- **Dado que** estou na homepage
- **Quando** clico no menu "Diagnóstico"
- **Então** devo ser redirecionado para a tela de diagnóstico do Sistema

### Abrir menu "Trocar Filial"

- **Dado que** estou na homepage
- **Quando** clico no menu "Trocar Filial"
- **Então** devo ser redirecionado para a tela para selecionar a filial

### Abrir menu "Sobre o Sistema"

- **Dado que** estou na homepage
- **Quando** clico no menu "Sobre o Sistema"
- **Então** devo ser redirecionado para a tela com informações Sobre o Sistema

> ⚠️ **Tela ainda não desenvolvida.** Assim como Configurações, a página
> "Sobre o Sistema" ainda não existe no sistema — o cenário fica apenas
> **mapeado** (`test.fixme`, sem interação alguma), mantido só como
> referência pra implementar quando a tela existir.

### Abrir menu "Modo Escuro"

- **Dado que** estou na homepage
- **Quando** clico na Switch do "Modo Escuro" deixando na posição "Ativa"
- **Então** a tela do sistema deverá assumir o modo escuro (dark)

### Abrir menu "Sair"
`@critical`

- **Dado que** estou na homepage
- **Quando** clico no menu "Sair"
- **Então** devo ser redirecionado para a tela de login do Sistema
