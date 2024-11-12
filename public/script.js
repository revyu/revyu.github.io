document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.block');

    function showBlocks() {
        const triggerBottom = window.innerHeight / 7 * 4;

        blocks.forEach(block => {
            const blockTop = block.getBoundingClientRect().top;

            if(blockTop < triggerBottom) {
                block.classList.add('visible');
            } else {
                block.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', showBlocks);
    showBlocks(); // Инициализация при загрузке страницы
});



document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsSection = document.getElementById('comments-section');

    // Функция для отображения комментариев
    const displayComments = (comments) => {
        commentsSection.innerHTML = ""; // Очищаем секцию перед загрузкой
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.textContent = comment;
            commentDiv.style.borderTop = '1px solid #ddd';
            commentDiv.style.marginTop = '10px';
            commentDiv.style.paddingTop = '10px';
            commentsSection.appendChild(commentDiv);
        });
    };

    // Загрузка комментариев с сервера
    const loadComments = () => {
        fetch('/comments')
            .then(response => response.json())
            .then(comments => displayComments(comments))
            .catch(error => console.error('Ошибка загрузки комментариев:', error));
    };

    // Отправка нового комментария на сервер
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newComment = commentInput.value.trim();
        if (newComment !== "") {
            fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: newComment })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadComments(); // Перезагружаем комментарии после добавления
                    commentInput.value = ""; // Очищаем поле ввода
                }
            })
            .catch(error => console.error('Ошибка добавления комментария:', error));
        }
    });

    // Загрузка комментариев при загрузке страницы
    loadComments();
});
