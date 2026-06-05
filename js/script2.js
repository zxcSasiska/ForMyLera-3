const submitBtn = document.getElementById('submitBtn');
const dateInput = document.getElementById('dateInput');
const message = document.getElementById('message');
const nextBtn = document.getElementById('nextBtn');
const overlay = document.getElementById('overlay');
const gifPopup = document.getElementById('gifPopup');
const popupGif = document.getElementById('popupGif');
const closeBtn = document.getElementById('closeBtn');

// Правильная дата (замените на свою)
const correctDate = '2026-03-28';

// --- ЗАМЕНИТЕ ССЫЛКИ НА СВОИ ГИФКИ ---
const wrongGif = 'image/angry.gif';     // Гифка при неверном ответе
const correctGif = 'image/love.gif'; // Гифка при правильном ответе

// Функция открытия гифки
function openGif(gifSrc) {
    popupGif.src = gifSrc;
    overlay.style.display = 'block';
    gifPopup.style.display = 'block';
}

// Функция закрытия гифки
function closeGif() {
    popupGif.src = '';
    overlay.style.display = 'none';
    gifPopup.style.display = 'none';
}

// Закрытие по кнопке ✕
closeBtn.addEventListener('click', closeGif);

// Закрытие по клику на затемнение
overlay.addEventListener('click', closeGif);

// Отправка ответа
submitBtn.addEventListener('click', function() {
    const userDate = dateInput.value;

    if (!userDate) {
        message.style.color = '#ff4757';
        message.textContent = 'Выбери дату!';
        return;
    }

    if (userDate === correctDate) {
        message.style.color = '#2ed573';
        message.textContent = 'Правильно❤️';
        nextBtn.style.display = 'inline-block';
        openGif(correctGif); // Показываем "правильную" гифку
    } else {
        message.style.color = '#ff4757';
        message.textContent = 'Неверно';
        nextBtn.style.display = 'none';
        openGif(wrongGif); // Показываем "неправильную" гифку
    }
});

nextBtn.addEventListener('click', function() {
    window.location.href = 'test2.html';
});