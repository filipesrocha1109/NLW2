import {Request, Response} from 'express'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// Define o formato de um objeto
interface scheduleItem{
    week_day : number;
    from : string;
    to : string;
}


export default class ClassesController {

    async index(request: Request, response: Response){
        const filters = request.query;

        // declara tipagem dos parametros
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // Aponta erro se não passar filtros
        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        //console.log(timeInMinutes)

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    // verifica se atende no dia da semana informado
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    // verifica atendimento entre horarios
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    // verifica atendimento entre horarios
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id','=','users.id')
            .select(['classes.*','users.*']);

        return response.json(classes)

    }

    async create(request: Request, response: Response) {

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
    
    }
}