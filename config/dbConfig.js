const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'usuarios_login'
});

connection.connect((err) => {
    if(err){
        console.log('conexão com o banco de dados falhou');
        return;
    }
    console.log('Conexão bem sucedida ao banco de dados')
})

module.exports = connection;