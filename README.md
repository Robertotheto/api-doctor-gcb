<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
<p>Para darmos continuidade em seu processo seletivo, pedimos que você realize o seguinte teste:<p>
<p>Desenvolver um sistema que faça a gestão de cadastros de médicos. O Sistema deve suportar as seguintes operações:<p>
<ul>
    <li>Insert</li>
    <li>Update</li>
    <li>Select</li>
    <li>Soft Delete</li>
</ul>

## Uses Cases
<p>No cadastro do médico, devem ser cadastrados os seguintes itens:
</p>
<ul>
    <li>Nome do médico com no máximo 120 caractéres</li>
    <li>CRM: somente números com no máximo 7 caracteres</li>
    <li>Telefone fixo: somente números</li>
    <li>Telefone celular: somente números</li>
    <li>CEP: somente números (Ao cadastrar o CEP, deve ser feita uma reqisição via XHR para a API dos correios e retornar todos os dados de endereço do cliente).</li>
    <li>Especialidade médica (mínimo de duas especialidades)</li>
</ul>

## Important Items
<ul>
    <li>Estar no padrão REST</li>
    <li>Criar mecanismo de busca por todos os campos do cadastro do médico, incluindo o endereço</li>
    <li>Utilizar ferramenta de validação (exemplo: YUP)</li>
    <li>Funções especialistas (Realizam somente uma operação)</li>
    <li>Para documentação e requisição utilizar o Postman, Insomnia ou Swagger (Enviar junto com o teste o workspace utilizado)</li>
    <li>Subir o código em repositório público do GitHub</li>
    <li>Criar arquivo docker compose para avaliação do teste (ATENÇÃO: Sem esse arquivo seu teste não será executado)</li>
    <li>Testes unitários</li>
    <li>Testes "end to end"</li>
</ul>

## Migrations & Seeds
<p>No banco de dados devem estar cadastradas as seguintes especialidades:</p>
<ul>
    <li>Alergologia</li>
    <li>Angiologia</li>
    <li>Buco maxilo</li>
    <li>Cardiologia clínca</li>
    <li>Cardiologia infantil</li>
    <li>Cirurgia cabeça e pescoço</li>
    <li>Cirurgia cardíaca</li>
    <li>Cirurgia de tórax</li>
</ul>

## Installation

```bash
$ docker-compose up --build
```

## Running the app

```bash
# development
$ docker-compose up --build
```

## Test

```bash
# unit tests
$ docker exec -it image_container /bin/bash
$ yarn test
```

## Stay in touch

- Author - Roberto dos Santos Filho
- Website - [https://github.com/robertotheto](https://github.com/robertotheto)

## License

Nest is [MIT licensed](LICENSE).
