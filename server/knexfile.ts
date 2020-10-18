import path from 'path';

// Obrigatóriamente ultilizar module.exports pois o knex não aceita ainda export default ...

module.exports = {
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite' )
    },
    migrations: {
        directory: path.resolve(__dirname, 'src','database','migrations')
    },
    useNullAsDefault: true,
};