import { firebaseApp, getUserEmail } from "./services/firebase.js";
import {
    doc,
    getDoc,
    getFirestore,
    updateDoc,
    arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-lite.js";
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
if (user_data) {
    var user = user_data;
}

function syhello() {
    debugger;
    console.log("hello");
}

if( user_cart==null || user_cart==undefined || user_cart.length < 1 ){
    alert("Cart is empty, please add items to cart");
    location.replace("index.html");
   
}
else{}
    


let x = "";
for (var i = 0; i < user_cart.length; i++) {
    x = `<tr>
<td class="image" data-title="No"><img src="${user_cart[i]["image"]}" alt="#"></td>
<td class="product-des" data-title="Description">
    <p class="product-name"><a href="#">${user_cart[i]["name"]}</a></p>
    <p class="product-des">${user_cart[i]["name"]}</p>
</td>
<td class="price" data-title="Price"><span>₹ ${user_cart[i]["price"]}.00</span></td>
<td class="qty" data-title="Qty">
    <div class="input-group">
        <div class="button minus">
            <button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                <i class="ti-minus" id = "minus${i}"></i>
            </button>
        </div>
        <input type="text" name="quant[1]" class="input-number" data-min="1" data-max="100" value="1">
        <div class="button plus">
            <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                <i class="ti-plus"></i>
            </button>
        </div>
    </div>
</td>
<td class="total-amount" data-title="Total"><span>₹ ${user_cart[i]["price"]}.00</span></td>
 <td class="action" data-title="Remove" id = "removeItem${i}"><i class="ti-trash remove-icon"></i></td>
</tr>
`;

    const button = document.createElement("tr");
    button.innerHTML = x;
    document.getElementById("cartItemsBody").appendChild(button);

    console.log(document.getElementById(`removeItem${i}`));
    document.getElementById(`removeItem${i}`).addEventListener(
        "click",
        (function(i) {
            return function() {
                console.log(user_cart[i]);
                deleteProduct(i, user_cart[i]);
            };
        })(i)
    );
}
 
const finalPrice = user_cart.reduce(
    (partialSum, a) => partialSum + parseInt(a.price),
    0
);
document.getElementById("totalPrice").innerHTML = `₹ ${finalPrice}.00`;
document.getElementById("subTotal").innerHTML = `₹ ${finalPrice}.00`;
document.getElementById("visitCheckout").addEventListener("click", () => {
    location.replace("checkout.html");
});


async function deleteProduct(int, product) {
    await updateDoc(ref, {
        cart: arrayRemove(product),
    }).then(location.reload());
}

