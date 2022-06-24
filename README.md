## 24MOB / Desenvolvimento de Microserviços e APIs

### Projeto Microserviços e APIs

Foram desenvolvidas duas estruturas de backend, sendo a primeira para cadastrar usuários e outra para cadastrar e atualizar finanças dos usuários.

Foi utilizado *docker* para rodar as aplicações.

Os containers são:

- Banco MongoDB
- Aplicação de Usuários
- Aplicação de Finanças

Para obter o *docker* baixe-o [por aqui](https://docs.docker.com/get-docker/)

Foi criado uma *collection postman* para facilitar o consumo dessas apis. `https://www.getpostman.com/collections/ef2b6acc0e06a8bd902e`

para obter o postman baixe-o [por aqui](https://www.postman.com/downloads/)

Crie uma pasta, navegue até a pasta criada e faça `git clone https://github.com/biodevs/fiap-micro-services-and-api.git` do projeto em sua máquina.

abra o terminal na pasta criada acima e digite:
```
docker compose up --build
```
Copie essa *URL*  do Postman e importe pela aba link `https://www.getpostman.com/collections/ef2b6acc0e06a8bd902e`.

Crie um usuário em `Users => Post /Users`

Liste todos os usuários em `Users => Get /Users`

Mude a Senha em `Users => Post /ChangePassword`

Crie uma finança em `Finances => Post /Finances`

Liste todas as finanças em `Finances => Get /Finances`

Atualize uma finança em `Finances => Put /Finances`

O token é capturado automáticamente por `Users => Post /Login`