import Knex from 'knex'

export async function up(knex:Knex) {
    return knex.schema.createTable('connections', table =>{
        table.increments('id').primary();
        
        //  foreign key de professor
        //  OnUpdate => remove referencia se usuario é apagado
        //  onDelete => remove registro da tabela se o usuario é apagado
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();


    })
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('connections');
}