// Corpo (request.body) = Dados para criação ou atualização de um registro
// Route Params (request.params) = Identificar qual recurso atualizar ou deletar
// Query Params (request.query) = paginação, filtro, ordenação

import express from 'express'
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

// Define o formato de um objeto
interface scheduleItem{
    week_day : number;
    from : string;
    to : string;
}


// Adicionar aulas

routes.post('/classes', async (request, response) => {

    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    //cria uma transaction para rodar as inserções, caso de erro em aguma inserção não salva nada.
    const trx = await db.transaction();

    try{
        // insertedUsersIds = pega os ids inseridos no insert
        const insertedUsersIds =  await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });
        //Pega o primeiro id que foi inserido e passa paran a tabela de classes
        const user_id = insertedUsersIds[0];

        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
        });

        const class_id = insertedClassesIds[0];

        const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
            
            return{
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),

            }
        })

        // quando passa um array ele salva em cada posição uma nova linha.
        await trx('class_schedule').insert(classSchedule)

        // se transaction sem erros , faz a inserção.
        await trx.commit();

        // status de criado com sucesso
        return response.status(201).send();

    } catch (err){

        await trx.rollback();

        // bad request
        return response.status(400).json({
            error: "Unexpected error while creating new class"
        })
    }

});


export default routes;