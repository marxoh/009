import express from 'express';
//va a crear un servidor de apollo
import {ApolloServer} from '@apollo/server';
//expressMiddleware va a integrarlo al servidor de express
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http'; //http es un modulo que ya viene en node.js

export async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    //esta linea esta copiada de la documentacion
    //como apollo debe ejecutarse conjuntamente con express
    //se usa una manera de integrarlo con http
    //se crea un servidor http que ejecuta a app
    const httpServer = http.createServer(app);

    //luego se crea tambien un servidor de apollo
    //donde se definen los tipos y los resolvers
    //para luego integrarlo al servidor de app como un middleware
    const server = new ApolloServer({
        typeDefs,   //de javascript se resumen quitando la asignacion
        resolvers,
        //context: ({req}) => ({req})
    })

    //antes de integrar apollo al app debe iniciarse primero
    //debe estar dentro de una funcion que soporte async/await
    await server.start();

    //segun la documtnacion para la integracion se agrega el cors()
    //que es un middleware para que admita las conexiones
    //tambien se agrega express.json()
    //que es un middleware para traficar entre servidores
    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server))

    //despues de integrar el apollo al servidor de express
    //para correr todo en conjunto se debe correr una promesa await
    // Modified server startup
    const port = process.env.PORT || 4000
    // await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    await new Promise(resolve => httpServer.listen({ port: port },resolve));
    console.log('> express-graphql on port: ',port)
}