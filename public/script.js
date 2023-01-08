import { jwtDecode } from "./jwt-decode.js";
// import jwt_decode from "jwt_decode";

let accessToken = "";
let api_url = '/api';
const form = document.querySelector('form');
const pStatus = document.querySelector('p');

const showLoginForm = (param) => {
    param ? form.style.display = 'flex' : form.style.display = 'none';
}

form.onsubmit = async e => {
    e.preventDefault();
    const loginDetails = await login({email: form.email.value, password: form.password.value});
    console.log(loginDetails);
    if(loginDetails.error) {
        pStatus.innerHTML = loginDetails.error;
        pStatus.style.color = 'red';
        return;
    }
    accessToken = loginDetails.accessToken;
    const jwtDecoded = jwtDecode(accessToken);
    pStatus.innerHTML = `Login Successful! </br> Hello <strong>${jwtDecoded.user_name}</strong></br>`;
    pStatus.style.color = 'black';
    showLoginForm(false);
}

async function login(credentials) {
    const res = await fetch(`${api_url}/auth/login`, {
        method: 'POST',
        credentials:'include',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return await res.json();
}