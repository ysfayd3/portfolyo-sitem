// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
if (toggleButton) {
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.textContent = '🌙';
        } else {
            toggleButton.textContent = '☀️';
        }
    });
}

// Navbar Scroll Kontrolü ve Progress Bar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Progress Bar Hesaplaması
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const myBar = document.getElementById("myBar");
    if (myBar) {
        myBar.style.width = scrolled + "%";
    }
});

// Daktilo (Typewriter) Animasyonu
const textElement = document.getElementById('typewriter');
if (textElement) {
    const texts = ["Mobile Developer", "Software Engineer"]; // Yazılacak metinler
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Siliyor
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Yazıyor
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100; // Yazma hızı

        if (isDeleting) {
            typeSpeed /= 2; // Silme hızı daha hızlı olsun
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Yazı bitince 2 saniye bekle
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Sıradaki metne geç
            typeSpeed = 500; // Yeni kelimeye başlamadan önce bekle
        }

        setTimeout(type, typeSpeed);
    }

    // Sayfa yüklenince animasyonu başlat
    document.addEventListener('DOMContentLoaded', type);
}

// Yukarı Çık Butonu İşlevselliği
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// İletişim Formu AJAX Gönderimi
const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Sayfanın yenilenmesini engelle
        
        const data = new FormData(contactForm);
        const action = contactForm.action;

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusMessage.style.display = 'block';
                statusMessage.style.color = '#2ecc71'; // Yeşil renk
                statusMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi! Teşekkürler.';
                contactForm.reset(); // Formu temizle
            } else {
                throw new Error('Form gönderilemedi');
            }
        } catch (error) {
            statusMessage.style.display = 'block';
            statusMessage.style.color = '#e74c3c'; // Kırmızı renk
            statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Bir hata oluştu. Lütfen tekrar deneyin.';
        }
    });
}

// Deneyim Kartları Scroll Animasyonu (Fade-in)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`; // Sıralı geliş efekti
    const removeDelay = (e) => {
        if(e.target === card) {
            card.style.transitionDelay = '0s';
            card.removeEventListener('transitionend', removeDelay);
        }
    };
    card.addEventListener('transitionend', removeDelay);
    observer.observe(card);
});

// Mobil Menü Toggle İşlemleri
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}