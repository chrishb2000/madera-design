// ===================================
// DOM Content Loaded
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initLanguageSwitch();
    initScrollToTop();
    initPortfolioModals();
    initCarousel();
    initRevealAnimations();
});

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Close mobile menu
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===================================
// Language Switch
// ===================================
let currentLang = 'en';

function initLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-en and data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update meta tags
    updateMetaTags(lang);
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

function updateMetaTags(lang) {
    const pageTitle = document.getElementById('page-title');
    const metaDescription = document.getElementById('meta-description');
    const metaKeywords = document.getElementById('meta-keywords');
    const ogTitle = document.getElementById('og-title');
    const ogDescription = document.getElementById('og-description');
    const twitterTitle = document.getElementById('twitter-title');
    const twitterDescription = document.getElementById('twitter-description');
    
    if (lang === 'es') {
        pageTitle.textContent = 'Madera Design & Construction | Construcción y Remodelación Premium en San Francisco';
        metaDescription.content = 'Madera Design & Construction ofrece servicios premium de nueva construcción, renovaciones, gabinetes personalizados y remodelación en San Francisco, Sonoma y Napa. Artesanía garantizada.';
        ogTitle.content = 'Madera Design & Construction | Construcción y Remodelación Premium';
        ogDescription.content = 'Especializados en nueva construcción, renovaciones y gabinetes personalizados en el Área de la Bahía de SF.';
        twitterTitle.content = 'Madera Design & Construction | Servicios Premium de Remodelación';
        twitterDescription.content = 'Artesanía de calidad para nueva construcción, renovaciones y gabinetes personalizados.';
    } else {
        pageTitle.textContent = 'Madera Design & Construction | Premium Remodeling & Construction in San Francisco Bay Area';
        metaDescription.content = 'Madera Design & Construction offers premium new construction, renovations, custom cabinetry, and remodeling services in San Francisco, Sonoma, and Napa. Quality craftsmanship guaranteed.';
        ogTitle.content = 'Madera Design & Construction | Premium Remodeling & Construction';
        ogDescription.content = 'Specializing in new construction, renovations & custom cabinetry in the SF Bay Area.';
        twitterTitle.content = 'Madera Design & Construction | Premium Remodeling Services';
        twitterDescription.content = 'Quality craftsmanship for new construction, renovations & custom cabinetry.';
    }
}

// Load saved language preference
const savedLang = localStorage.getItem('preferredLanguage');
if (savedLang && savedLang !== currentLang) {
    switchLanguage(savedLang);
    document.querySelector(`.lang-btn[data-${savedLang}]`)?.classList.add('active');
    document.querySelector(`.lang-btn[data-${savedLang === 'en' ? 'es' : 'en'}]`)?.classList.remove('active');
}

// ===================================
// Scroll to Top Button
// ===================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===================================
// Portfolio Modals
// ===================================
function initPortfolioModals() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modals = document.querySelectorAll('.modal');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.dataset.modal;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }
        
        // Close when clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===================================
// Carousel
// ===================================
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!track || slides.length === 0) return;
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1, slides, track, dots);
            resetAutoplay(slides, track, dots);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1, slides, track, dots);
            resetAutoplay(slides, track, dots);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index, slides, track, dots);
            resetAutoplay(slides, track, dots);
        });
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(touchStartX, touchEndX, slides, track, dots);
        resetAutoplay(slides, track, dots);
    }, { passive: true });
    
    // Start autoplay
    startAutoplay(slides, track, dots);
}

function goToSlide(index, slides, track, dots) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    // Update track position
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active states
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function handleSwipe(startX, endX, slides, track, dots) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            goToSlide(currentSlide + 1, slides, track, dots);
        } else {
            // Swipe right - prev
            goToSlide(currentSlide - 1, slides, track, dots);
        }
    }
}

function startAutoplay(slides, track, dots) {
    carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1, slides, track, dots);
    }, 5000);
}

function resetAutoplay(slides, track, dots) {
    clearInterval(carouselInterval);
    startAutoplay(slides, track, dots);
}

// ===================================
// Reveal Animations on Scroll
// ===================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// ===================================
// Active Nav Link Highlight
// ===================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Performance: Lazy Load Images
// ===================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}
