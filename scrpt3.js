// Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Intersection Observer for animations
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

        // Animated counters
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.dataset.count);
                    let current = 0;
                    const increment = finalValue / 100;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalValue) {
                            current = finalValue;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current).toLocaleString();
                    }, 20);
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });

        // Team member interactions
        document.querySelectorAll('.team-member').forEach(member => {
            member.addEventListener('click', () => {
                member.style.transform = 'translateY(-5px) scale(1.02)';
                setTimeout(() => {
                    member.style.transform = '';
                }, 200);
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(2, 6, 23, 0.95)';
                header.style.borderBottom = '1px solid var(--primary-color)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.9)';
                header.style.borderBottom = '1px solid var(--border-color)';
            }
        });

        // Enhanced hover effects for mission cards
        document.querySelectorAll('.mission-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(255, 255, 255, 0.08)';
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = 'var(--card-bg)';
                card.style.transform = '';
            });
        });

        // CTA buttons interaction
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.classList.contains('cta-primary')) {
                    e.preventDefault();
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    ripple.style.cssText = `
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background: rgba(255, 255, 255, 0.5);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    const rect = button.getBoundingClientRect();
                    ripple.style.left = (e.clientX - rect.left - 10) + 'px';
                    ripple.style.top = (e.clientY - rect.top - 10) + 'px';
                    
                    button.style.position = 'relative';
                    button.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Newsletter subscription simulation
        const newsletterButtons = document.querySelectorAll('.cta-secondary');
        newsletterButtons.forEach(button => {
            if (button.textContent.includes('Newsletter')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const originalText = button.textContent;
                    button.textContent = 'Subscribing...';
                    button.style.background = 'var(--primary-color)';
                    button.style.color = 'var(--dark-bg)';
                    
                    setTimeout(() => {
                        button.textContent = 'Subscribed! ✓';
                        setTimeout(() => {
                            button.textContent = originalText;
                            button.style.background = 'transparent';
                            button.style.color = 'var(--primary-color)';
                        }, 2000);
                    }, 1500);
                });
            }
        });

        // Parallax effect for floating icons
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            document.querySelectorAll('.floating-icon').forEach((icon, index) => {
                const speed = 0.2 + (index * 0.1);
                icon.style.transform = `translateY(${parallax * speed}px)`;
            });
        });

        // Interactive value items
        document.querySelectorAll('.value-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
                item.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });

        // Page load animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Keyboard navigation shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '2':
                        e.preventDefault();
                        document.querySelector('.mission').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '3':
                        e.preventDefault();
                        document.querySelector('.team').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '4':
                        e.preventDefault();
                        document.querySelector('.cta').scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
        });

        // Add subtle glow effect to cards on hover
        const cards = document.querySelectorAll('.mission-card, .team-member, .stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = '0 10px 30px rgba(0, 212, 170, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });

        // Progressive enhancement for animations
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable animations for users who prefer reduced motion
            document.querySelectorAll('*').forEach(el => {
                el.style.animationDuration = '0.01ms !important';
                el.style.animationIterationCount = '1 !important';
                el.style.transitionDuration = '0.01ms !important';
            });
        }

        // Console Easter egg
        console.log(`
        🚀 CyberAI Insights - About Page
        ═══════════════════════════════
        Welcome to the source! Interested in cybersecurity and AI?
        Check out our latest articles and tutorials.
        
        Quick keyboard shortcuts:
        Alt + 1: Jump to Hero
        Alt + 2: Jump to Mission  
        Alt + 3: Jump to Team
        Alt + 4: Jump to Contact
        `);
