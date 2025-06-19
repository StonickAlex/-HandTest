// Основные элементы
const steps = {
    step0: document.getElementById('step0'),
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    step4: document.getElementById('step4'),
    analysisProgress: document.getElementById('analysisProgress'),
    afterReading: document.getElementById('afterReading')
};

const forms = {
    userForm: document.getElementById('userForm'),
    uploadArea: document.getElementById('uploadArea'),
    coffeePhoto: document.getElementById('coffeePhoto'),
    imagePreview: document.getElementById('imagePreview'),
    previewImg: document.getElementById('previewImg'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    fullReadingBtn: document.getElementById('ctaBtn')
};

// Данные пользователя
let userData = {
    name: '',
    birthdate: '',
    coffeeImageSrc: '',
    selectedSymbol: null,
    handLandmarks: null
};

// Текущий шаг
let currentStep = 0;

// Коллекция мистических символов с названиями
const mysticalSymbols = [{
        name: "Алхимический кристалл",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="2" opacity="0.6"/>
            <path d="M30 35 L50 15 L70 35 L85 50 L70 65 L50 85 L30 65 L15 50 Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
        </svg>`
    },
    {
        name: "Звезда магии",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M50 10 L59 38 L87 38 L65 56 L74 84 L50 66 L26 84 L35 56 L13 38 L41 38 Z" 
                  stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
        </svg>`
    },
    {
        name: "Древо жизни",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="20" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="35" cy="40" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="65" cy="40" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="25" cy="60" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="60" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="75" cy="60" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="80" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M50 28 L35 34 M50 28 L65 34 M35 46 L25 54 M35 46 L50 52 M65 46 L75 54 M65 46 L50 52 M50 68 L50 72" 
                  stroke="currentColor" stroke-width="1.5"/>
        </svg>`
    },
    {
        name: "Кельтский узел",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            <path d="M50 15 Q70 30 65 50 Q70 70 50 85 Q30 70 35 50 Q30 30 50 15" 
                  stroke="currentColor" stroke-width="2.5" fill="none"/>
            <path d="M15 50 Q30 30 50 35 Q70 30 85 50 Q70 70 50 65 Q30 70 15 50" 
                  stroke="currentColor" stroke-width="2.5" fill="none"/>
        </svg>`
    },
    {
        name: "Священная мандала",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <circle cx="50" cy="50" r="25" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            <circle cx="50" cy="50" r="12" stroke="currentColor" stroke-width="2" opacity="0.8"/>
            <path d="M50 10 L50 25 M50 75 L50 90 M10 50 L25 50 M75 50 L90 50 
                     M25 25 L35 35 M75 25 L65 35 M25 75 L35 65 M75 75 L65 65" 
                  stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="4" fill="currentColor"/>
        </svg>`
    },
    {
        name: "Трискелион",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            <path d="M50 50 Q50 20 30 35 Q40 50 50 50 Q80 50 65 70 Q50 60 50 50 Q50 80 70 65 Q60 50 50 50" 
                  stroke="currentColor" stroke-width="2.5" fill="none"/>
            <circle cx="50" cy="50" r="6" fill="currentColor"/>
        </svg>`
    },
    {
        name: "Око провидения",
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 20 L25 70 L75 70 Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="15" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
            <path d="M20 75 L80 75 M15 80 L85 80" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
        </svg>`
    }
];

// Массив различных текстов расклада
const readingTexts = [
    "Ваше прошлое в отношениях было связано с глубокими эмоциональными переживаниями. Звёзды показывают, что вы искали истинную близость, но встречали препятствия на своём пути.",

    "В вашем романтическом прошлом преобладали страстные чувства и неожиданные повороты. Судьба приготовила для вас множество испытаний, которые закалили ваше сердце.",

    "Ваша любовная история полна загадок и тайн. Вы всегда притягивали к себе особенных людей, но не всегда были готовы к их глубине.",

    "Прошлые отношения научили вас ценить искренность и доверие. Вы прошли через периоды одиночества, которые помогли вам лучше понять себя.",

    "В вашем сердце хранятся воспоминания о великой любви, которая изменила вас навсегда. Этот опыт стал основой для всех последующих отношений.",

    "Ваш путь в любви был извилистым и полным неожиданностей. Вы учились любить через боль и радость, обретая мудрость с каждым новым опытом.",

    "Звёзды указывают на то, что ваше прошлое в отношениях было связано с кармическими связями. Вы встречали души, с которыми были связаны в прошлых жизнях.",

    "Ваше романтическое прошлое окрашено в тёмные и светлые тона. Вы познали как высшие формы любви, так и глубокие разочарования.",

    "В прошлом вы часто жертвовали собой ради других, не всегда получая взамен равную отдачу. Это научило вас истинной ценности взаимности в отношениях.",

    "Ваша любовная история напоминает древнюю легенду - полна мистики, страсти и трансформаций. Каждые отношения меняли вас на глубинном уровне.",

    "Прошлые связи были для вас школой жизни, где вы изучали язык сердца. Не все уроки давались легко, но все они были необходимы.",

    "В вашем романтическом прошлом преобладали интуитивные связи. Вы часто чувствовали партнёров на расстоянии и предугадывали их мысли.",

    "Ваше сердце хранит память о запретной любви, которая оставила неизгладимый след в душе. Эта история повлияла на все ваши дальнейшие выборы.",

    "Прошлые отношения были для вас зеркалом, в котором вы познавали свои сильные и слабые стороны. Каждый партнёр открывал в вас новые грани.",

    "Ваш любовный путь был отмечен необычными встречами и мистическими совпадениями. Судьба всегда посылала вам знаки через отношения."
];

// Массив мистических фраз для анализа
const analysisPhrases = [
    'Считываем линии судьбы...',
    'Изучаем пересечения жизненных путей...',
    'Видим отражение прошлого и будущего...',
    'Волны энергии проходят по ладони...',
    'Открываем врата тайного знания...',
    'Линии сердца, ума и жизни соединяются...',
    'Магический круг активирован...'
];

// Добавлю больше текстов для расклада и финального описания
const finalDescriptions = [
    'Этот символ — древний знак защиты и удачи. Пусть он принесёт вам гармонию и свет.',
    'Ваша ладонь указывает на сильную связь с предками. Прислушайтесь к внутреннему голосу.',
    'Судьба открывает перед вами новые пути. Не бойтесь перемен — они к лучшему.',
    'Ваша энергия притягивает успех и любовь. Откройтесь миру и принимайте дары Вселенной.',
    'Магия вашего символа будет сопровождать вас в важных решениях ближайших месяцев.'
];

// Короткие варианты финальных текстов с именем и знаком зодиака
const finalShortTexts = [
    (name, zodiac) => `${name}, твоя ладонь и знак ${zodiac} говорят о скорых переменах и новых возможностях. Доверься интуиции!`,
    (name, zodiac) => `${name}, твой знак — ${zodiac}. Линии судьбы обещают гармонию и успех в ближайшее время.`,
    (name, zodiac) => `Судя по ладони и твоему знаку ${zodiac}, ${name}, тебя ждёт приятный сюрприз от Вселенной.`,
    (name, zodiac) => `${name}, твоя энергия ${zodiac} притягивает удачу. Верь в себя — всё получится!`,
    (name, zodiac) => `Ладонь и знак ${zodiac} подсказывают, что сейчас время для новых начинаний, ${name}.`,
    (name, zodiac) => `${name}, твой путь под знаком ${zodiac} освещён звёздами. Ожидай вдохновения и поддержки!`,
    (name, zodiac) => `Символ и твой знак ${zodiac} намекают: ${name}, впереди важная встреча или событие.`,
    (name, zodiac) => `${name}, твоя ладонь и знак ${zodiac} — ключ к исполнению желания. Действуй смело!`,
    (name, zodiac) => `Судьба благоволит тебе, ${name} (${zodiac}). Откройся новым возможностям!`,
    (name, zodiac) => `${name}, твой знак зодиака — ${zodiac}. Линии ладони обещают перемены к лучшему.`
];

// Длинные, завлекающие тексты для финального шага
const finalLongTexts = [
    (name, zodiac) => `${name}, твой путь под знаком ${zodiac} освещён звёздами. В ближайшие дни ты можешь получить важный знак судьбы — не упусти свой шанс узнать больше! Открой для себя тайны, которые Вселенная приготовила именно для тебя.`,
    (name, zodiac) => `${name}, твоя ладонь и знак ${zodiac} говорят о скрытых возможностях и новых горизонтах. Магия уже рядом — доверься интуиции и открой свою судьбу полностью!`,
    (name, zodiac) => `Судя по линиям ладони и твоему знаку ${zodiac}, ${name}, тебя ждёт период перемен и вдохновения. Не упусти возможность узнать, что ещё приготовила для тебя Вселенная!`,
    (name, zodiac) => `${name}, твоя энергия ${zodiac} сейчас особенно сильна. Символ, который ты получил, — это ключ к новым возможностям. Готов узнать больше?`,
    (name, zodiac) => `Ладонь и знак ${zodiac} подсказывают: сейчас время для новых начинаний, ${name}. Открой все тайны своей судьбы — жми на кнопку ниже!`,
    (name, zodiac) => `${name}, твой знак зодиака — ${zodiac}. Линии ладони обещают перемены к лучшему. Получи полный мистический расклад и узнай, что ждёт тебя впереди!`,
    (name, zodiac) => `${name}, твоя ладонь и знак ${zodiac} — это карта к исполнению желаний. Не упусти шанс узнать все секреты своей судьбы!`,
    (name, zodiac) => `Символ и твой знак ${zodiac} намекают: ${name}, впереди важная встреча или событие. Получи все ответы в полном раскладе!`,
    (name, zodiac) => `${name}, твоя энергия под знаком ${zodiac} притягивает удачу. Открой для себя все тайны — нажми на кнопку и получи полный расклад!`,
    (name, zodiac) => `Судьба благоволит тебе, ${name} (${zodiac}). Откройся новым возможностям и получи свой полный мистический расклад!`
];

// Описания символов (по имени)
const finalSymbolDescriptions = {
    'Алхимический кристалл': 'Этот символ приносит гармонию и внутреннюю силу. Он помогает раскрыть таланты и притянуть удачу.',
    'Звезда магии': 'Звезда магии — знак вдохновения и новых начинаний. Ожидай приятных перемен и творческих успехов.',
    'Древо жизни': 'Древо жизни символизирует рост, процветание и крепкие связи с близкими. Время для новых свершений!',
    'Кельтский узел': 'Кельтский узел — знак вечности и защиты. Он оберегает от негатива и помогает принимать верные решения.',
    'Священная мандала': 'Мандала приносит гармонию, баланс и внутренний покой. Ожидай ясности мыслей и душевного равновесия.',
    'Трискелион': 'Трискелион — символ движения и развития. Впереди новые открытия и личностный рост.',
    'Око провидения': 'Око провидения открывает скрытые знания и усиливает интуицию. Прислушивайся к внутреннему голосу!'
};

// --- MediaPipe Drawing Utils ---
const { drawConnectors, drawLandmarks, HAND_CONNECTIONS } = window;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    addMysticalEffects();
    // Кнопка 'Начать' для step0
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            transitionToStep(1);
        });
    }
});

// Обработчики событий
function initEventListeners() {
    // Форма с данными пользователя
    forms.userForm.addEventListener('submit', handleUserFormSubmit);

    // Загрузка файла
    forms.uploadArea.addEventListener('click', () => forms.coffeePhoto.click());
    forms.uploadArea.addEventListener('dragover', handleDragOver);
    forms.uploadArea.addEventListener('drop', handleFileDrop);
    forms.coffeePhoto.addEventListener('change', handleFileSelect);

    // Анализ изображения
    forms.analyzeBtn.addEventListener('click', startAnalysis);

    // Переход к полному раскладу
    forms.fullReadingBtn.addEventListener('click', redirectToFullReading);
}

function isValidBirthdate(dateStr) {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    if (date > now) return false;
    const minDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
    if (date < minDate) return false;
    return true;
}

// Обработка отправки формы с данными
function handleUserFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const birthdate = document.getElementById('birthdate').value;

    if (!name || !birthdate) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }

    if (!isValidBirthdate(birthdate)) {
        showNotification('Введите корректную дату рождения (не из будущего и не старше 120 лет)', 'error');
        return;
    }

    userData.name = name;
    userData.birthdate = birthdate;

    // Плавный переход к следующему шагу
    transitionToStep(2);
}

// Переход между шагами
function transitionToStep(stepNumber) {
    const currentStepElement = steps[`step${currentStep}`];
    const nextStepElement = steps[`step${stepNumber}`];
    currentStepElement.style.transform = 'translateX(-50%) translateY(-50%) translateY(-50px) scale(0.9)';
    currentStepElement.style.opacity = '0';
    currentStepElement.style.filter = 'blur(5px)';
    setTimeout(() => {
        currentStepElement.classList.remove('active');
        nextStepElement.classList.add('active');
        currentStep = stepNumber;
        setTimeout(() => {
            nextStepElement.style.transform = 'translateX(-50%) translateY(-50%) translateY(0) scale(1)';
            nextStepElement.style.opacity = '1';
            nextStepElement.style.filter = 'blur(0px)';
        }, 150);
    }, 400);
}

// Обработка drag & drop
function handleDragOver(e) {
    e.preventDefault();
    forms.uploadArea.style.borderColor = 'var(--primary-color)';
    forms.uploadArea.style.background = 'rgba(255, 255, 255, 0.8)';
}

function handleFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
    resetUploadAreaStyle();
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

function resetUploadAreaStyle() {
    forms.uploadArea.style.borderColor = 'var(--border-color)';
    forms.uploadArea.style.background = 'rgba(255, 255, 255, 0.6)';
}

// Обработка загруженного файла
function processFile(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('Пожалуйста, загрузите изображение', 'error');
        return;
    }
    // Показываем лоадер, скрываем uploadArea и превью
    forms.uploadArea.style.display = 'none';
    const loader = document.getElementById('uploadLoader');
    if (loader) loader.classList.remove('hidden');
    forms.imagePreview.classList.add('hidden');
    const reader = new FileReader();
    reader.onload = function(e) {
        checkHandOnImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

// Проверка наличия руки на изображении
function checkHandOnImage(imageSrc) {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = function() {
        // Создаем canvas для анализа
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Инициализация MediaPipe Hands
        const hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });
        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        });

        hands.onResults((results) => {
            if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
                showNotification('Пожалуйста, загрузите фото ладони (руки)', 'error');
                // Скрываем лоадер, показываем uploadArea
                const loader = document.getElementById('uploadLoader');
                if (loader) loader.classList.add('hidden');
                forms.uploadArea.style.display = '';
                return;
            }
            userData.handLandmarks = results.multiHandLandmarks[0];
            userData.coffeeImageSrc = canvas.toDataURL();
            // Скрываем лоадер, показываем превью
            const loader = document.getElementById('uploadLoader');
            if (loader) loader.classList.add('hidden');
            showImagePreview(canvas.toDataURL());
        });

        hands.send({ image: img });
    };
}

// Рисуем линии ладони
function drawPalmLines(canvas, landmarks) {
    const ctx = canvas.getContext('2d');
    drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#d4a574', lineWidth: 3 });
    drawLandmarks(ctx, landmarks, { color: '#8b6f47', lineWidth: 2 });
}

// Показ превью изображения
function showImagePreview(imageSrc) {
    forms.previewImg.src = imageSrc;
    forms.uploadArea.style.display = 'none';
    forms.imagePreview.classList.remove('hidden');
    forms.imagePreview.classList.add('fade-in-up');

    // Удаляем старый canvas, если был
    const oldCanvas = document.getElementById('handLinesCanvas');
    if (oldCanvas) oldCanvas.remove();

    // Добавляем canvas поверх превью
    const img = forms.previewImg;
    img.onload = function() {
        // Увеличим размер превью
        img.style.width = '320px';
        img.style.height = '320px';
        const canvas = document.createElement('canvas');
        canvas.id = 'handLinesCanvas';
        canvas.width = 320;
        canvas.height = 320;
        canvas.style.position = 'absolute';
        canvas.style.left = img.offsetLeft + 'px';
        canvas.style.top = img.offsetTop + 'px';
        canvas.style.width = img.width + 'px';
        canvas.style.height = img.height + 'px';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = 2;
        forms.imagePreview.style.position = 'relative';
        forms.imagePreview.appendChild(canvas);

        // Получаем landmarks из последнего анализа (userData.handLandmarks)
        if (userData.handLandmarks) {
            drawPalmLinesAnimated(canvas, userData.handLandmarks);
        }
    };
}

// Анимированное рисование линий и точек ладони
function drawPalmLinesAnimated(canvas, landmarks, callback) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Список всех соединений (пар индексов)
    const connections = HAND_CONNECTIONS.map(pair => [...pair]);
    let current = 0;

    function drawNextConnection() {
        if (current < connections.length) {
            const [startIdx, endIdx] = connections[current];
            const start = landmarks[startIdx];
            const end = landmarks[endIdx];
            ctx.strokeStyle = '#6ecaff'; // голубой
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
            ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
            ctx.stroke();
            current++;
            setTimeout(drawNextConnection, 40);
        } else {
            drawLandmarksAnimated();
        }
    }

    function drawLandmarksAnimated() {
        let i = 0;

        function drawNextLandmark() {
            if (i < landmarks.length) {
                const pt = landmarks[i];
                ctx.beginPath();
                ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 8, 0, 2 * Math.PI);
                ctx.fillStyle = '#a259ff'; // фиолетовый
                ctx.shadowColor = '#a259ff';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
                i++;
                setTimeout(drawNextLandmark, 20);
            } else if (callback) {
                callback();
            }
        }
        drawNextLandmark();
    }
    drawNextConnection();
}

// Функция запуска анализа с прогресс-баром и фразами
function startAnalysis() {
    // Переход к магическому лоадеру
    transitionToStep(3);
    setTimeout(() => {
        transitionToStep(4);
        performTransformation();
    }, 2500);
}

// Функция для определения знака зодиака по дате рождения
function getZodiacSign(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Водолей';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Рыбы';
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Овен';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Телец';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Близнецы';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Рак';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Лев';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Дева';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Весы';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Скорпион';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Стрелец';
    return 'Козерог';
}

function performTransformation() {
    // Убираю задержку и сразу показываю результат
    const finalPalmImg = document.getElementById('finalPalmImg');
    const finalPalmContainer = document.querySelector('.final-palm-container');
    if (finalPalmImg) {
        if (userData.coffeeImageSrc) {
            finalPalmImg.src = userData.coffeeImageSrc;
            finalPalmImg.classList.add('visible');
            finalPalmImg.style.display = 'block';
            if (finalPalmContainer) finalPalmContainer.style.display = 'flex';
        } else {
            finalPalmImg.style.display = 'none';
            if (finalPalmContainer) finalPalmContainer.style.display = 'none';
        }
    }
    // Длинный магический текст
    const name = userData.name || '';
    const zodiac = getZodiacSign(userData.birthdate);
    const finalReadingText = document.getElementById('finalReadingText');
    const randomLongText = finalLongTexts[Math.floor(Math.random() * finalLongTexts.length)](name, zodiac);
    finalReadingText.innerHTML = randomLongText;
    // Символ — отдельный блок
    const finalSymbolBlock = document.getElementById('finalSymbolBlock');
    const symbol = userData.selectedSymbol ? userData.selectedSymbol.svg : getRandomSymbol();
    finalSymbolBlock.innerHTML = `<div class=\"mystical-symbol animated\">${symbol}</div>`;
    // Описание символа
    const finalSymbolDesc = document.getElementById('finalSymbolDesc');
    const symbolName = userData.selectedSymbol ? userData.selectedSymbol.name : '';
    finalSymbolDesc.textContent = finalSymbolDescriptions[symbolName] || 'Этот символ несёт особую магию и защиту.';
    // Кнопка CTA
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        ctaBtn.onclick = function() {
            window.open('https://example.com/full-offer', '_blank');
        };
    }
}

// Получение случайного мистического символа
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * mysticalSymbols.length);
    const selectedSymbol = mysticalSymbols[randomIndex];

    // Сохраняем выбранный символ для использования в тексте
    userData.selectedSymbol = selectedSymbol;

    return selectedSymbol.svg;
}

