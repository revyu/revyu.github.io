const fs = require('fs');
const path = require('path');

// Путь к файлу с комментариями
const commentsFilePath = path.join(__dirname, '..', 'comments.json');

// Экспортируемая функция для обработки запросов
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        // Чтение комментариев из файла
        fs.readFile(commentsFilePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Ошибка при чтении комментариев' });
            } else {
                const comments = data ? JSON.parse(data) : [];
                res.status(200).json(comments);
            }
        });
    } else if (req.method === 'POST') {
        // Получение нового комментария из тела запроса
        const newComment = req.body.comment;

        // Чтение и обновление списка комментариев
        fs.readFile(commentsFilePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Ошибка при чтении комментариев' });
            } else {
                const comments = data ? JSON.parse(data) : [];

                // Добавление нового комментария и ограничение до 20 последних комментариев
                comments.push(newComment);
                if (comments.length > 20) comments.shift();

                // Запись обновленного списка комментариев в файл
                fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
                    if (err) {
                        res.status(500).json({ error: 'Ошибка при записи комментария' });
                    } else {
                        res.status(201).json({ success: true });
                    }
                });
            }
        });
    } else {
        // Обработка неподдерживаемых методов
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
};
