import { auth } from "./firebase.js";

auth.onAuthStateChanged(function(user) {
    if (user) {
        location.replace("index.html#");
    } else {
var path = (location.pathname).split("/")
var length = (location.pathname).split("/").length;
        debugger;
        if (path[length-1] != "signUp.html") {
            location.replace("login.html#");
        }
    }
});
