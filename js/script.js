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
    updateToggleButton(newTheme);
}


function updateToggleButton(theme) {
    const isDark = theme !== 'light';
    document.getElementById('theme-toggle').classList.toggle('dark', isDark);
    document.getElementById('sun-icon').classList.toggle('hidden', isDark);
    document.getElementById('moon-icon').classList.toggle('hidden', !isDark);
    
    document.getElementById('mobile-theme-toggle').classList.toggle('dark', isDark);
    document.getElementById('mobile-sun-icon').classList.toggle('hidden', isDark);
    document.getElementById('mobile-moon-icon').classList.toggle('hidden', !isDark);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);

window.addEventListener('DOMContentLoaded', initializeTheme);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});