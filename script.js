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
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Скопировано!';
                copyBtn.classList.add('copied');
                
                // Возвращаем исходный текст через 2 секунды
                setTimeout(() => {
                    copyBtn.textContent = originalText;
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
                
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Скопировано!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
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
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Проверяем, есть ли data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback для старых браузеров
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
        });
    }
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

// Исправление для мобильного меню и навигации
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс для определения мобильных устройств
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('is-mobile');
        
        // Улучшаем обработку касаний для кнопок
        const buttons = document.querySelectorAll('button, a[class*="button"], .slot-link');
        buttons.forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
});

// Предотвращение масштабирования при двойном тапе на iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Исправление viewport для iOS
if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

// Добавляем поддержку свайпов для мобильных
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    // Легкий свайп влево/вправо для навигации
    if (Math.abs(diff) > swipeThreshold) {
        // Можно добавить навигацию по карточкам слотов
        console.log('Swipe detected:', diff > 0 ? 'left' : 'right');
    }
}