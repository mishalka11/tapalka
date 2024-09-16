// Начальные значения
const maxEnergy = 1000;
let currentEnergy = maxEnergy;
let score = 0;

// Массив путей к изображениям монет
const coinImages = [
    'coin0.png',
    'coin1.png',
    'coin2.png',
    'coin3.png',
    'coin4.png',
    'coin5.png',
    'coin6.png',
    'coin7.png'
];

const levels = [
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Brilliant',
    'Diamond',
    'Master',
    'Legend'
];

// Функция обновления изображения монетки
function updateCoinImage() {
    const index = Math.min(Math.floor(score / 100), coinImages.length - 1);
    document.getElementById('coin').style.backgroundImage = `url('${coinImages[index]}')`;
}

// Функция обновления отображения уровня энергии
function updateEnergyDisplay() {
    document.getElementById('energyCount').textContent = `${currentEnergy}/${maxEnergy}`;
}

// Функция обновления отображения уровня и прогресса
function updateLevelDisplay() {
    const levelIndex = Math.min(Math.floor(score / 100), levels.length - 1);
    const levelProgress = Math.floor(score / 100) + 1;
    const currentLevel = levels[levelIndex];
    document.getElementById('levelName').textContent = `${currentLevel} ${levelProgress}/8`;
    const progress = (score % 100) / 100 * 100;
    document.getElementById('progressLevel').style.width = progress + '%';
}

// Инициализация отображения энергии и уровня при загрузке страницы
updateEnergyDisplay();
updateLevelDisplay();

// Функция для создания и анимации текста
function showFloatingText() {
    const coinElement = document.getElementById('coin');
    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text');
    floatingText.textContent = '+1';

    coinElement.appendChild(floatingText);

    floatingText.addEventListener('animationend', () => {
        coinElement.removeChild(floatingText);
    });
}

// Обработчик отпускания монеты
function handleCoinRelease() {
    if (currentEnergy > 0) {
        score++;
        document.getElementById('score').textContent = score;
        showFloatingText();
        updateCoinImage(); // Обновление монетки
        updateLevelDisplay(); // Обновление уровня и прогресса

        currentEnergy--;
        updateEnergyDisplay();

        // Вибрация при отпускании монетки
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    }
}

// Анимация нажатия на монетку
function handleCoinPress() {
    const coinElement = document.getElementById('coin');
    coinElement.classList.add('pressed');
}

// Анимация отпускания монетку
function handleCoinUnpress() {
    const coinElement = document.getElementById('coin');
    coinElement.classList.remove('pressed');
}

// Добавляем обработчики для монеты
const coinElement = document.getElementById('coin');

coinElement.addEventListener('mousedown', handleCoinPress);
coinElement.addEventListener('mouseup', () => {
    handleCoinRelease();
    handleCoinUnpress();
});

coinElement.addEventListener('touchstart', handleCoinPress);
coinElement.addEventListener('touchend', () => {
    handleCoinRelease();
    handleCoinUnpress();
});

// Восстанавливаем 1 единицу энергии каждые 5 секунд
setInterval(() => {
    if (currentEnergy < maxEnergy) {
        currentEnergy++;
        updateEnergyDisplay();
    }
}, 1000);

// Добавляем новые обработчики для кнопок Frens, NFT и Earn
document.getElementById('frensButton').addEventListener('click', () => {
    // Ваш код для обработки нажатия на кнопку Frens
    console.log('Frens button clicked');
});

document.getElementById('nftButton').addEventListener('click', () => {
    // Ваш код для обработки нажатия на кнопку NFT
    console.log('NFT button clicked');
});

document.getElementById('earnButton').addEventListener('click', () => {
    // Ваш код для обработки нажатия на кнопку Earn
    console.log('Earn button clicked');
});

// Находим элементы
const rocketButton = document.getElementById('rocketButton');
const boostButton = document.getElementById('boostButton');

// Добавляем обработчик клика на картинку ракеты
rocketButton.addEventListener('click', function() {
    // Проксируем клик на кнопку Boosts
    boostButton.click();
});



document.getElementById('boostButton').addEventListener('click', function() {
    // Добавляем/удаляем класс для изменения стилей при активации режима Boosts
    document.body.classList.toggle('boost-mode');

    // Скрываем/показываем нужные элементы
    const container = document.querySelector('.container');
    const bottomButtons = document.getElementById('bottomButtons');
    const boostModeContent = document.querySelector('.boost-mode-content');

    if (document.body.classList.contains('boost-mode')) {
        container.style.display = 'none';
        bottomButtons.style.display = 'flex'; // Показываем нижние кнопки

        // Показываем дополнительные элементы для режима Boosts
        boostModeContent.style.display = 'block';
    } else {
        container.style.display = 'flex';
        bottomButtons.style.display = 'none'; // Скрываем нижние кнопки

        // Скрываем дополнительные элементы для режима Boosts
        boostModeContent.style.display = 'none';
    }
});






document.getElementById('boostButton').addEventListener('click', function() {
    toggleMode('boostModeContent', 'boostButton');
});

document.getElementById('frensButton').addEventListener('click', function() {
    toggleMode('frensContent', 'frensButton');
});

document.getElementById('nftButton').addEventListener('click', function() {
    toggleMode('nftContent', 'nftButton');
});

document.getElementById('earnButton').addEventListener('click', function() {
    toggleMode('earnContent', 'earnButton');
});

document.getElementById('boostBackButton').addEventListener('click', function() {
    exitMode();
});

document.getElementById('frensBackButton').addEventListener('click', function() {
    exitMode();
});

document.getElementById('nftBackButton').addEventListener('click', function() {
    exitMode();
});

document.getElementById('earnBackButton').addEventListener('click', function() {
    exitMode();
});

function toggleMode(contentId, buttonId) {
    document.body.classList.add('boost-mode');
    hideMainElements();

    const contents = document.querySelectorAll('.mode-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(contentId).style.display = 'block';

    const buttons = document.querySelectorAll('.buttons-container .button');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(buttonId).classList.add('active');
}

function exitMode() {
    document.body.classList.remove('boost-mode');
    showMainElements();

    const contents = document.querySelectorAll('.mode-content');
    contents.forEach(content => content.style.display = 'none');

    const buttons = document.querySelectorAll('.buttons-container .button');
    buttons.forEach(button => button.classList.remove('active'));
}

function hideMainElements() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'none';
}

function showMainElements() {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.buttons-container').style.display = 'flex';
}


// реализация покупки бустов







// рефка