// Получение случайного текста расклада
function getRandomReadingText() {
    const randomIndex = Math.floor(Math.random() * readingTexts.length);
    return readingTexts[randomIndex];
}

// Создание мистических частиц поверх изображения
function createMysticalParticles() {
    const particlesContainer = document.querySelector('.floating-particles');

    // Очищаем предыдущие частицы
    particlesContainer.innerHTML = '';

    // Создаем 20 случайных частиц для более насыщенного эффекта
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const delay = Math.random() * 3;
        const duration = Math.random() * 4 + 3;
        const hue = Math.random() * 60 + 20; // Золотистые оттенки

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue}, 70%, 60%) 0%, hsl(${hue}, 50%, 40%) 100%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: particleFloat ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s infinite;
            box-shadow: 0 0 ${size * 3}px hsla(${hue}, 70%, 60%, 0.6);
            pointer-events: none;
        `;

        particlesContainer.appendChild(particle);
    }

    // Добавляем дополнительные светящиеся точки
    for (let i = 0; i < 8; i++) {
        const glowParticle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 2;

        glowParticle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: twinkle 4s ease-in-out ${delay}s infinite;
            box-shadow: 0 0 ${size * 5}px var(--mystical-glow);
            pointer-events: none;
        `;

        particlesContainer.appendChild(glowParticle);
    }
}

