const express = require('express');
const connection = require('./db');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Пример маршрута для получения данных пользователя
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM Users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            res.status(500).send('Ошибка при получении данных пользователя');
            return;
        }
        res.json(results[0]);
    });
});

// Пример маршрута для создания нового пользователя
app.post('/user', (req, res) => {
    const { username, score, energy, level, progress } = req.body;
    connection.query('INSERT INTO Users (username, score, energy, level, progress) VALUES (?, ?, ?, ?, ?)', [username, score, energy, level, progress], (err, results) => {
        if (err) {
            res.status(500).send('Ошибка при создании пользователя');
            return;
        }
        res.status(201).send(`Пользователь создан с ID: ${results.insertId}`);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
