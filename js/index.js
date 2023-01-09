import { logout,auth } from "./services/firebase.js";
const logoutBtn = document.getElementById("indexLogoutButton");
logoutBtn.addEventListener("click", logout);
var user = auth;
var userCredentials = JSON.parse(localStorage.getItem("user"));
console.log(userCredentials);
document.getElementById("welcome").innerHTML = "Welcome " + userCredentials.user.displayName;
