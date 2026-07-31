# Pedido de Venda — Cenários de Teste

> Extraído de `tests/auth/pedidovenda.spec.ts` em 2026-07-30.
> Contém apenas títulos e estrutura Gherkin (Dado/Quando/Então), sem código de implementação, para reaproveitamento na migração Vue 2 -> Vue 3.

## Cadastro do Pedido

### Abrir tela de cadastro de pedido de venda
`@critical @smoke @pedidos_venda @web`

- **Dado que** estou na página de cadastro de pedidos
- **Quando** clico no botão "novo"
- **Então** deve abrir a tela para o cadastro de um novo pedido

### Criar pedido preenchendo somente a cabeça
`@critical @regression @pedidos_venda @web @flaky`

> Estrutura Gherkin não documentada no teste original. Fluxo observado no código: preencher cabeça do pedido, salvar, localizar o pedido criado pela busca e validar retorno na grid.

---

## Validações da Cabeça

### Validar campos obrigatórios da cabeça do pedido
`@high @regression @pedidos_venda @web`

- **Dado que** estou na tela de cadastro de pedido
- **Quando** eu clico no botão "Salvar" sem preencher nenhum campo
- **Então** devo ver um Toast informando que preciso preencher os campos obrigatórios e os campos ("Cliente", "Condição de Pagamento" e "Lista de Preço") deverão ficar em destaque

### Validar digitação de caracteres inválidos
`@high @regression @pedidos_venda @web`

- **Dado que** estou na tela de cadastro de pedido
- **Quando** digito um caracter inválido (letras) onde não é permitido (campos numéricos: "cliente", "vendedor", "condição de pagamento" e "lista de preço")
- **Então** devo ver um Toast informando que houve um erro

### BUG-43686 - validar campo Fator Lista Preço (Desconto)
`@high @regression @pedidos_venda @web`

- **Dado que** eu informei o cliente e a condição de pagamento na cabeça do pedido
- **Quando** altero a condição de pagamento
- **Então** o campo "Fator Lista Preço (Desconto)" deverá ser alterado

---

## Inclusão de Itens (Modal de Item)

### Abrir modal de inclusão de item
`@critical @smoke @pedidos_venda @web`

- **Dado que** informei os dados da cabeça do pedido
- **Quando** clico no botão "+" para adicionar os itens no pedido
- **Então** é apresentado um modal para preencher as informações do item que deverá ser acrescentado no pedido

### Incluir item válido no pedido
`@critical @smoke @pedidos_venda @web`

- **Dado que** informei os dados da cabeça do pedido
- **E** selecionei um item válido e preenchi todos os campos
- **Quando** clico no botão "Salvar"
- **Então** o item do pedido deverá aparecer na grid do pedido com os dados que foram informados

### Editar item existente do pedido
`@high @regression @pedidos_venda @web`

- **Dado que** eu já tenho um item inserido no pedido
- **Quando** eu seleciono a função para editar o item, troco as informações desse item e clico em "salvar"
- **Então** os dados do item deverão ser atualizados de acordo com as informações preenchidas no momento da edição do item

### Cancelar inclusão de item no pedido
`@medium @regression @pedidos_venda @web`

- **Dado que** eu iniciei a inclusão de um novo item no pedido
- **E** informo os dados do item
- **Quando** clico no botão "Cancelar"
- **Então** o modal deverá fechar e voltar para tela de pedidos sem que tenha incluído nenhum item

---

## Validações do Item

### Validar campos obrigatórios do item
`@high @regression @pedidos_venda @web`

- **Dado que** estou na tela de inclusão de um item no pedido
- **Quando** tento salvar o item sem preencher os campos obrigatórios
- **Então** o sistema deverá impedir o salvamento
- **E** exibir um Toast informando que é necessário informar os campos obrigatórios
- **E** os campos obrigatórios devem ser marcados como inválidos

### Bloquear preenchimento de campos numéricos com caracteres inválidos
`@medium @regression @pedidos_venda @web` — *(test.skip no arquivo original)*

- **Dado que** estou na tela de inclusão de um item no pedido
- **Quando** tento digitar letras em campos numéricos
- **Então** o sistema deverá exibir um Toast com uma mensagem de erro

> TODO original: mensagem hoje não está sendo tratada, pedir para o desenvolvimento tratar e deixar mais amigável para o usuário final.

---

## Cálculos do Item

### Calcular valor total do item ao informar quantidade e valor unitário
`@critical @regression @pedidos_venda @web`

- **Dado que** selecionei um item válido
- **Quando** informo a quantidade do item
- **Então** o sistema deverá exibir o valor total desse item no canto inferior esquerdo da janela

### Recalcular valor do item ao alterar quantidade
`@high @regression @pedidos_venda @web`

- **Dado que** eu já selecionei um item válido e informei a quantidade
- **Quando** altero a quantidade informada
- **Então** o sistema deverá refazer o cálculo e exibir o novo valor

### Aplicar desconto percentual no item
`@high @regression @pedidos_venda @web`

- **Dado que** informei um item válido no pedido de venda
- **Quando** aplico o desconto usando a opção de "Desconto Percentual (%)"
- **Então** o sistema deverá informar o valor de desconto no campo "Valor do desconto Total"
- **E** fazer o abatimento desse valor no total do pedido

