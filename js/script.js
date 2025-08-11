document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.getElementById('burger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (burgerButton && mobileMenu && closeMenu) {
        burgerButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            burgerButton.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burgerButton.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        const navLinks = document.querySelectorAll('#mobile-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                burgerButton.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                mobileMenu.classList.remove('active');
                burgerButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});


function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    localStorage.setItem('theme', newTheme);
    
    updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
    const isDark = theme !== 'light';
    const themeText = isDark ? 'тёмная' : 'светлая';
    
    const desktopToggle = document.getElementById('theme-toggle');
    desktopToggle.setAttribute('aria-label', `Текущая тема: ${themeText}. Нажмите для переключения`);
    document.getElementById('sun-icon').classList.toggle('hidden', isDark);
    document.getElementById('moon-icon').classList.toggle('hidden', !isDark);
    
    const mobileToggle = document.getElementById('mobile-theme-toggle');
    mobileToggle.setAttribute('aria-label', `Текущая тема: ${themeText}. Нажмите для переключения`);
    document.getElementById('mobile-sun-icon').classList.toggle('hidden', isDark);
    document.getElementById('mobile-moon-icon').classList.toggle('hidden', !isDark);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = 'dark'; 
    if (savedTheme) {
        theme = savedTheme;
    } else if (!prefersDark) {
        theme = 'light';
    }
    
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    updateThemeUI(theme);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            initializeTheme();
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});