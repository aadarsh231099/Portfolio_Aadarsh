$(document).ready(function(){
    // Loading Screen
    setTimeout(function() {
        $('.loading-screen').addClass('hidden');
        setTimeout(function() {
            $('.loading-screen').hide();
        }, 500);
    }, 1500);

    // Theme Toggle
    let currentTheme = localStorage.getItem('theme') || 'light';
    $('body').attr('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    $('.theme-toggle').click(function(){
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        $('body').attr('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
    });

    function updateThemeIcon(theme) {
        const icon = $('.theme-toggle i');
        if (theme === 'dark') {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
    }

    // Scroll Progress Bar
    $(window).scroll(function(){
        const scrollTop = $(this).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('.scroll-progress-bar').css('width', scrollPercent + '%');
        
        // Sticky navbar
        if(scrollTop > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        
        // Scroll-up button show/hide
        if(scrollTop > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Scroll-up button
    $('.scroll-up-btn').click(function(){
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Smooth scrolling for navigation links
    $('.navbar .menu li a').click(function(e){
        e.preventDefault();
        const target = $(this).attr('href');
        const offsetTop = $(target).offset().top - 80;
        
        $('html, body').animate({
            scrollTop: offsetTop
        }, 800);
        
        // Close mobile menu
        $('.navbar .menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
    });

    // Mobile menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass('active');
            $('.menu-btn i').removeClass('active');
        }
    });

    // Typing animations
    var typed = new Typed(".typing", {
        strings: ["a Software Engineer", "a Full-Stack Developer", "a Freelancer", "a NodeJs Developer", "a Web Developer", "an App Developer", "a Competitive Coder", "a ML Enthusiast", "a Cuisine Connoisseur", "a Socializer", "a Gamer"],
        typeSpeed: 90,
        backSpeed: 70,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["a Software Engineer", "a Full-Stack Developer", "a Freelancer", "a NodeJs Developer", "a Web Developer", "an App Developer", "a Competitive Coder", "a ML Enthusiast", "a Cuisine Connoisseur", "a Socializer", "a Gamer"],
        typeSpeed: 90,
        backSpeed: 70,
        loop: true
    });

    // Skill bars animation - now using CSS classes
    function animateSkillBars() {
        // Add animate class to trigger CSS animations
        $('.skills').addClass('animate');
    }

    // Statistics counter animation
    function animateCounters() {
        $('.stat-item').each(function() {
            const $this = $(this);
            const countTo = parseFloat($this.attr('data-count'));
            const $number = $this.find('.stat-number');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    if (countTo % 1 === 0) {
                        $number.text(Math.floor(this.countNum));
                    } else {
                        $number.text(this.countNum.toFixed(1));
                    }
                },
                complete: function() {
                    if (countTo % 1 === 0) {
                        $number.text(Math.floor(countTo));
                    } else {
                        $number.text(countTo.toFixed(1));
                    }
                }
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                } else if (entry.target.classList.contains('statistics')) {
                    animateCounters();
                }
                
                // Add animation classes
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animations
    $('section').each(function() {
        observer.observe(this);
    });

    // Owl Carousel for teams section
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

    // Form validation and submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        $('.error-message').text('');
        $('.form-status').removeClass('success error').hide();
        
        let isValid = true;
        const formData = new FormData(this);
        
        // Validate name
        const name = $('#name').val().trim();
        if (name.length < 2) {
            $('#nameError').text('Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#emailError').text('Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        const subject = $('#subject').val().trim();
        if (subject.length < 5) {
            $('#subjectError').text('Subject must be at least 5 characters long');
            isValid = false;
        }
        
        // Validate message
        const message = $('#message').val().trim();
        if (message.length < 10) {
            $('#messageError').text('Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (!isValid) {
            return false;
        }
        
        // Show loading state
        const $submitBtn = $('#submitBtn');
        const $btnText = $('.btn-text');
        const $btnLoading = $('.btn-loading');
        
        $btnText.hide();
        $btnLoading.show();
        $submitBtn.prop('disabled', true);
        
        // Submit form
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                showFormStatus('success', 'Message sent successfully! Thank you for reaching out.');
                $('#contactForm')[0].reset();
            } else {
                showFormStatus('error', 'Failed to send message. Please try again later.');
            }
        })
        .catch(error => {
            showFormStatus('error', 'An error occurred. Please try again later.');
        })
        .finally(() => {
            $btnText.show();
            $btnLoading.hide();
            $submitBtn.prop('disabled', false);
        });
    });

    function showFormStatus(type, message) {
        const $status = $('#formStatus');
        $status.removeClass('success error')
               .addClass(type)
               .text(message)
               .show();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            $status.fadeOut();
        }, 5000);
    }

    // Real-time form validation
    $('#name, #email, #subject, #message').on('input', function() {
        const fieldId = $(this).attr('id');
        const errorId = '#' + fieldId + 'Error';
        $(errorId).text('');
    });

    // Parallax effect for home section
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.home');
        const speed = 0.5;
        
        if (parallax.length) {
            const yPos = -(scrolled * speed);
            parallax.css('transform', 'translateY(' + yPos + 'px)');
        }
    });

    // Add active class to navigation based on scroll position
    function updateActiveNav() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('section').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                $('.navbar .menu li a').removeClass('active');
                $('.navbar .menu li a[href="#' + id + '"]').addClass('active');
            }
        });
    }

    $(window).scroll(updateActiveNav);

    // Initialize tooltips for social icons
    $('.social-icon').tooltip({
        placement: 'top',
        trigger: 'hover'
    });

    // Add click ripple effect to buttons
    $('.social-icon, .projects .serv-content .button, .contact .right form .button-area button, .about .about-content .right a.cv').on('click', function(e) {
        const ripple = $('<span class="ripple"></span>');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        });
        
        $(this).append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Add parallax effect to statistics section
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const statsSection = $('.statistics');
        const statsOffset = statsSection.offset().top;
        const statsHeight = statsSection.height();
        
        if (scrolled >= statsOffset - $(window).height() && scrolled <= statsOffset + statsHeight) {
            const yPos = (scrolled - statsOffset) * 0.5;
            statsSection.css('transform', `translateY(${yPos}px)`);
        }
    });



    // Add hover effects to project cards
    $('.projects .card').hover(
        function() {
            $(this).find('.button').addClass('pulse');
        },
        function() {
            $(this).find('.button').removeClass('pulse');
        }
    );

    // Smooth reveal animation for elements
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Add reveal class to elements with different directions
    $('.projects .card').addClass('reveal reveal-left');
    $('.skills .bars').addClass('reveal reveal-right');
    $('.statistics .stat-item').addClass('reveal');
    $('.teams .card').addClass('reveal reveal-left');
    $('.about .about-content .left').addClass('reveal reveal-left');
    $('.about .about-content .right').addClass('reveal reveal-right');
    $('.contact .contact-content .left').addClass('reveal reveal-left');
    $('.contact .contact-content .right').addClass('reveal reveal-right');

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNav();
        revealOnScroll();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    $(window).scroll(requestTick);

    // Initialize animations when page loads
    setTimeout(function() {
        $('.home-content').addClass('loaded');
    }, 1000);
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pulse {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .loaded .text-1,
    .loaded .text-2,
    .loaded .text-3,
    .loaded .social-icons-container {
        animation: fadeInUp 1s ease forwards;
    }
    
    .loaded .text-2 {
        animation-delay: 0.2s;
    }
    
    .loaded .text-3 {
        animation-delay: 0.4s;
    }
    
    .loaded .social-icons-container {
        animation-delay: 0.6s;
    }
`;
document.head.appendChild(style);