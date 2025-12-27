// script.js - Обновленная версия для темной темы
// Основной модуль приложения
const PhysicsHub = (() => {
    // Инициализация приложения
    const init = () => {
        setupEventListeners();
        setupPhysicsAnimation();
        setupPhysicistsSlider();
        checkPageSpecificFunctions();
        addAnimations();
    };

    // Настройка обработчиков событий
    const setupEventListeners = () => {
        // Мобильное меню
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }

        // Калькулятор силы на главной странице
        const calculateBtn = document.getElementById('calculateForce');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateForce);
        }

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Анимация при скролле
        window.addEventListener('scroll', handleScroll);
        
        // Обработка нажатия Enter в полях ввода
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const button = input.closest('.calculator-card')?.querySelector('.btn-primary');
                    if (button) button.click();
                }
            });
        });
    };

    // Улучшенная анимация физического явления для темной темы
    const setupPhysicsAnimation = () => {
        const animationContainer = document.getElementById('physicsAnimation');
        if (!animationContainer) return;

        // Очищаем контейнер
        animationContainer.innerHTML = '';

        // Создаем сложную анимацию атома с электронными орбитами
        const createElectronOrbit = (radius, speed, color, electronCount = 1) => {
            const orbit = document.createElement('div');
            orbit.className = 'electron-orbit';
            orbit.style.cssText = `
                position: absolute;
                width: ${radius * 2}px;
                height: ${radius * 2}px;
                border: 1px solid ${color}40;
                border-radius: 50%;
                animation: rotate ${speed}s linear infinite;
            `;

            // Добавляем электроны на орбиту
            for (let i = 0; i < electronCount; i++) {
                const electron = document.createElement('div');
                electron.className = 'electron';
                const angle = (360 / electronCount) * i;
                electron.style.cssText = `
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: radial-gradient(circle at 30% 30%, ${color}, ${color}80);
                    border-radius: 50%;
                    top: ${-6 + radius * Math.sin(angle * Math.PI / 180)}px;
                    left: ${-6 + radius * Math.cos(angle * Math.PI / 180)}px;
                    box-shadow: 0 0 8px ${color};
                    animation: pulse 2s ease-in-out infinite ${i * 0.5}s;
                `;
                orbit.appendChild(electron);
            }

            return orbit;
        };

        // Добавляем орбиты с электронами
        const orbits = [
            { radius: 60, speed: 6, color: '#00adb5', electrons: 2 },
            { radius: 100, speed: 10, color: '#ff5722', electrons: 8 },
            { radius: 140, speed: 16, color: '#9c27b0', electrons: 8 },
            { radius: 180, speed: 24, color: '#4caf50', electrons: 2 }
        ];

        orbits.forEach(orbit => {
            animationContainer.appendChild(createElectronOrbit(orbit.radius, orbit.speed, orbit.color, orbit.electrons));
        });

        // Добавляем центральное ядро
        const nucleus = document.createElement('div');
        nucleus.style.cssText = `
            position: absolute;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle at 30% 30%, #ff5722, #e64a19);
            border-radius: 50%;
            z-index: 10;
            box-shadow: 
                0 0 20px rgba(255, 87, 34, 0.7),
                0 0 40px rgba(255, 87, 34, 0.4),
                inset 0 0 10px rgba(0, 0, 0, 0.8);
            animation: nucleusPulse 3s ease-in-out infinite;
        `;
        animationContainer.appendChild(nucleus);

        // Добавляем CSS анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 8px var(--electron-color); }
                50% { transform: scale(1.2); box-shadow: 0 0 16px var(--electron-color); }
            }
            
            @keyframes nucleusPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 87, 34, 0.7), 0 0 40px rgba(255, 87, 34, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.8); }
                50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(255, 87, 34, 0.9), 0 0 60px rgba(255, 87, 34, 0.6), inset 0 0 15px rgba(0, 0, 0, 0.9); }
            }
            
            .electron { --electron-color: #00adb5; }
        `;
        document.head.appendChild(style);
    };

    // Калькулятор силы на главной странице
    const calculateForce = () => {
        const mass = parseFloat(document.getElementById('mass')?.value);
        const acceleration = parseFloat(document.getElementById('acceleration')?.value);
        const resultElement = document.getElementById('forceResult');

        if (!resultElement) return;

        if (isNaN(mass) || isNaN(acceleration)) {
            resultElement.textContent = 'Пожалуйста, введите корректные числа';
            resultElement.style.color = '#ff5722';
        } else {
            const force = mass * acceleration;
            resultElement.textContent = `Сила F = ${force.toFixed(2)} Н`;
            resultElement.style.color = '#4caf50';
            
            // Анимация результата
            resultElement.classList.remove('show');
            setTimeout(() => {
                resultElement.classList.add('show');
            }, 10);
            
            // Добавляем визуальный эффект
            if (force > 0) {
                showForceVisualization(force);
            }
        }
    };

    // Визуализация силы (дополнительный эффект)
    const showForceVisualization = (force) => {
        const animationContainer = document.getElementById('physicsAnimation');
        if (!animationContainer) return;

        // Создаем временный элемент для визуализации силы
        const forceVisual = document.createElement('div');
        forceVisual.style.cssText = `
            position: absolute;
            width: ${Math.min(force * 2, 100)}px;
            height: 10px;
            background: linear-gradient(90deg, #ff5722, #ff9800);
            border-radius: 5px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
            z-index: 5;
            opacity: 0.8;
            box-shadow: 0 0 10px rgba(255, 87, 34, 0.7);
            animation: forceExpand 0.5s ease-out forwards, fadeOut 0.5s ease-in 0.5s forwards;
        `;
        
        animationContainer.appendChild(forceVisual);
        
        // Удаляем элемент после анимации
        setTimeout(() => {
            if (forceVisual.parentNode) {
                forceVisual.parentNode.removeChild(forceVisual);
            }
        }, 1000);
        
        // Добавляем CSS для анимации
        const styleId = 'force-animation-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes forceExpand {
                    from { width: 0; opacity: 0; }
                    to { width: ${Math.min(force * 2, 100)}px; opacity: 0.8; }
                }
                
                @keyframes fadeOut {
                    from { opacity: 0.8; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Слайдер физиков
    const setupPhysicistsSlider = () => {
        const prevBtn = document.getElementById('prevPhysicist');
        const nextBtn = document.getElementById('nextPhysicist');
        const cards = document.querySelectorAll('.physicist-card');
        const dots = document.querySelectorAll('.dot');
        
        if (!prevBtn || !nextBtn || cards.length === 0) return;

        let currentIndex = 0;

        const showCard = (index) => {
            // Скрываем все карточки
            cards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Показываем выбранную
            cards[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };

        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = cards.length - 1;
            showCard(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= cards.length) newIndex = 0;
            showCard(newIndex);
        });

        // Добавляем обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showCard(index));
        });

        // Автопереключение слайдов
        let sliderInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= cards.length) newIndex = 0;
            showCard(newIndex);
        }, 5000);

        // Останавливаем автопереключение при наведении
        const sliderContainer = document.querySelector('.physicists-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                sliderInterval = setInterval(() => {
                    let newIndex = currentIndex + 1;
                    if (newIndex >= cards.length) newIndex = 0;
                    showCard(newIndex);
                }, 5000);
            });
        }
    };

    // Обработчик скролла с параллакс эффектом
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        // Эффект для навигации
        if (scrollPosition > 100) {
            navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
        
        // Параллакс эффект для герой секции
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = scrollPosition * 0.5;
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Анимация появления элементов при скролле
        animateOnScroll();
    };

    // Анимация элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .topic-card, .content-block');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Добавление анимаций при загрузке
    const addAnimations = () => {
        // Добавляем классы для анимации
        const elementsToAnimate = document.querySelectorAll('.topic-card, .content-block');
        elementsToAnimate.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Запускаем начальную проверку анимаций
        setTimeout(animateOnScroll, 100);
    };

    // Проверка специфических функций для страниц
    const checkPageSpecificFunctions = () => {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Если это страница калькулятора
        if (currentPage === 'calculator.html') {
            // Инициализация расширенного калькулятора
            initAdvancedCalculator();
        }
        
        // Если это страница квантовой физики
        if (currentPage === 'quantum.html') {
            initQuantumEffects();
        }
    };

    // Дополнительные эффекты для страницы квантовой физики
    const initQuantumEffects = () => {
        // Добавляем эффект мерцания для квантовых карточек
        const quantumCards = document.querySelectorAll('.topic-card');
        quantumCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = '0 0 20px rgba(0, 173, 181, 0.5), 0 20px 40px rgba(0, 0, 0, 0.4)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            });
        });
    };

    // Расширенный калькулятор для страницы calculator.html
    const initAdvancedCalculator = () => {
        // Добавляем эффекты для кнопок калькулятора
        const calculatorButtons = document.querySelectorAll('.calculator-card .btn-primary');
        calculatorButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Эффект нажатия
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Добавляем автоматическую очистку результатов при изменении ввода
        const inputs = document.querySelectorAll('.calculator-card input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const resultElement = this.closest('.calculator-card').querySelector('.calc-result');
                if (resultElement) {
                    resultElement.classList.remove('show');
                    setTimeout(() => {
                        resultElement.textContent = '';
                    }, 300);
                }
            });
        });
    };

    // Публичные методы
    return {
        init: init,
        calculateForce: calculateForce
    };
})();

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', PhysicsHub.init);

// Добавляем глобальные функции для использования в других скриптах
window.PhysicsHub = PhysicsHub;