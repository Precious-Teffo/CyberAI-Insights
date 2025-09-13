// Smooth scrolling for navigation links
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

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Interactive stat counters
        const statNumbers = document.querySelectorAll('.stat-number');
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    const suffix = text.replace(/[0-9.]/g, '');
                    
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 30);
                    
                    statObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });

        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Securing Connection...';
            button.style.background = 'var(--gradient-3)';
            
            setTimeout(() => {
                button.textContent = 'Network Joined! ✓';
                button.style.background = 'var(--primary-color)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'var(--gradient-2)';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Feature card click interactions
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            });
        });

        // Threat matrix item interactions
        document.querySelectorAll('.threat-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'var(--card-bg)';
            });
        });

        // Dynamic background particles (optional enhancement)
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'var(--primary-color)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.3';
            particle.style.zIndex = '-1';
            
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translateY(0px)', opacity: 0.3 },
                { transform: 'translateY(-' + window.innerHeight + 'px)', opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                document.body.removeChild(particle);
            };
        }

        // Create particles periodically
        setInterval(createParticle, 500);

        // Keyboard shortcuts for navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('matrix').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('stats').scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
        });

        // Performance optimization: throttle scroll events
        let ticking = false;
        function updateOnScroll() {
            // Navbar scroll effect
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
