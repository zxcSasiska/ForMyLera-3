const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const nextBtn = document.getElementById('nextBtn');
const overlay = document.getElementById('overlay');
const gifPopup = document.getElementById('gifPopup');
const popupGif = document.getElementById('popupGif');
const closeBtn = document.getElementById('closeBtn');

// --- ЗАМЕНИТЕ ССЫЛКИ НА СВОИ ГИФКИ ---
const sadGif = 'image/superangry.gif';
const happyGif = 'image/love.gif';

function openGif(gifSrc) {
    popupGif.src = gifSrc;
    overlay.style.display = 'block';
    gifPopup.style.display = 'block';
}

function closeGif() {
    popupGif.src = '';
    overlay.style.display = 'none';
    gifPopup.style.display = 'none';
}

closeBtn.addEventListener('click', closeGif);
overlay.addEventListener('click', closeGif);

// Кнопка "Да"
yesBtn.addEventListener('click', function() {
    message.style.color = '#2ed573';
    message.textContent = 'Я люблю тебя, лерочка ❤️😭';
    nextBtn.textContent = 'Нажми, любимая ❤️';
    nextBtn.style.display = 'inline-block';
    yesBtn.disabled = true;
    noBtn.disabled = true;
    openGif(happyGif);
});

// Кнопка "Нет" — убегает
noBtn.addEventListener('mouseover', function() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

noBtn.addEventListener('click', function() {
    openGif(sadGif);
});

nextBtn.addEventListener('click', function() {
    window.location.href = 'page5.html';
});