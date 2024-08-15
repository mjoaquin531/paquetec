document.getElementById('switch-to-register').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('switch-to-login').addEventListener('click', function() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    alert('Registro exitoso ');
});

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Inicio de sesión exitoso ');
});
