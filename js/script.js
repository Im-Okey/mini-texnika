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


function setTheme(themeName) {
    const root = document.documentElement;
    
    if (themeName === 'default') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', themeName);
    }
    
    localStorage.setItem('theme', themeName);
    updateActiveThemeButton(themeName);
}

function updateActiveThemeButton(themeName) {
    document.querySelectorAll('.theme-toggle').forEach(button => {
        if (button.getAttribute('data-theme') === themeName) {
            button.classList.add('ring-2', 'ring-offset-2', 'ring-[var(--primary-color)]');
            button.classList.remove('ring-0');
        } else {
            button.classList.remove('ring-2', 'ring-offset-2', 'ring-[var(--primary-color)]');
            button.classList.add('ring-0');
        }
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    document.querySelectorAll('.theme-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.getAttribute('data-theme');
            setTheme(themeName);
        });
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});