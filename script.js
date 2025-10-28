// Навигация по страницам
function showPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Убрать активный класс со всех ссылок
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Показать выбранную страницу
    document.getElementById(pageId).classList.add('active');

    // Активировать соответствующую ссылку
    const targetLink = document.querySelector(`[href="#${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Прокрутка к верху
    window.scrollTo(0, 0);
}

// Инициализация навигации
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId);
    });
});

// Модальные окна
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeButtons = document.querySelectorAll('.close');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

// Открытие модальных окон
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Переключение между модальными окнами
switchToRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});

switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Закрытие модальных окон
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Закрытие по клику вне окна
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Формы
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    simulateAPICall('login').then(() => {
        alert('Вход выполнен успешно!');
        loginModal.style.display = 'none';
        updateUserInterface('Иван Иванов', 'ivan@example.com');
    });
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    simulateAPICall('register').then(() => {
        alert('Регистрация завершена! Проверьте вашу почту.');
        registerModal.style.display = 'none';
    });
});

// Симуляция API вызова
function simulateAPICall(action) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${action} API call simulated`);
            resolve();
        }, 1000);
    });
}

// Обновление интерфейса пользователя
function updateUserInterface(name, email) {
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;

    // Обновляем статистику
    document.querySelectorAll('.user-stat .stat-value').forEach(stat => {
        stat.textContent = Math.floor(Math.random() * 50) + 10;
    });
}

