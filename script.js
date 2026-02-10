/**
 * Прагматик Плей - Основные скрипты для сайта
 * pragmatic-play.icu
 */
console.log('Script.js загружен');

// ========== ХЛЕБНЫЕ КРОШКИ (BREADCRUMBS) ==========
function generateBreadcrumbs() {
    console.log('Функция generateBreadcrumbs вызвана');
    console.log('Текущий путь:', window.location.pathname);
    
    // Проверяем, находимся ли мы на странице слота
    const currentPath = window.location.pathname;
    const isSlotPage = /\/slots\/.+\//.test(currentPath) || /\/slots\/.+\.html$/.test(currentPath);
    
    if (isSlotPage) {
        console.log('Это страница слота, создаем breadcrumbs');
        
        // Получаем название слота
        let slotName = "Название слота";
        
        // Пробуем получить из H1
        const h1Element = document.querySelector('h1');
        if (h1Element) {
            slotName = h1Element.textContent
                .replace(/^Слот\s+/i, '')
                .replace(/\s*-\s*игра в казино.*$/i, '')
                .replace(/\s*-\s*играть.*$/i, '')
                .trim();
        } else {
            // Пробуем из title
            slotName = document.title
                .replace(/^Слот\s+/i, '')
                .replace(/\s*-\s*игра в казино.*$/i, '')
                .replace(/\s*-\s*играть.*$/i, '')
                .trim();
        }
        
        console.log('Название слота определено как:', slotName);
        
        // Создаем HTML breadcrumbs
        const breadcrumbsHTML = `
            <nav class="breadcrumbs" aria-label="Навигационная цепочка">
                <a href="/">Главная</a> > 
                <a href="/allslots.html">Все слоты</a> > 
                <span>${slotName}</span>
            </nav>
        `;
        
        // Вставляем после header
        const header = document.querySelector('header');
        if (header) {
            console.log('Header найден, вставляем breadcrumbs');
            header.insertAdjacentHTML('afterend', breadcrumbsHTML);
        } else {
            // Если нет header, вставляем после disclaimer
            const disclaimer = document.querySelector('.disclaimer');
            if (disclaimer) {
                disclaimer.insertAdjacentHTML('afterend', breadcrumbsHTML);
            } else {
                // В начало body
                document.body.insertAdjacentHTML('afterbegin', breadcrumbsHTML);
            }
        }
    } else {
        console.log('Это не страница слота, breadcrumbs не нужны');
    }
}

// ========== КОПИРОВАНИЕ ПРОМОКОДА ==========
function initCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    const promoCode = document.getElementById('promoCode');

    if (copyBtn && promoCode) {
        copyBtn.addEventListener('click', function() {
            const textToCopy = promoCode.textContent;

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Скопировано!';
                    copyBtn.classList.add('copied');

                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Ошибка копирования: ', err);
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        copyBtn.textContent = 'Скопировано!';
                        setTimeout(() => {
                            copyBtn.textContent = 'Скопировать';
                        }, 2000);
                    } catch (fallbackErr) {
                        console.error('Фоллбэк тоже не сработал: ', fallbackErr);
                        copyBtn.textContent = 'Ошибка';
                    }
                    document.body.removeChild(textArea);
                });
        });
    }
}

// ========== ОБРАБОТКА КНОПОК "ПОЛУЧИТЬ БОНУС" ==========
function initBonusButtons() {
    const desktopBonusBtn = document.getElementById('desktopBonusBtn');
    const mobileBonusBtn = document.getElementById('mobileBonusBtn');

    function handleBonusClick() {
        // Здесь может быть ваша логика
        console.log('Кнопка бонуса нажата');
    }

    if (desktopBonusBtn) {
        desktopBonusBtn.addEventListener('click', handleBonusClick);
    }
    if (mobileBonusBtn) {
        mobileBonusBtn.addEventListener('click', handleBonusClick);
    }
}

// ========== КНОПКА ПРОКРУТКИ НАВЕРХ ==========
function initScrollButtons() {
    const bottomScrollTopBtn = document.getElementById('bottomScrollTopBtn');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (bottomScrollTopBtn) {
        bottomScrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== ЛЕНИВАЯ ЗАГРУЗКА И АНИМАЦИИ ==========
function initAnimations() {
    // Плавное появление карточек при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slot-card').forEach(card => {
        observer.observe(card);
    });

    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .slot-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .slot-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ========== РАСКРЫВАЮЩИЙСЯ БЛОК ОПИСАНИЯ ==========
function initDescriptionToggle() {
    const descriptionToggle = document.getElementById('descriptionToggle');
    const descriptionContent = document.getElementById('descriptionContent');
    
    if (descriptionToggle && descriptionContent) {
        descriptionToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            descriptionContent.hidden = isExpanded;
            
            const toggleText = this.querySelector('.toggle-text');
            if (toggleText) {
                toggleText.textContent = isExpanded ? 'Открыть описание' : 'Скрыть описание';
            }
            
            if (!isExpanded) {
                setTimeout(() => {
                    descriptionContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && descriptionContent.hidden === false) {
                descriptionToggle.setAttribute('aria-expanded', 'false');
                descriptionContent.hidden = true;
                const toggleText = descriptionToggle.querySelector('.toggle-text');
                if (toggleText) {
                    toggleText.textContent = 'Открыть описание';
                }
            }
        });
        
        if (window.location.hash === '#description') {
            setTimeout(() => {
                descriptionToggle.click();
            }, 500);
        }
    }
}

// ========== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM полностью загружен');
    
    // Генерируем breadcrumbs
    generateBreadcrumbs();
    
    // Инициализируем все компоненты
    initCopyButton();
    initBonusButtons();
    initScrollButtons();
    initAnimations();
    initDescriptionToggle();
});

// ========== ОБРАБОТЧИК ДЛЯ ВСЕХ СТРАНИЦ ==========
// Дополнительный обработчик на случай, если DOM уже загружен
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        generateBreadcrumbs();
        initCopyButton();
        initBonusButtons();
        initScrollButtons();
        initAnimations();
        initDescriptionToggle();
    }, 100);
}
// Копирование промокода
const copyBtn = document.getElementById('copyBtn');
const promoCode = document.getElementById('promoCode');

if (copyBtn && promoCode) {
    copyBtn.addEventListener('click', () => {
        const textToCopy = promoCode.textContent;
        
        // Используем современный Clipboard API
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Успешное копирование
                copyBtn.textContent = 'Скопировано!';
                copyBtn.classList.add('copied');
                
                // Возвращаем исходный текст через 2 секунды
                setTimeout(() => {
                    copyBtn.textContent = 'Скопировать';
                    copyBtn.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                // Fallback для старых браузеров
                console.error('Ошибка копирования:', err);
                
                // Старый метод
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyBtn.textContent = 'Скопировано!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = 'Скопировать';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
    });
}

// Прокрутка наверх
const bottomScrollTopBtn = document.getElementById('bottomScrollTopBtn');
if (bottomScrollTopBtn) {
    bottomScrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Показать/скрыть кнопку прокрутки при скролле
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('bottomScrollTopBtn');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }
});

// Lazy loading для изображений
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Открытие внешних ссылок в новой вкладке
document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});