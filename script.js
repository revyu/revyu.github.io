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

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newComment = commentInput.value.trim();
        if (newComment !== "") {
            const commentDiv = document.createElement('div');
            commentDiv.textContent = newComment;
            commentDiv.style.borderTop = '1px solid #ddd';
            commentDiv.style.marginTop = '10px';
            commentDiv.style.paddingTop = '10px';
            commentsSection.appendChild(commentDiv);

            commentInput.value = ""; // Очищаем поле ввода после отправки
        }
    });
});

