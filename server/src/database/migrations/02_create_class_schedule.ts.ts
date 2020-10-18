import Knex from 'knex'

export async function up(knex:Knex) {
    return knex.schema.createTable('class_schedule', table =>{
        table.increments('id').primary();
        
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();


        //  foreign key de professor
        //  OnUpdate => remove referencia se usuario é apagado
        //  onDelete => remove registro da tabela se o usuario é apagado
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


    })
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('class_schedule');
}