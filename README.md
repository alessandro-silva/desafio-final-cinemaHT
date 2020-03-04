<h1 align="center">
    <img alt="fabrica" src="https://doity.com.br/media/doity/parceiros/11133_parceiro.png" width="200px" />
</h1>

<h3 align="center">
  Desafio Final Módulo 1: Cinema HT
</h3>

## 🎥 Sobre o desafio

Este projeto consiste em criar um sistema de gerenciamento de um cinema hipotético (Cinema HT).

### Deverá ser criado um projeto com a seguinte estrutura:

- `[css] - Diretório contendo todos os arquivos de estilo do projeto;`
- `[js] - Diretório contendo todos os arquivos JS;`

 `-> [modelo] - Diretório contendo todas as entidades do projeto (arquivos .js) Ps. As entidades serão citadas abaixo;`
- `[img] - Diretório contendo todas as imagens do projeto`
- `[/] - Arquivos .html`

### Entidades:

Dentro do diretório "modelo" ficarão as classes referentes às entidades do projeto, são elas:

- `GerenciadorCinema`: Classe responsável pela gerência do cinema como um todo;

```
Atributos:
sessoes = [ ] - Array de objetos do tipo Sessao

```

- `Cliente`: Classe responsável por representar cada cliente do cinema;

```
Atributos:
nome
idade
email
```

- `Sala`: Classe responsável por representar uma sala do cinema;

```
Atributos:
identificador
cadeiras: As cadeiras das salas são fixas: fileiras de A – F (10 cadeiras por
fileira)
Cada array representa uma fileira:
A[ ]
B[ ]
C[ ]
D[ ]
E[ ]
F[ ]
```

- `Sessao`: Classe responsável por representar cada sessão do cinema;

```
Atributos:
data - Data da sessão em questão
horarioInicio - Horario de início da sessão
legendado - Flag para saber se o filme é legendado ou dublado
tresD - Flag para saber se o filme é 3D ou não
sala = {} - Objeto Sala a qual essa sessão será executada
```

- `Filme`:Classe responsável por representar o filme;

```
Atributos:
titulo - Título do filme
classificacao - Classificação indicativa
duracao - Duração do filme
```

- `Cadeira`: Objeto responsável por representar uma cadeira do cinema;

```
Atributos:
ocupado – true = reservado, false = livre (default)
```

### CRUD’s

Todos os CRUDs do sistema deverão aplicar todas as funções básicas (Cadastro, Listagem, Edição e Exclusão)

```
1 - Clientes
2 - Salas
3 - Sessões
4 - Filmes
5 - Usuário
```

### Funções do Sistema

- `Alocar Cliente` Essa função deve permitir que o operador do sistema, aloque um cliente em uma cadeira específica de uma determinada sessão. Uma vez alocado, esta cadeira em questão fica reservada e não pode ser atribuída novamente

- `Consultar disponibilidade` Essa função deverá exibir quais dos assentos da sessão estarão disponíveis


### Login e Logout

- `Login` Deverá ser criada uma página de login onde o usuário deverá ser autenticado no sistema. [Utilizar LocalStorage .

- `Logout` Ao clicar no botão de logout, o usuário deverá ser redirecionado à tela de login e precisará se logar novamente para utilizar o sistema.
