import Knex from 'knex'

export async function up(knex:Knex) {
    return knex.schema.createTable('classes', table =>{
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //  foreign key de professor
        //  OnUpdate => remove referencia se usuario é apagado
        //  onDelete => remove registro da tabela se o usuario é apagado
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


    })
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('classes');
}