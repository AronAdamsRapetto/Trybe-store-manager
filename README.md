# Projeto - Store manager - EM CONSTRUÇÃO
---
## O que foi desenvolvido:

Este projeto foi desenvolvido de forma individual durante o programa de formação da Trybe.
Neste projeto desenvolvi minha primeira API utilizando a arquitetura MSC.
A API RESTful construída é um sistema de gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas.

As stacks utilizadas para o desenvolvimento desta aplicação foram:
![Node](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express.js-grey?style=flat-square&logo=express&logoColor=white)
![MyAQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white)


Foi utilizado um banco de dados MySQL para a gestão de dados deste projeto.

## Executando o projeto
---
#### Com Docker
❗Para rodar o projeto com o docker será necessário que além do [docker](https://www.docker.com/), o  [docker-compose](https://github.com/docker/compose) também esteja instalado em sua máquina.

Na raiz do projeto digite o seguinte comando
```
docker-compose up -d
```
Os containers para execução do projeto irão ser inicados, agora precisamos instalar as depêndencias e botar a API no ar.
Acesse o terminal do container node com o comando abaixo:
```
docker exec -it store_manager bash
```
Instale as depêndencias do projeto:
```
npm install
```
Agora execute este comando para iniciar a API:
```
npm run debug
```


---
### Localmente
❗Para rodar o projeto localmente será necessário ter instalado o  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v16+ e um servidor MySQL já ativo  em sua máquina.

Acesse o terminal e instale as depêndencias na raiz do projeto:
```
npm install
```
Em seguida dê start na aplicação:
```
npm run debug
```
---
## Criando a base de dados

Caso esteja utilizando o docker, acesse o container mysql com o seguinte comando e siga os passos a seguir normalmente:
```
docker exec -it store_manager_db bash
```
Conecte-se ao banco digitando o comando abaixo no terminal:
```
mysql -u root -p
```
Será necessário digitar a senha do banco de dados. Caso haja modificado as variáveis de ambiente no arquivo do docker-compose digite a nova senha especificada por você, caso contrário apenas digite `password`.

Na raiz do projeto existe um arquivo `migration.sql`, copie o conteúdo deste arquivo e cole no terminal. Todas as querys foram executadas com exceção da útima, precione `enter` para executá-la. Isto criou o banco e as tabelas, agora precisamos popular o banco com alguns dados.

Na raiz do projeto existe um arquivo `seed.sql`, copie o conteúdo deste arquivo e cole no terminal, novamente todas as querys foram executadas com exceção da útima, precione `enter` para executá-la.

## Endpoints
---

## Executando os testes
---
Os testes só serão executados após a instalação das depêndencias.

No terminal digite o seguinte comando:
```
npm test
```
Para verificar a cobertura de testes da aplicação execute no terminal:
```
npm run test-coverage
```