// Эффект печатающего текста
function typeWriterEffect() {
    const textElement = document.querySelector('.reading-text p');
    const text = textElement.textContent;
    textElement.textContent = '';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 30);
}

// Переход к полному раскладу
function redirectToFullReading() {
    // Здесь должна быть партнёрская ссылка
    const affiliateUrl = 'https://example.com/full-reading';

    // Добавляем параметры пользователя
    const params = new URLSearchParams({
        name: userData.name,
        birthdate: userData.birthdate
    });

    // Анимация клика
    forms.fullReadingBtn.style.transform = 'scale(0.95)';

    setTimeout(() => {
        window.open(`${affiliateUrl}?${params.toString()}`, '_blank');
        forms.fullReadingBtn.style.transform = 'scale(1)';
    }, 150);
}

// Добавление мистических эффектов
function addMysticalEffects() {
    // Добавляем дополнительные звёзды в случайных местах
    createRandomStars();

    // Плавающие частицы
    createFloatingParticles();

    // Мерцание элементов
    addShimmerEffects();
}

// Создание случайных звёзд
function createRandomStars() {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0.4;
        `;

        starsContainer.appendChild(star);
    }
}

// Создание плавающих частиц
function createFloatingParticles() {
    const body = document.body;

    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(212, 165, 116, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            z-index: -1;
            animation: floatUp 10s linear forwards;
        `;

        body.appendChild(particle);

        // Удаляем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }, 3000);
}

