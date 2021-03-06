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
<p>Para darmos continuidade em seu processo seletivo, pedimos que voc?? realize o seguinte teste:<p>
<p>Desenvolver um sistema que fa??a a gest??o de cadastros de m??dicos. O Sistema deve suportar as seguintes opera????es:<p>
<ul>
    <li>Insert</li>
    <li>Update</li>
    <li>Select</li>
    <li>Soft Delete</li>
</ul>

## Uses Cases
<p>No cadastro do m??dico, devem ser cadastrados os seguintes itens:
</p>
<ul>
    <li>Nome do m??dico com no m??ximo 120 caract??res</li>
    <li>CRM: somente n??meros com no m??ximo 7 caracteres</li>
    <li>Telefone fixo: somente n??meros</li>
    <li>Telefone celular: somente n??meros</li>
    <li>CEP: somente n??meros (Ao cadastrar o CEP, deve ser feita uma reqisi????o via XHR para a API dos correios e retornar todos os dados de endere??o do cliente).</li>
    <li>Especialidade m??dica (m??nimo de duas especialidades)</li>
</ul>

## Important Items
<ul>
    <li>Estar no padr??o REST</li>
    <li>Criar mecanismo de busca por todos os campos do cadastro do m??dico, incluindo o endere??o</li>
    <li>Utilizar ferramenta de valida????o (exemplo: YUP)</li>
    <li>Fun????es especialistas (Realizam somente uma opera????o)</li>
    <li>Para documenta????o e requisi????o utilizar o Postman, Insomnia ou Swagger (Enviar junto com o teste o workspace utilizado)</li>
    <li>Subir o c??digo em reposit??rio p??blico do GitHub</li>
    <li>Criar arquivo docker compose para avalia????o do teste (ATEN????O: Sem esse arquivo seu teste n??o ser?? executado)</li>
    <li>Testes unit??rios</li>
    <li>Testes "end to end"</li>
</ul>

## Migrations & Seeds
<p>No banco de dados devem estar cadastradas as seguintes especialidades:</p>
<ul>
    <li>Alergologia</li>
    <li>Angiologia</li>
    <li>Buco maxilo</li>
    <li>Cardiologia cl??nca</li>
    <li>Cardiologia infantil</li>
    <li>Cirurgia cabe??a e pesco??o</li>
    <li>Cirurgia card??aca</li>
    <li>Cirurgia de t??rax</li>
</ul>

## Installation

```bash
$ git clone https://github.com/Robertotheto/api-doctor-gcb.git
$ cd api-doctor-gcb
```

## Running the app

```bash
# development
$ docker-compose up --build
```
## Resources

## List all doctors
```bash
# Select All
GET(http://localhost:3000/api/v1/doctors)
```
## List doctor
```bash
# Select
GET(http://localhost:3000/api/v1/doctors/:id)
```
## List search doctor
```bash
# Search
GET(http://localhost:3000/api/v1/doctors/search?name=Ben)
```
## Create doctor
```bash
# Insert
POST(http://localhost:3000/api/v1/doctors)
```
## Update doctor
```bash
# Update
PATCH(http://localhost:3000/api/v1/doctors/:id)
```
## Delete doctor
```bash
# Soft Delete
DELETE(http://localhost:3000/api/v1/doctors/:id)
```
## Restore doctor
```bash
# Restore
POST(http://localhost:3000/api/v1/doctors/restore/:id)
```

## Test

```bash
# unit tests
$ docker exec -it nestjs_doctor /bin/bash
$ yarn test
```

## Stay in touch

- Author - Roberto dos Santos Filho
- Website - [https://github.com/robertotheto](https://github.com/robertotheto)

## License

Nest is [MIT licensed](LICENSE).
