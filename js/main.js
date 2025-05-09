// Header scroll effect
(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    };
}());

// Burger handler
(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    const menuLinks = document.querySelectorAll('.header__link');
    
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active');
    });
    
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    });
    
    if (window.innerWidth <= 767) {
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('header__nav_active');
            });
        });
    }
}());

// Scroll to anchors
(function () {
    const smoothScroll = (targetEl, duration) => {
        const headerElHeight = document.querySelector('.header').clientHeight;
        const target = document.querySelector(targetEl);
        const targetPosition = target.getBoundingClientRect().top - headerElHeight;
        const startPosition = window.pageYOffset;
        let startTime = null;
        
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        requestAnimationFrame(animation);
    };
    
    const scrollTo = () => {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function (event) {
                event.preventDefault();
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    
    scrollTo();
}());

// Popup registration
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordTwo = document.getElementById('passwordTwo');
    const submitButton = document.getElementById('submit');

    function validateInputs() {
        let isValid = true;

        if (username.value.trim() === '') {
            setError(username, 'Username is required');
            isValid = false;
        } else {
            setSuccess(username);
        }

        if (email.value.trim() === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (password.value.trim() === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (password.value.trim().length < 8) {
            setError(password, 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            setSuccess(password);
        }

        if (passwordTwo.value.trim() === '') {
            setError(passwordTwo, 'Please confirm your password');
            isValid = false;
        } else if (passwordTwo.value.trim() !== password.value.trim()) {
            setError(passwordTwo, "Passwords don't match");
            isValid = false;
        } else {
            setSuccess(passwordTwo);
        }

        return isValid;
    }

    function setError(element, message) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    function setSuccess(element) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateInputs()) {
            const usernameUser = username.value.trim();
            const emailUser = email.value.trim();
            const passwordUser = password.value.trim();

            localStorage.setItem(emailUser + '_username', usernameUser);
            localStorage.setItem(emailUser + '_email', emailUser);
            localStorage.setItem(emailUser + '_password', passwordUser);

            document.getElementById('popup').style.display = 'none';
        }
    });

    const signInButton = document.getElementById('sign-in-button');
    const popup = document.getElementById('popup');
    const popupClose = document.querySelector('.popup_close');

    signInButton.addEventListener('click', function(event) {
        event.preventDefault();
        popup.style.display = 'flex';
    });

    popupClose.addEventListener('click', function(event) {
        event.preventDefault();
        popup.style.display = 'none';
    });

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Popup log-in
document.addEventListener('DOMContentLoaded', function() {
    const signUpLink = document.getElementById('sign-up-link');
    const signInLink = document.getElementById('sign-in-link');
    const registrationForm = document.getElementById('registration-form');
    const signInForm = document.getElementById('sign-in-form');
    const signInFormElement = document.getElementById('form_sign_in');
    const closeButtons = document.querySelectorAll('.popup_close');
    const popup = document.getElementById('popup');
    const popupContent = document.querySelector('.popup_content');

    signUpLink.addEventListener('click', function(event) {
        event.preventDefault();
        registrationForm.style.display = 'block';
        signInForm.style.display = 'none';
    });

    signInLink.addEventListener('click', function(event) {
        event.preventDefault();
        registrationForm.style.display = 'none';
        signInForm.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            popup.style.display = 'none';
        });
    });

    signInFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email_sign_in').value;
        const password = document.getElementById('password_sign_in').value;

        const emailError = document.querySelector('#form_sign_in #email_sign_in + .error');
        const passwordError = document.querySelector('#form_sign_in #password_sign_in + .error');
        emailError.textContent = '';
        passwordError.textContent = '';

        if (!email) {
            emailError.textContent = 'Email is required';
        } else if (!validateEmail(email)) {
            emailError.textContent = 'Email is not valid';
        }

        if (!password) {
            passwordError.textContent = 'Password is required';
        }

        if (email && validateEmail(email) && password) {
            const storedEmail = localStorage.getItem(email + '_email');
            const storedPassword = localStorage.getItem(email + '_password');

            if (storedEmail && storedPassword) {
                if (storedPassword === password) {
                    alert('Successfully signed in');
                    popup.style.display = 'none';
                } else {
                    passwordError.textContent = 'Incorrect password';
                }
            } else {
                emailError.textContent = 'No user found with this email';
            }
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

console.table(
    Object.keys(localStorage)
      .filter(key => key.includes('_email'))
      .map(key => {
        const baseKey = key.replace('_email', '');
        const email = localStorage.getItem(key);
        const password = localStorage.getItem(baseKey + '_password');
  
        return {
          Email: email,
          Password: typeof password === 'string' ? '*'.repeat(password.length) : '(no password)'
        };
      })
  );





