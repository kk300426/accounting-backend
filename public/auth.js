// auth.js

function encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, "my_secret_key").toString();
}

function decryptPassword(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, "my_secret_key");
    return bytes.toString(CryptoJS.enc.Utf8);
}

function saveUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    users[email] = encryptPassword(password);
    localStorage.setItem("users", JSON.stringify(users));
}

function getUser(email) {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (!users[email]) return null;
    return decryptPassword(users[email]);
}

function userExists(email) {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    return email in users;
}

function validateLogin(email, password) {
    return getUser(email) === password;
}
