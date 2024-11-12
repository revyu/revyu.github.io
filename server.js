const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Статические файлы

const commentsFilePath = path.join(__dirname, 'comments.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Маршрут для получения комментариев
app.get('/comments', (req, res) => {
    fs.readFile(commentsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при чтении комментариев' });
        }
        const comments = JSON.parse(data);
        res.json(comments);
    });
});

// Маршрут для добавления нового комментария
app.post('/comments', (req, res) => {
    const newComment = req.body.comment;

    fs.readFile(commentsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при чтении комментариев' });
        }
        const comments = JSON.parse(data);

        // Добавляем новый комментарий и сохраняем только последние 20
        comments.push(newComment);
        if (comments.length > 20) {
            comments.shift();
        }

        fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Ошибка при записи комментария' });
            }
            res.status(201).json({ success: true });
        });
    });
});



app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
