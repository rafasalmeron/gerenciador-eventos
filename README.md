# Projeto Multi-Stack: Frontend, Backend e React Native

Este repositório contém três projetos distintos para um sistema de gerenciamento de eventos:

1. **Frontend (React)**
2. **Backend (Spring Boot)**
3. **Mobile (React Native)**

Cada projeto está organizado em suas respectivas pastas. Abaixo, você encontrará instruções sobre como configurar e rodar cada um deles.

## Estrutura do Repositório

/project-root <br>
├── /React # Frontend (React) <br>
├── /Back # Backend (Spring Boot) <br>
└── /Native # Mobile (React Native) <br>

---

## Pré-requisitos

Antes de começar, você precisa garantir que tenha as seguintes ferramentas instaladas no seu computador:

- [Node.js](https://nodejs.org/) (para o frontend e React Native)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/) (gerenciador de pacotes)
- [Java JDK 17+](https://adoptopenjdk.net/) (para o backend Spring Boot)
- [Maven](https://maven.apache.org/) (para o backend Spring Boot)
- [Android Studio](https://developer.android.com/studio) (para o ambiente React Native)

---

## 1. Rodando o Frontend (React)

### Passo 1: Acesse a pasta do Frontend

```
cd React
```

Passo 2: Instale as dependências
Se você estiver usando Yarn:
```
yarn install
```
Ou, se você estiver usando npm:

```
npm install
```

Passo 3: Rode o projeto
Se você estiver usando Yarn:

```
yarn dev
```
Ou, se você estiver usando npm:

```
npm run dev
```
Isso iniciará o servidor de desenvolvimento do React. O frontend estará disponível em http://localhost:3000.

2. Rodando o Backend (Spring Boot)
Passo 1: Acesse a pasta do Backend

```
cd Back
```
Passo 2: Instale as dependências
Se você ainda não tiver as dependências instaladas, execute:
```
mvn clean install
```
Passo 3: Rode o projeto
Para rodar o backend com o Maven:
```
mvn spring-boot:run
```
O servidor backend estará rodando em http://localhost:9000.

3. Rodando o Mobile (React Native)
Passo 1: Acesse a pasta do Mobile
```
cd Native
```
Passo 2: Instale as dependências
Se você estiver usando Yarn:

```
yarn install
```
Ou, se você estiver usando npm:

```
npm install
```
Passo 3: Inicie o ambiente de desenvolvimento
Para rodar o aplicativo no emulador Android ou dispositivo físico, execute:

```
npx expo start
```
Certifique-se de que o Android Studio esteja instalado e o emulador esteja rodando ou que você tenha um dispositivo físico conectado.

Estrutura de Diretórios <br>
/React: Contém o código do frontend (React). <br>

/Back: Contém o código do backend (Spring Boot). <br>

/Native: Contém o código do aplicativo mobile (React Native). <br>

Considerações Finais <br>
Para o frontend e o mobile, as dependências são gerenciadas pelo Yarn ou npm. <br>

Para o backend, você precisa ter o JDK 17+ e Maven instalados. <br>

Cada parte do projeto pode ser executada independentemente, desde que as APIs do backend estejam configuradas corretamente e o frontend e o mobile estejam configurados para consumir essas APIs. <br>

Se tiver problemas ou precisar de mais detalhes sobre o setup, sinta-se à vontade para abrir uma issue ou entrar em contato! <br>

Licença <br>
Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes. <br>


Com isso, qualquer pessoa poderá seguir as instruções de forma clara e configurar os três projetos do seu repositório. Se precisar de mais ajustes ou tiver outras dúvidas, estou à disposição! 😊📋