### Aplicar desconto em valor no item
`@high @regression @pedidos_venda @web`

- **Dado que** informei um item válido no pedido de venda
- **Quando** aplico o desconto usando a opção de "Desconto Valor ($)"
- **Então** o sistema deverá informar o valor de desconto no campo "Valor do desconto Total"
- **E** fazer o abatimento desse valor no total do pedido

---

## Grid de Itens

### Exibir corretamente os valores calculados na grid de itens
`@high @regression @pedidos_venda @web`

- **Dado que** informei um item válido no pedido de venda
- **E** eu informei/inseri os itens dentro do pedido de venda
- **Quando** volto para a grid
- **Então** devo ver as informações apresentadas na grid respeitando o cálculo:
  ```
  Valor dos itens = (Qtde x Vlr. Material) - Vlr. Desoneração
  Vlr. Total       = Valor dos itens
                    - Vlr. Desconto Total
                    + Vlr. Frete
                    + Vlr. IPI
                    + Vlr. ST
  ```

### Atualizar valor total do pedido conforme itens da grid
`@critical @regression @pedidos_venda @web`

- **Dado que** eu alterei a quantidade do item dentro do pedido de venda
- **Quando** volto para a grid
- **Então** o sistema deverá recalcular o valor total do pedido

---

## Exclusão de Itens

### Excluir item individual pela grid
`@high @regression @pedidos_venda @web`

- **Dado que** eu tenho um pedido de venda com itens inseridos
- **Quando** utilizo a função de exclusão
- **Então** o sistema deverá excluir o item do pedido e atualizar a grid e o campo "Valor Total"

### Excluir todos os itens do pedido
`@medium @regression @pedidos_venda @web`

- **Dado que** eu tenho um pedido de venda com itens inseridos
- **Quando** utilizo a função "Excluir todos os Itens"
- **Então** o sistema deverá excluir todos os itens do pedido
- **E** a cabeça do pedido deverá ser mantida
- **E** atualizar o campo "Valor Total" zerando essa informação

---

## Assistente de Digitação

### Abrir assistente de digitação de itens
`@medium @regression @pedidos_venda @web`

- **Dado que** eu preenchi as informações da cabeça do pedido de venda
- **Quando** clico no botão do "Assistente de Digitação"
- **Então** o sistema deverá abrir o pop-up do assistente de digitação

### Incluir itens pelo assistente de digitação
`@high @regression @pedidos_venda @web`

- **Dado que** eu preenchi as informações da cabeça do pedido de venda
- **E** cliquei no botão do "Assistente de Digitação"
- **Quando** preencho as informações de "Produto", "Tipo de Venda" e "Quantidade"
- **Então** ao clicar no botão "Salvar" o pop-up deverá fechar e abrir novamente em branco para a seleção de um novo item

---

## Assistente (Lista de Materiais)
> `test.describe.skip` no arquivo original

### Abrir assistente de inclusão por lista de materiais
`@medium @regression @pedidos_venda @web`

- **Dado que** eu preenchi as informações da cabeça do pedido de venda
- **Quando** clico no Assistente (Lista de Materiais)
- **Então** deverá abrir uma janela com o nome "Lista de Materiais"
- **E** deverá ser exibido nessa tela a imagem do item, código do item, descrição e valor
- **E** um campo para digitação da quantidade e logo abaixo 2 botões "-" e "+"

### Incluir itens no pedido pela lista de materiais
`@high @regression @pedidos_venda @web`

- **Dado que** eu preenchi as informações da cabeça do pedido de venda
- **E** informei a quantidade dos itens que desejo inserir no pedido
- **Quando** clico no botão "OK" no canto inferior direito
- **Então** os itens que informei a quantidade deverão ser exibidos na grid do pedido de venda

---

## Importação por Excel
> `test.describe.skip` no arquivo original

### Abrir modal de importação de itens via Excel
`@medium @regression @pedidos_venda @web`

- **Dado que** tenho as informações da cabeça do pedido de venda preenchidas
- **Quando** clico na função "Importar (Excel)"
- **Então** deverá ser exibido um pop-up para a importação do arquivo em Excel

### Importar itens no pedido via arquivo Excel
`@high @regression @pedidos_venda @web`

- **Dado que** tenho as informações da cabeça do pedido de venda preenchidas
- **E** já cliquei na função "Importar (Excel)"
- **Quando** clico no botão "Procurar"
- **Então** o sistema deverá abrir uma janela para que o usuário selecione a planilha
- **E**, após selecionar, o sistema deverá comparar os itens da planilha e, se estiver de acordo com as margens parametrizadas no sistema, permitir importar os itens para o pedido

---

## Documentos
> `test.describe.skip` no arquivo original

### Incluir documento no pedido
`@medium @regression @pedidos_venda @web`

- **Dado que** estou cadastrando e/ou editando um pedido de venda
- **Quando** clico no botão "Documentos" no canto inferior esquerdo
- **Então** o sistema deverá exibir uma janela onde eu posso ver todos os documentos inseridos no pedido e a opção de inserir novos documentos

### Excluir documento do pedido
`@low @regression @pedidos_venda @web`

- **Dado que** estou na janela "Documentos" dentro de um pedido de venda
- **Quando** clico no ícone da "Lixeira" de um documento
- **Então** o sistema deverá excluir esse documento desse pedido de venda
