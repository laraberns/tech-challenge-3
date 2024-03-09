# README

## Frontend

### Tecnologias Utilizadas
- **React + Vite**: O frontend é desenvolvido usando React como biblioteca principal e Vite como ferramenta de construção para uma experiência de desenvolvimento mais rápida.
- **JavaScript**: O projeto utiliza JavaScript para funcionalidades de script.

### Roteamento
- **BrowserRouter, useNavigate, Link**: React Router é utilizado para o roteamento do lado do cliente. `useNavigate` é usado para navegação, e `Link` é utilizado para criar links entre componentes.

### Gerenciamento de Estado
- **useState e useEffect**: Hooks do React, como `useState` e `useEffect`, são utilizados para gerenciar o estado do componente e efeitos colaterais.

### Comunicação com API
- **Axios**: O frontend se comunica com o backend usando o Axios para fazer solicitações HTTP.

## Backend

### Tecnologias Utilizadas
- **Node.js**: O backend é construído usando Node.js, fornecendo um tempo de execução do lado do servidor escalável.
- **Express**: Express é utilizado como o framework de aplicação web para criar APIs robustas e escaláveis.
- **Mongoose**: Mongoose é utilizado para modelagem de objetos MongoDB, fornecendo uma maneira direta de interagir com o banco de dados MongoDB.

## Banco de Dados

### Gerenciamento do Banco de Dados
- **MongoDB**: MongoDB é o banco de dados NoSQL escolhido, proporcionando flexibilidade e escalabilidade para armazenar dados relacionados a usuários.

## Funcionalidades

### Autenticação
- **Registro e Login de Usuários**: Os usuários podem se registrar com nomes de usuário e e-mails exclusivos. A funcionalidade de login verifica credenciais usando bcrypt para uma comparação segura de senha.

### Recuperação de Senha
- **Esqueci a Senha**: Os usuários podem solicitar uma redefinição de senha via e-mail. Um token JWT é gerado e enviado para o e-mail do usuário usando o nodemailer.

### Segurança
- **Autenticação Baseada em Token**: Tokens JWT são utilizados para autenticação de usuário. Os tokens são armazenados como cookies para comunicação segura entre o frontend e o backend.

### Rotas Protegidas
- **Rota de Verificação de Usuário**: Uma rota protegida para verificar se o usuário possui um token válido em seus cookies.

### Logout do Usuário
- **Rota de Logout**: Os usuários podem fazer logout, removendo o token dos cookies.

## Rotas da API (/auth)
- **/signup**: Permite que os usuários se cadastrem. Verifica a existência de usuários com base no e-mail e no nome de usuário. Usa bcrypt para criptografia de senha e salva os dados do usuário no banco de dados MongoDB.

- **/login**: Manipula o login do usuário. Compara o e-mail e a senha fornecidos com as credenciais armazenadas usando bcrypt. Se bem-sucedido, um token JWT com expiração de uma hora é salvo como um cookie.

- **/forgotPassword**: Rota para usuários que esquecem a senha. Gera um token JWT para redefinição de senha e o envia para o e-mail do usuário usando o nodemailer.

- **/resetPassword/:token**: Rota para redefinir a senha. Usa o token para extrair o ID do usuário e atualizar sua senha criptografada no banco de dados.

- **/verifyUser**: Rota para verificar se o usuário possui um token válido em seus cookies. Uma rota protegida.

- **/logout**: Rota para logout do usuário. Remove o token dos cookies.


## Rotas da API (/movies)
- **/getAll**: Retorna todos os filmes da API. Os dados dos filmes são mockados e armazenados no MongoDB. O esquema de dados pode ser encontrado [aqui](https://github.com/toedter/movies-demo/blob/master/backend/src/main/resources/static/movie-data/movies-250.json).

