## Como rodar

1) Clone o projeto usando `git clone git@github.com:decoder-file/huron-back-end.git`
2) Entre na pasta e instale as dependências `cd huron-back-end (ou qualquer outro nome que tenha dado)` e depois execute `npm install` ou `npm i`
3) Inicie o docker e ainda na pasta raiz execute `docker compose up -d`
5) Rode as migrations executando `npm run migration:run`

PS: **não** usar o yarn pra evitar gerar o **yarn.lock**