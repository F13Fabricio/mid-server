# Mid-server

Api de aplicação para escolher qual é o melhor lugar para se viver em MiddleEarth. Os usuários que possuem cadastro podem enviar fotos de seu lugares favoritos para que qualquer um possa votar.

Frontend:
<https://github.com/F13Fabricio/mid-angular>

[TOC]

### Funcionalidades

- Cadastro de usuários;
- Autenticação com JWT (JSON Web Token);
- Cadastro, edição e exclusão de lugares (somente usuários autenticados);
- Imagens sendo salvas no AWS S3;
- Sistema de votação em tempo usando WebSocket;

#### Funcionalidades futuras

- Opção para editar a imagem do lugar;
- Exclusão da imagem após a exclusão do lugar no banco de dados;
- Testes (unitários e integração);

### Instruções

#### Requisitos

- Mysql
- Nodejs
- Bucket do AWS S3 (com acesso público)

#### Iniciando a aplicação

- Após instalar todas as dependências defina todas as informações de ambiente no .env.
- Crie uma base de dados no Mysql com nome e usuário informados nas variáveis de ambiente.
- Execute o comando abaixo para criar as tabelas no banco de dados:
`$ npm ./node_modues/.bin/sequelize db:migrate`
- Agora basta executar:
`$ npm run start`

## API

Endpoint base para quando o servidor estiver rodando localmente:
`http://localhost:3000/mid-server/api/v1`

### Criar um usuário

**Endpoint:** `POST /users`

**Autenticado:** Não

**Exemplo de requisição:**

```json
{
  "name": "Gollum",
  "email": "gollum@hotmail.com",
  "password": "my_precious"
}
```

**Exemplo de resposta:**

```json
{
  "token": "jwt_token",
  "data": {
    "id": 1,
    "name": "Gollum",
    "email": "gollum@hotmail.com",
    "updatedAt": "2019-10-21T14:12:34.059Z",
    "createdAt": "2019-10-21T14:12:34.059Z"
  }
}
```

### Login

**Endpoint:** `POST /login`

**Autenticado:** Não

**Exemplo de requisição:**

```json
{
  "email": "maria@gmail.com",
  "password": "slkdfjlklskd"
}
```

**Exemplo de resposta:**

```json
{
  "token": "jwt_token",
  "data": {
    "id": 1,
    "name": "Gollum",
    "email": "gollum@hotmail.com",
    "updatedAt": "2019-10-21T14:12:34.059Z",
    "createdAt": "2019-10-21T14:12:34.059Z"
  }
}
```

### Exibir um usuário

**Endpoint:** `GET /users/:userId`

**Autenticado:** Sim

**Header:**

| Header          | Exemplo           |
| --------------- | ------------------|
| authorization   | Bearer `token`    |

**Exemplo de resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Gollum",
    "email": "gollum@hotmail.com",
    "createdAt": "2019-10-21T14:12:34.000Z",
    "updatedAt": "2019-10-21T14:12:34.000Z"
  }
}
```

### Adicionar um lugar

**Endpoint:** `POST /users/:userId/places`

**Autenticado:** Sim

**Header:**

| Header          | Exemplo           |
| --------------- | ------------------|
| authorization   | Bearer `token`    |

**Requisição do tipo Multipart:**

| Campo           | Exemplo            |
| --------------- | -------------------|
| file            | campos_de lis.png  |
| name            | Campos de Lis      |

**Exemplo de resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Campos de Lis",
    "UserId": "1",
    "imageUrl": "image_url",
    "numberOfVotes": 0,
    "updatedAt": "2019-10-21T14:24:03.894Z",
    "createdAt": "2019-10-21T14:24:03.894Z"
  }
}
```

### Listar todos os lugar

**Endpoint:** `GET /places`

**Autenticado:** Não

**Exemplo de resposta:**

```json
{
  "count": 1,
  "data": [
    {
      "data": {
        "id": 1,
        "name": "Campos de Lis",
        "UserId": "1",
        "imageUrl": "image_url",
        "numberOfVotes": 0,
        "updatedAt": "2019-10-21T14:24:03.894Z",
        "createdAt": "2019-10-21T14:24:03.894Z"
      }
    }
  ]
}
```

### Exibir um lugar

**Endpoint:** `GET /places/:placeId`

**Autenticado:** Não

**Exemplo de resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Campos de Lis",
    "UserId": "1",
    "imageUrl": "image_url",
    "numberOfVotes": 0,
    "updatedAt": "2019-10-21T14:24:03.894Z",
    "createdAt": "2019-10-21T14:24:03.894Z"
  }
}
```

### Atualizar um lugar (apenas o nome)

**Endpoint:** `PUT /places/:placeId`

**Autenticado:** Sim

**Header:**

| Header          | Exemplo           |
| --------------- | ------------------|
| authorization   | Bearer `token`    |

**Exemplo de requisição:**

```json
{
  "name": "Vales do Anduin"
}
```

**Exemplo de resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Vales do Anduin",
    "UserId": "1",
    "imageUrl": "image_url",
    "numberOfVotes": 0,
    "updatedAt": "2019-10-21T14:24:03.894Z",
    "createdAt": "2019-10-21T14:24:15.894Z"
  }
}
```

### Excluir um lugar

**Endpoint:** `DELETE /places/:placeId`

**Autenticado:** Sim

**Header:**

| Header          | Exemplo           |
| --------------- | ------------------|
| authorization   | Bearer `token`    |