// Добавление эффектов мерцания
function addShimmerEffects() {
    const mysticalElements = document.querySelectorAll('.mystical-form, .upload-area, .reading-text');

    mysticalElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.2)';

            setTimeout(() => {
                element.style.boxShadow = '';
            }, 2000);
        }, index * 1000);
    });
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : 'var(--primary-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 14px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Добавляем CSS анимации через JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes particleFloat {
        0% { 
            opacity: 0; 
            transform: translateY(0) rotate(0deg) scale(0); 
        }
        20% { 
            opacity: 0.8; 
            transform: translateY(-10px) rotate(90deg) scale(1); 
        }
        80% { 
            opacity: 0.6; 
            transform: translateY(-20px) rotate(270deg) scale(1.2); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-30px) rotate(360deg) scale(0); 
        }
    }
    
    @keyframes floatUp {
        0% { 
            opacity: 0; 
            transform: translateY(0) rotate(0deg); 
        }
        10% { 
            opacity: 1; 
        }
        90% { 
            opacity: 1; 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-100vh) rotate(360deg); 
        }
    }
`;
document.head.appendChild(additionalStyles);

// Обновляем функцию addTransformationEffects
function addTransformationEffects() {
    // Эта функция теперь вызывается в performTransformation
    createMysticalParticles();
}