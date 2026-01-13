/* ============================================
   Chess Academy - Main JavaScript
   Educational Chess Website - IB MYP Project
   ============================================ */

// ===== Mobile Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===== Lesson Tab Navigation =====
document.addEventListener('DOMContentLoaded', function() {
    const lessonTabs = document.querySelectorAll('.lesson-tab');
    const lessonPanels = document.querySelectorAll('.lesson-panel');
    
    lessonTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetLesson = this.getAttribute('data-lesson');
            
            // Remove active class from all tabs and panels
            lessonTabs.forEach(t => t.classList.remove('active'));
            lessonPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetLesson);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Smooth scroll to lesson content
                targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ===== Interactive Quiz Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            const feedback = this.closest('.interactive-quiz').querySelector('.quiz-feedback');
            const allOptions = this.closest('.interactive-quiz').querySelectorAll('.quiz-option');
            
            // Disable all options
            allOptions.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            // Show result
            if (isCorrect) {
                this.classList.add('correct');
                if (feedback) {
                    feedback.textContent = '✓ Correct! Great job!';
                    feedback.style.color = '#4caf50';
                }
            } else {
                this.classList.add('incorrect');
                if (feedback) {
                    feedback.textContent = '✗ Not quite. Try again!';
                    feedback.style.color = '#f44336';
                    
                    // Highlight correct answer
                    allOptions.forEach(opt => {
                        if (opt.getAttribute('data-correct') === 'true') {
                            opt.classList.add('correct');
                        }
                    });
                }
            }
        });
    });
});

// ===== Puzzle Hint and Solution Toggles =====
document.addEventListener('DOMContentLoaded', function() {
    const hintButtons = document.querySelectorAll('.puzzle-hint-btn');
    const solutionButtons = document.querySelectorAll('.puzzle-solution-btn');
    
    hintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hint = this.nextElementSibling;
            if (hint && hint.classList.contains('puzzle-hint')) {
                if (hint.style.display === 'none' || hint.style.display === '') {
                    hint.style.display = 'block';
                    this.textContent = 'Hide Hint';
                } else {
                    hint.style.display = 'none';
                    this.textContent = 'Show Hint';
                }
            }
        });
    });
    
    solutionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const solution = this.nextElementSibling;
            if (solution && solution.classList.contains('puzzle-solution')) {
                if (solution.style.display === 'none' || solution.style.display === '') {
                    solution.style.display = 'block';
                    this.textContent = 'Hide Solution';
                } else {
                    solution.style.display = 'none';
                    this.textContent = 'Show Solution';
                }
            }
        });
    });
});

// ===== Feedback Form Handling =====
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('form-success');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                if (key === 'learning-style') {
                    if (!formObject[key]) {
                        formObject[key] = [];
                    }
                    formObject[key].push(value);
                } else {
                    formObject[key] = value;
                }
            });
            
            // Validate required fields
            const message = formData.get('message');
            if (!message || message.trim() === '') {
                alert('Please enter a message before submitting.');
                return;
            }
            
            // Simulate form submission (in a real application, this would send to a server)
            console.log('Form submitted:', formObject);
            
            // Hide form and show success message
            feedbackForm.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form after showing success (optional)
                setTimeout(function() {
                    feedbackForm.reset();
                    feedbackForm.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000); // Reset after 5 seconds
            }
            
            // Show user-friendly message
            alert('Thank you for your feedback! Your input helps us improve the program.');
        });
    }
});

// ===== Smooth Scrolling for Anchor Links =====
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ===== Add Skip to Main Content Link =====
document.addEventListener('DOMContentLoaded', function() {
    // Check if skip link already exists
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

// ===== Add Main Content ID if Not Present =====
document.addEventListener('DOMContentLoaded', function() {
    // Find main content area (hero or page-header)
    const mainContent = document.querySelector('.hero') || 
                        document.querySelector('.page-header') || 
                        document.querySelector('main');
    
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
});

// ===== Form Validation Enhancement =====
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea[required]');
    const inputs = document.querySelectorAll('input[required]');
    
    // Add visual feedback for required fields
    function addRequiredIndicator(element) {
        if (element.hasAttribute('required')) {
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label && !label.textContent.includes('*')) {
                label.innerHTML = label.innerHTML + ' <span style="color: red;">*</span>';
            }
        }
    }
    
    textareas.forEach(textarea => addRequiredIndicator(textarea));
    inputs.forEach(input => addRequiredIndicator(input));
    
    // Real-time validation feedback
    textareas.forEach(textarea => {
        textarea.addEventListener('blur', function() {
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '';
            }
        });
        
        textarea.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '';
            }
        });
    });
});

// ===== Accessibility: Keyboard Navigation for Custom Elements =====
document.addEventListener('DOMContentLoaded', function() {
    // Make lesson tabs keyboard accessible
    const lessonTabs = document.querySelectorAll('.lesson-tab');
    lessonTabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
        
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % lessonTabs.length;
                lessonTabs[nextIndex].focus();
                lessonTabs[nextIndex].click();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + lessonTabs.length) % lessonTabs.length;
                lessonTabs[prevIndex].focus();
                lessonTabs[prevIndex].click();
            }
        });
    });
    
    // Make quiz options keyboard accessible
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.setAttribute('tabindex', '0');
        option.setAttribute('role', 'button');
        
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ===== Print-Friendly Styles =====
// Add print styles dynamically
const printStyles = `
    @media print {
        .navbar, .footer, .nav-toggle, .hero-buttons, .cta-buttons {
            display: none !important;
        }
        body {
            background: white;
            color: black;
        }
        .lesson-panel {
            display: block !important;
            page-break-inside: avoid;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// ===== Console Welcome Message (for developers) =====
console.log('%c♔ Chess Academy ♔', 'font-size: 20px; font-weight: bold; color: #2d5016;');
console.log('%cEducational Chess Website - IB MYP Personal Project', 'font-size: 12px; color: #666;');
console.log('%cWelcome! This website is designed to teach chess and build life skills.', 'color: #2d5016;');
