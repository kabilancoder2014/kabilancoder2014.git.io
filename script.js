// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.classList.remove('shadow-sm');
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});



// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Trigger Launch Animation
        backToTopBtn.classList.remove('show'); // Stop floating
        backToTopBtn.classList.add('launch');

        // Start scrolling up
        smoothScrollToTop(1500);

        // Reset button state after animation and scroll are done
        setTimeout(() => {
            backToTopBtn.classList.remove('launch');
            // The scroll listener will handle adding 'show' back if needed, 
            // but since we are at top, it will stay hidden.
        }, 1500);
    });
}

function smoothScrollToTop(duration) {
    const startPosition = window.scrollY;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (easeOutCubic) for natural feel
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startPosition * (1 - ease));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }


    requestAnimationFrame(animation);
}

// Scroll Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
