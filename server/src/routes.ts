// Corpo (request.body) = Dados para criação ou atualização de um registro
// Route Params (request.params) = Identificar qual recurso atualizar ou deletar
// Query Params (request.query) = paginação, filtro, ordenação

import express from 'express'
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsControllers';


const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

// Classes
routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

// Connections
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);




export default routes;