 // Animated counters for statistics
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
                const suffix = target.replace(/[0-9.]/g, '');
                
                let current = 0;
                const increment = numericValue / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 40);
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate counters when stats section comes into view
                    if (entry.target.classList.contains('stats-section')) {
                        animateCounters();
                    }
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.topic-card, .threat-card, .tool-card, .resource-card, .stats-section').forEach(element => {
            if (!element.classList.contains('stats-section')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
            observer.observe(element);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update threat level animation
        setInterval(() => {
            const threatLevel = document.querySelector('.threat-level');
            threatLevel.style.transform = 'scale(1.05)';
            setTimeout(() => {
                threatLevel.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
