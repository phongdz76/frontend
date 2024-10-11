const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slides = Array.from(document.querySelectorAll('.slide'));
let slideIndex = 0;
const maxSlides = 10; // Giới hạn số lượng slide tối đa là 10
const slideWidth = 30; // 20px width + 10px margin
let isSliding = false; // Để ngăn chặn việc nhấn nút khi đang chuyển slide

// Giới hạn số lượng slide thực tế
if (slides.length > maxSlides) {
    slides.splice(maxSlides);
    slider.innerHTML = '';
    slides.forEach(slide => slider.appendChild(slide));
}

function showSlide(index) {
    if (isSliding) return; // Ngăn chặn khi đang thực hiện chuyển động
    isSliding = true; // Đánh dấu bắt đầu chuyển động

    if (index >= slides.length) {
        slideIndex = 0; // Reset về đầu
    } else if (index < 0) {
        slideIndex = slides.length - 1; // Reset về cuối
    } else {
        slideIndex = index;
    }

    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

    slider.addEventListener('transitionend', () => {
        isSliding = false; // Đánh dấu kết thúc chuyển động
    }, { once: true });
}

function nextSlide() {
    if (!isSliding) showSlide(slideIndex + 1);
}

function prevSlide() {
    if (!isSliding) showSlide(slideIndex - 1);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-sliding with control over start and stop
let autoSlide = setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Pause auto-sliding on hover and resume when mouse leaves
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3000);
});


