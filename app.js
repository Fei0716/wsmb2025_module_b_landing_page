document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const container = document.querySelector('.hero-banners');
    const slides = document.querySelectorAll('.hero-banners article');
    const totalSlides = slides.length;
    const btnDown = document.querySelector('#btn-drop-section');
    const form = document.getElementById('form-signup');
    const toast = document.getElementById('toast-container');
    const msg = document.getElementById('toast-message');
    const btnUp = document.querySelector('#btn-up-section > img');
    const exhibitorContainer = document.querySelector('.exhibitor-card-group');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const jewelryContainer = document.querySelector('.showcase-card-group');
    const dotsContainer = document.getElementById('showcase-dots');
    const cards = document.querySelectorAll('.showcase-card');

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
    
    //scroll down to the next section after the banner
    btnDown.addEventListener('click', () => {
        let topOfNextSection = document.querySelector('.hero-section + section').offsetTop;
        window.scrollTo({ top: topOfNextSection, behavior: 'smooth' });
    });

    //show the toast
    const showToast = (text, type) => {
        msg.innerText = text;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.className = 'toast', 3000); 
    };

    //when submitting the form
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        // check for first empty field
        const emptyField = Array.from(form.querySelectorAll('[required]')).find(input => 
            input.type === 'checkbox' ? !input.checked : !input.value.trim()
        );

        if (emptyField) {
            emptyField.focus(); //focus on the empty field
            emptyField.classList.add('input-error'); 
            return showToast("Please fill in all required fields.", "error");
        }

        //check password match
        if (form.password.value !== form['password-confirmation'].value) {
            return showToast("Passwords do not match.", "error");
        }

        form.reset(); //clear the form after successful submission
        showToast("Account created successfully!", "success");
    });

    //remove red border when user starts typing
    form.addEventListener('input', (e) => e.target.classList.remove('input-error'));

    //scroll to top when clicking the button
    btnUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    //handle exhibitor section's scroll
    const scrollContainer = (direction) => {
        const cardWidth = exhibitorContainer.querySelector('.exhibitor-card').offsetWidth;
        const currentScroll = exhibitorContainer.scrollLeft;
        const maxScroll = exhibitorContainer.scrollWidth - exhibitorContainer.clientWidth;

        //if click right at the right end
        if (direction === 1 && currentScroll >= maxScroll - 10) {
            exhibitorContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } 
        //if click left at the left end
        else if (direction === -1 && currentScroll <= 10) {
            exhibitorContainer.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } 
        //scroll normally
        else {
            exhibitorContainer.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
        }
    };
    btnLeft.addEventListener('click', () => scrollContainer(-1));
    btnRight.addEventListener('click', () => scrollContainer(1));

    //jewelry collection
    const updateNavigation = () => {
        dotsContainer.innerHTML = ''; 
        
        const containerWidth = jewelryContainer.clientWidth;
        const cardWidth = cards[0].offsetWidth;
        const cardsPerView = Math.round(containerWidth / cardWidth);
        const totalPages = Math.ceil(cards.length / cardsPerView);

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active'); 
            
            dot.addEventListener('click', () => {
                jewelryContainer.scrollTo({
                    left: i * containerWidth,
                    behavior: 'smooth'
                });
            });
            
            dotsContainer.appendChild(dot);
        }
    };

    container.addEventListener('scroll', () => {
        const containerWidth = jewelryContainer.clientWidth;
        const currentPage = Math.round(jewelryContainer.scrollLeft / containerWidth);
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });

    updateNavigation();
    window.addEventListener('resize', updateNavigation);
});