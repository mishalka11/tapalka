const mysql = require('mysql2');

// Настройка подключения к базе данных
const connection = mysql.createConnection({
    host: 'localhost', // хост базы данных
    user: 'root',      // имя пользователя базы данных
    password: 'password', // пароль пользователя базы данных
    database: 'telegram_app' // имя базы данных
});

// Подключение к базе данных
connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ', err);
        return;
    }
    console.log('Успешно подключено к базе данных');
});

module.exports = connection;