// Игра "Огонь и Вода"
function playGame() {
    const gameWindow = window.open('', '_blank', 'width=800,height=600');
    if (gameWindow) {
        gameWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Огонь и Вода - Загрузка</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: linear-gradient(135deg, #ff6b35, #4ecdc4);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-family: Arial, sans-serif;
                        color: white;
                    }
                    .loading-container {
                        text-align: center;
                    }
                    .loading-icon {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                    }
                </style>
            </head>
            <body>
                <div class="loading-container">
                    <div class="loading-icon">🔥💧</div>
                    <h2>Огонь и Вода</h2>
                    <p>Загрузка игры...</p>
                    <p><small>В полной версии здесь будет запущена игра</small></p>
                </div>
            </body>
            </html>
        `);
    } else {
        alert('Игра "Огонь и Вода" запускается! 🎮\n\n(В полной версии будет запущена настоящая игра)');
    }
}

// Улучшенная рулетка
class MovieRoulette {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.spinBtn = document.getElementById('spinBtn');
        this.result = document.getElementById('result');
        this.isSpinning = false;

        this.genres = [
            { name: 'Боевик', color: '#ff6b6b', icon: '💥', id: 'action' },
            { name: 'Комедия', color: '#feca57', icon: '😂', id: 'comedy' },
            { name: 'Драма', color: '#48dbfb', icon: '🎭', id: 'drama' },
            { name: 'Фантастика', color: '#1dd1a1', icon: '🚀', id: 'sci-fi' },
            { name: 'Ужасы', color: '#ff9ff3', icon: '👻', id: 'horror' },
            { name: 'Романтика', color: '#fd79a8', icon: '💕', id: 'romance' },
            { name: 'Триллер', color: '#a29bfe', icon: '🔪', id: 'thriller' },
            { name: 'Детектив', color: '#ffeaa7', icon: '🔍', id: 'mystery' }
        ];

        this.moviesDatabase = {
            'action': [
                { title: 'Джон Уик 4', year: 2023, rating: 7.7, duration: 169, description: 'Легендарный наемник Джон Уик продолжает сражаться с Преступным миром.' },
                { title: 'Миссия невыполнима 7', year: 2023, rating: 7.8, duration: 164, description: 'Итан Хант и его команда сталкиваются с самой опасной миссией.' },
                { title: 'Безумный Макс: Дорога ярости', year: 2015, rating: 8.1, duration: 120, description: 'Постапокалиптический боевик в пустыне будущего.' }
            ],
            'comedy': [
                { title: 'Одноклассники', year: 2023, rating: 7.2, duration: 118, description: 'Встреча выпускников спустя 20 лет приводит к неожиданным последствиям.' },
                { title: 'Джентльмены', year: 2019, rating: 7.8, duration: 113, description: 'Криминальная комедия о британском наркобароне.' },
                { title: 'Очень страшное кино', year: 2000, rating: 7.1, duration: 88, description: 'Пародия на фильмы ужасов.' }
            ],
            'drama': [
                { title: 'Оппенгеймер', year: 2023, rating: 8.3, duration: 180, description: 'История создания атомной бомбы.' },
                { title: 'Зеленая книга', year: 2018, rating: 8.2, duration: 130, description: 'Путешествие афроамериканского пианиста по югу США.' },
                { title: 'Форрест Гамп', year: 1994, rating: 8.8, duration: 142, description: 'Жизнь человека с низким IQ, повлиявшего на историю.' }
            ],
            'sci-fi': [
                { title: 'Дюна', year: 2021, rating: 8.0, duration: 155, description: 'Эпическая сага о пустынной планете Арракис.' },
                { title: 'Интерстеллар', year: 2014, rating: 8.6, duration: 169, description: 'Путешествие через червоточину в поисках нового дома.' },
                { title: 'Матрица', year: 1999, rating: 8.7, duration: 136, description: 'Хакер узнает шокирующую правду о реальности.' }
            ],
            'horror': [
                { title: 'Прочь', year: 2017, rating: 7.7, duration: 104, description: 'Психологический хоррор о визите к родителям девушки.' },
                { title: 'Хэллоуин', year: 2018, rating: 6.5, duration: 106, description: 'Возвращение Майкла Майерса.' },
                { title: 'Реинкарнация', year: 2022, rating: 7.1, duration: 122, description: 'Сверхъестественный хоррор о наследии семьи.' }
            ],
            'romance': [
                { title: 'Титаник', year: 1997, rating: 7.9, duration: 195, description: 'Любовная история на фоне крушения лайнера.' },
                { title: 'Ла-Ла Ленд', year: 2016, rating: 8.0, duration: 128, description: 'Музыкальная романтическая драма в Лос-Анджелесе.' },
                { title: 'Великий Гэтсби', year: 2013, rating: 7.2, duration: 143, description: 'Экранизация романа Фицджеральда.' }
            ],
            'thriller': [
                { title: 'Игра', year: 1997, rating: 7.8, duration: 129, description: 'Банкир попадает в опасную игру.' },
                { title: 'Семь', year: 1995, rating: 8.6, duration: 127, description: 'Детективы расследуют серию убийств.' },
                { title: 'Молчание ягнят', year: 1991, rating: 8.6, duration: 118, description: 'Стажерка ФБР консультируется с серийным убийцей.' }
            ],
            'mystery': [
                { title: 'Достать ножи', year: 2019, rating: 7.9, duration: 131, description: 'Детективное расследование смерти известного писателя.' },
                { title: 'Шерлок Холмс', year: 2009, rating: 7.6, duration: 128, description: 'Приключения знаменитого детектива.' },
                { title: 'Дело храбрых', year: 2017, rating: 7.1, duration: 134, description: 'Расследование пожара в церкви.' }
            ]
        };

        this.init();
    }

    init() {
        this.createWheel();
        this.setupEventListeners();
        this.updateYearDisplay();
    }

    createWheel() {
        this.wheel.innerHTML = '';
        const segmentAngle = 360 / this.genres.length;

        this.genres.forEach((genre, index) => {
            const segment = document.createElement('div');
            segment.className = 'wheel-segment';
            segment.style.transform = `rotate(${index * segmentAngle}deg)`;
            segment.style.background = `conic-gradient(from ${index * segmentAngle}deg to ${(index + 1) * segmentAngle}deg, ${genre.color}, ${genre.color}dd)`;

            const content = document.createElement('div');
            content.className = 'wheel-segment-content';
            content.innerHTML = `
                <span class="segment-icon">${genre.icon}</span>
                <div class="segment-text">${genre.name}</div>
            `;

            segment.appendChild(content);
            segment.dataset.genre = genre.id;
            this.wheel.appendChild(segment);
        });
    }

    setupEventListeners() {
        this.spinBtn.addEventListener('click', () => this.spinWheel());

        // Обработчики для фильтров
        document.querySelectorAll('.genre-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                if (tag.dataset.genre === 'all') {
                    document.querySelectorAll('.genre-tag').forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                } else {
                    document.querySelector('.genre-tag[data-genre="all"]').classList.remove('active');
                    tag.classList.toggle('active');
                }
            });
        });

        document.getElementById('yearSlider').addEventListener('input', (e) => {
            document.getElementById('yearValue').textContent = e.target.value;
        });
    }

    updateYearDisplay() {
        const slider = document.getElementById('yearSlider');
        const valueDisplay = document.getElementById('yearValue');
        valueDisplay.textContent = slider.value;
    }

    spinWheel() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.result.innerHTML = '';

        const spinText = this.spinBtn.querySelector('.spin-text');
        const spinningText = this.spinBtn.querySelector('.spinning-text');

        spinText.style.display = 'none';
        spinningText.style.display = 'block';
        this.spinBtn.disabled = true;

        // Вычисляем случайный угол остановки
        const spins = 5; // Количество полных оборотов
        const segmentAngle = 360 / this.genres.length;
        const randomSegment = Math.floor(Math.random() * this.genres.length);
        const stopAngle = spins * 360 + (360 - randomSegment * segmentAngle - segmentAngle / 2);

        // Запускаем анимацию
        this.wheel.style.transform = `rotate(${-stopAngle}deg)`;
        this.wheel.style.transition = `transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)`;

        // Показываем результат после завершения анимации
        setTimeout(() => {
            const winningGenre = this.genres[randomSegment];
            this.showResult(winningGenre);

            spinText.style.display = 'block';
            spinningText.style.display = 'none';
            this.spinBtn.disabled = false;
            this.isSpinning = false;
        }, 4200);
    }

    showResult(genre) {
        const movies = this.moviesDatabase[genre.id];
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        const resultHTML = `
            <div class="result-card">
                <div style="margin-bottom: 1.5rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">${genre.icon}</div>
                    <h3 style="color: ${genre.color}; margin-bottom: 0.5rem;">${genre.name}</h3>
                    <p style="color: var(--text-secondary);">Подобран фильм на основе ваших предпочтений</p>
                </div>

                <div class="movie-details">
                    <div class="movie-poster-small">
                        ${genre.icon}
                    </div>
                    <div class="movie-info">
                        <div class="movie-title">${randomMovie.title}</div>
                        <div class="movie-meta">
                            <span>⭐ ${randomMovie.rating}/10</span>
                            <span>📅 ${randomMovie.year}</span>
                            <span>⏱ ${randomMovie.duration} мин</span>
                        </div>
                        <div class="movie-description">${randomMovie.description}</div>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                    <button class="btn btn-primary" onclick="roulette.addToCollection('${randomMovie.title}', '${genre.name}')">
                        Добавить в коллекцию
                    </button>
                    <button class="btn btn-outline" onclick="roulette.spinWheel()">
                        Крутить снова
                    </button>
                </div>
            </div>
        `;

        this.result.innerHTML = resultHTML;

        // Плавное появление результата
        setTimeout(() => {
            this.result.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    addToCollection(movie, genre) {
        // Здесь будет интеграция с бэкендом
        alert(`Фильм "${movie}" добавлен в вашу коллекцию!`);

        // Обновляем статистику
        const stats = document.querySelectorAll('.user-stat .stat-value');
        if (stats[0]) {
            stats[0].textContent = parseInt(stats[0].textContent) + 1;
        }
    }

    getSelectedGenres() {
        const selectedTags = document.querySelectorAll('.genre-tag.active');
        if (selectedTags.length === 0) return this.genres.map(g => g.id);

        const selectedGenres = Array.from(selectedTags).map(tag => tag.dataset.genre);
        return selectedGenres.includes('all') ? this.genres.map(g => g.id) : selectedGenres;
    }
}

// Инициализация при загрузке
let roulette;

document.addEventListener('DOMContentLoaded', () => {
    roulette = new MovieRoulette();

    // Показываем главную страницу по умолчанию
    showPage('home');

    // Обработчик для рекламы игры
    document.querySelector('.btn-fire').addEventListener('click', playGame);
});

// Дополнительные функции для будущей интеграции с БД
class MovieRouletteAPI {
    static async getUserProfile() {
        return {
            name: 'Иван Иванов',
            email: 'ivan@example.com',
            preferences: ['comedy', 'sci-fi'],
            watchedMovies: 24,
            averageRating: 8.2
        };
    }

    static async savePreferences(preferences) {
        console.log('Preferences saved:', preferences);
        return { success: true };
    }

    static async getRecommendedMovie(filters) {
        return {
            title: 'Пример фильма',
            genre: filters.genres[0],
            rating: 8.5,
            year: 2023,
            duration: 120
        };
    }
}
