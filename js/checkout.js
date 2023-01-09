
import { getUserEmail } from "./services/firebase.js";
import {
    doc,
    getDoc,
    getFirestore,
    updateDoc,
    arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-lite.js";
import { logout } from "./services/firebase.js";
const db = getFirestore();

const ref = doc(db, `user/${getUserEmail()}`);
const docSnap = await getDoc(ref);

let user_data;
if (docSnap.exists()) {
    user_data = docSnap.data();
} else {
    console.log("No such document!");
}

let user_cart;
if (user_data) {
    user_cart = user_data.cart;
}

if( user_cart==null || user_cart==undefined || user_cart.length < 1 ){
    alert("Nothing to Checkout, Please Start Shopping");
    location.replace("index.html");
}

async function clearCart() {
    var userCredentials = JSON.parse(localStorage.getItem("user"));
    await updateDoc(doc(db, "user", getUserEmail()), {
        cart: null,
    });
    Toast.show("Checked Out", "Sucessfully", "success")

    setTimeout(() => {
    location.replace("index.html#");}, 2000);
    
}
const finalPrice = user_cart.reduce(
    (partialSum, a) => partialSum + parseInt(a.price),
    0
);
document.getElementById("checkOut").addEventListener("click", clearCart);
document.getElementById("subPrice").innerText = `₹ ${finalPrice.toString()}.00`;
document.getElementById("finalPrice").innerText = `₹ ${finalPrice.toString()}.00`;
document.getElementById("checkOutButton").addEventListener("click", logout);
