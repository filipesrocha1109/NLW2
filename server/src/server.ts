// npm install typescript -D = instalando typescript
// npx tsc --init = cria arquivo de configuração typescript
// npm install ts-node-dev -D = reinicia aplicação quando ouver mudanças 
// criar sessão no package.json "start": "tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts", para startar o servidor
// npm install express = micro framework
// npm install @types/express -D =  para pacotes com typagem separada. 
// npm install knex sqlite3  = knex serve para manipulação de banco de dados com js

import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

// Permições para de acesso
app.use(cors());
// diz pro express que estamos ultilizando o formato json
app.use(express.json());
app.use(routes);




// .liste() ouvir requisições http, definido a porta = localhost:3333
app.listen(3333);

