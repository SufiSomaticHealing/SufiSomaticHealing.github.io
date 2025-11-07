document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3, // Element appears when 30% of it is visible
        rootMargin: "0px 0px -100px 0px" // Start appearing earlier as it comes into view from bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const closeButton = document.querySelector('.close-button');
    const youtubeVideo = document.getElementById('youtube-video');

    if (videoThumbnail && videoModal && closeButton && youtubeVideo) {
        videoThumbnail.addEventListener('click', () => {
            youtubeVideo.src = "https://www.youtube.com/embed/Wemm-i6XHr8?autoplay=1";
            videoModal.style.display = 'flex';
        });

        closeButton.addEventListener('click', () => {
            videoModal.style.display = 'none';
            youtubeVideo.src = ''; // Stop video playback
        });

        window.addEventListener('click', (event) => {
            if (event.target === videoModal) {
                videoModal.style.display = 'none';
                youtubeVideo.src = ''; // Stop video playback
            }
        });
    }

    // مطمئن شوید که YOUR_UNIQUE_ID را با شناسه فرم Formspree خود جایگزین کنید!
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwovkow"; 

const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // جلوگیری از ارسال پیش‌فرض و رفرش شدن صفحه
        
        // پاک کردن پیام‌های قبلی
        statusDiv.innerHTML = ""; 
        
        const data = new FormData(e.target);
        
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json' 
            }
        })
        .then(response => {
            if (response.ok) {
                // ارسال موفق
                statusDiv.innerHTML = "✅ Message sent successfully!";
                form.reset(); // پاک کردن فیلدها
            } else {
                // ارسال ناموفق (بررسی پاسخ Formspree برای پیام خطا)
                return response.json().then(data => {
                    let errorMessage = "❌ Unknown error occurred during submission.";
                    if (data && data["errors"]) {
                        errorMessage = "❌ Submission Error: " + data["errors"].map(error => error["message"]).join(", ");
                    }
                    statusDiv.innerHTML = errorMessage;
                })
            }
        })
        .catch(error => {
            // خطای شبکه
            statusDiv.innerHTML = "❌ Connection Error: Please check your internet connection and try again.";
        });
    });
}
});