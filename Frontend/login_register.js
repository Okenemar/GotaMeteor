document.getElementById('register-button').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    register();
});

let formLogin = document.getElementById('login-form');
formLogin.addEventListener('submit', event => {
    event.preventDefault();
    login();
});
function login() {
    let data = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    };
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:8085/api/login', config)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}

let formRegister = document.getElementById('register-form');
formRegister.addEventListener('submit', event => {
    event.preventDefault();
    register();
});

function register() {
    let data = {
        name: document.getElementById("nombre").value,
        email: document.getElementById("register-email").value,
        password: document.getElementById("register-password").value,
        c_password: document.getElementById("c_password").value
    };
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:8085/api/register', config)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}