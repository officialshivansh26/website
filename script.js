// CAPTCHA Generation and Validation
let currentCaptcha = {
    expression: '',
    answer: 0
};

// Generate random arithmetic CAPTCHA
function generateCaptcha() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer;
    
    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            answer = num1 + num2;
            break;
        case '-':
            num1 = Math.floor(Math.random() * 20) + 10;
            num2 = Math.floor(Math.random() * num1);
            answer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 * num2;
            break;
    }
    
    currentCaptcha.expression = `${num1} ${operation} ${num2} =`;
    currentCaptcha.answer = answer;
    
    displayCaptcha();
}

// Display CAPTCHA
function displayCaptcha() {
    const captchaDisplay = document.getElementById('captchaDisplay');
    captchaDisplay.textContent = currentCaptcha.expression;
}

// Refresh CAPTCHA
function refreshCaptcha() {
    generateCaptcha();
    document.getElementById('captchaAnswer').value = '';
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Validate form
function validateForm(formData) {
    let isValid = true;
    const errors = {};
    
    // Validate Enrollment ID
    const enrollmentId = formData.get('enrollmentId');
    if (!enrollmentId || enrollmentId.trim().length === 0) {
        errors.enrollmentId = 'Enrollment ID is required';
        isValid = false;
    }
    
    // Validate Password
    const password = formData.get('password');
    if (!password || password.trim().length === 0) {
        errors.password = 'Password is required';
        isValid = false;
    }
    
    // Validate CAPTCHA
    const captchaAnswer = formData.get('captchaAnswer');
    if (!captchaAnswer || captchaAnswer.trim().length === 0) {
        errors.captchaAnswer = 'CAPTCHA answer is required';
        isValid = false;
    } else if (parseInt(captchaAnswer) !== currentCaptcha.answer) {
        errors.captchaAnswer = 'Incorrect CAPTCHA answer';
        isValid = false;
    }
    
    return { isValid, errors };
}

// Display error messages
function displayErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
    
    // Display new errors
    Object.keys(errors).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        if (input) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('error');
            
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-message';
            errorMsg.textContent = errors[fieldName];
            
            if (fieldName === 'captchaAnswer') {
                input.parentNode.appendChild(errorMsg);
            } else if (fieldName === 'password') {
                input.closest('.password-wrapper').parentNode.appendChild(errorMsg);
            } else {
                input.parentNode.appendChild(errorMsg);
            }
        }
    });
}

// Display authentication error
function displayAuthError() {
    // Remove any existing auth error
    const existingError = document.querySelector('.auth-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and display auth error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error-message';
    errorDiv.textContent = 'Enrollment ID or Password is incorrect';
    
    const loginForm = document.getElementById('loginForm');
    loginForm.insertBefore(errorDiv, loginForm.firstChild);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const validation = validateForm(formData);
    
    if (validation.isValid) {
        // Clear any previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
        
        // Remove any existing auth error
        const existingError = document.querySelector('.auth-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Check credentials
        const enrollmentId = formData.get('enrollmentId');
        const password = formData.get('password');
        
        if (enrollmentId === 'G236D22' && password === 'Shivansh123#') {
            // Credentials are correct - redirect to user page
            console.log('Login successful!');
            window.location.href = 'user.html';
        } else {
            // Credentials are incorrect
            displayAuthError();
            refreshCaptcha();
        }
    } else {
        // Display validation errors
        displayErrors(validation.errors);
        
        // Refresh CAPTCHA if it was wrong
        if (validation.errors.captchaAnswer) {
            refreshCaptcha();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Generate initial CAPTCHA
    generateCaptcha();
    
    // Add event listeners
    document.getElementById('refreshCaptcha').addEventListener('click', refreshCaptcha);
    document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
    document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
    
    // Clear error on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
            
            // Also remove auth error when user starts typing
            const authError = document.querySelector('.auth-error-message');
            if (authError) {
                authError.remove();
            }
        });
    });
});
