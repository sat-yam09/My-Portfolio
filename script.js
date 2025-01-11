// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Scroll Animation
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Update active nav link
            navLinks.forEach(link => {
                if (link.getAttribute('href').slice(1) === entry.target.id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '-50px'
});

sections.forEach(section => {
    observer.observe(section);
    // Add initial hidden state
    section.classList.add('hidden');
});

// Enhanced Typing Animation
const text = document.querySelector('.typing-text');
const words = ['Computer Science Student', 'Web Developer', 'Java Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentWord = words[wordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    if (!isWaiting) {
        if (isDeleting) {
            text.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
    }
    
    text.classList.toggle('typing-cursor', !isWaiting);
    
    if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
            isDeleting = true;
            type();
        }, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
        return;
    }
    
    setTimeout(type, typeSpeed);
}

type();

// Dark mode toggle
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);
