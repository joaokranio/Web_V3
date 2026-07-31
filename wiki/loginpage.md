# Login Page — Cenários de Teste

> Extraído de `tests/loginPage.spec.ts` em 2026-07-30.
> Contém apenas títulos e estrutura Gherkin (Dado/Quando/Então), sem código de implementação, para reaproveitamento na migração Vue 2 -> Vue 3.

## Autenticação

### Deve permitir login com credenciais válidas
`@critical @smoke`

- **Dado que** preencho os campos com usuário e senha válidos
- **Quando** clico no botão "Entrar"
- **E** selecionei a filial e clico em "Confirmar"
- **Então** devo ver a página logada do sistema

### Não deve permitir login com usuário inválido
`@critical @smoke`

- **Dado que** eu preencho um usuário incorreto
- **Quando** clico no botão "Entrar"
- **Então** o sistema exibe uma mensagem de erro "Usuário ou senha inválido."

### Deve exibir toast ao falhar login
`@smoke`

- **Dado que** eu informei o usuário correto mas a senha incorreta
- **Quando** clico no botão "Entrar"
- **Então** o sistema deverá exibir a mensagem "Usuário ou senha inválido."

---

## Validações de Campo

### Validar campos obrigatórios
`@smoke`

- **Dado que** eu não preencho os campos na área de login
- **Quando** clico no botão "Entrar"
- **Então** o sistema me informa que os campos são obrigatórios ("O campo não pode ser vazio.")

### Validar mensagem de quantidade de digitação máxima de caracteres
`@smoke`

- **Dado que** estou na tela de login
- **Quando** informo mais de 20 caracteres no campo de digitação
- **Então** logo abaixo do campo usuário deverá aparecer uma mensagem em vermelho ("O campo não pode exceder 20 caracteres.")

### Validar a funcionalidade do botão exibir senha
`@smoke`

- **Dado que** preenchi o campo senha e a mesma é apresentada oculta
- **Quando** clico no botão para exibir senha
- **Então** devo ver os caracteres digitados ao invés de ocultos por pontos

---

## Persistência de Sessão

### Manter o usuário preenchido após selecionar "Lembrar meus dados"
`@smoke`

- **Dado que** o usuário está na tela de login
- **E** informa um usuário e uma senha válidos
- **E** marca a opção "Lembrar meus dados"
- **Quando** realiza o login no sistema
- **E** efetua o logout
- **Então** o campo "Usuário" deve permanecer preenchido com o último usuário utilizado
- **E** a opção "Lembrar meus dados" deve permanecer marcada
