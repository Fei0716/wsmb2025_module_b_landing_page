document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const container = document.querySelector('.hero-banners');
    const slides = document.querySelectorAll('.hero-banners article');
    const totalSlides = slides.length;
   
    //States
    let currentSlide = 0;

    //change the banner slides every 3 seconds
    setInterval(() => {
        currentSlide++;
        
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
            container.scrollTo({ left: 0 });
        } else {
            const width = container.clientWidth;
            container.scrollTo({ left: width * currentSlide});
        }
    }, 3000); 
});