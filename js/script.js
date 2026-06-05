const button = document.querySelector('.moving-btn');
let clickCount = 0;

button.addEventListener('click', function() {
    // Увеличиваем счётчик
    clickCount++;

    // Перемещаем кнопку (резко)
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.transform = 'none';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';

    // Меняем текст после 10 нажатий
    if (clickCount === 10) {
        button.textContent = 'еще раз';
    }
    if (clickCount === 11) {
        button.textContent = 'щас';
    }
    if (clickCount === 12) {
        button.textContent = 'будет';
    }
    if (clickCount === 13) {
        button.textContent = 'тестик';
    }
    if (clickCount === 14) {
        window.location.href = 'test1.html';
    }
});