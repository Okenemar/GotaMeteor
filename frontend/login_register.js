document.getElementById('register-button').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
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
            localStorage.setItem("token",data["data"]["token"])
            window.location.assign("mapa.html")

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
            localStorage.setItem("token",data["data"]["token"])
            window.location.assign("mapa.html")


        });
}

function LogOut() {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    };

    fetch('http://localhost:8085/api/logout', config)
    console.log("sesión cerrada")
    window.location.assign("index.html")
}