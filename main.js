/* ==========================
   AUTH SYSTEM
========================== */
function signupUser(){
    alert("Account created. Please login.");
    window.location.href = "login.html";
}

function loginUser(){
    // For demo purposes, anyone can login
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
}
function protect(){
    if(localStorage.getItem("loggedIn") !== "true"){
        window.location.href = "login.html";
    }
}

function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

/* ========================== 
   PRODUCTS & REVIEWS
========================== */      
let products = [
    {name:"CRYSTAL LACE", price: 10000, img:"Images/dress1.jpg"},
    {name:"NOIR CHIC GOWN", price: 250000, img:"Images/dress2.jpg"},
    {name:"VELVET RADIANCE", price: 350000, img:"Images/dress3.jpg"},
    {name:"LUXE CURVE", price: 200000, img:"Images/dress4.jpg"},
    {name:"LUMINE", price: 5000, img:"Images/dress5.jpg"},
    {name:"CORPORATE QUEEN ATTIRE", price: 10000, img:"Images/dress6.png"},
];

function displayProducts(){
    let box = document.getElementById("productList");
    if(!box) return;
    box.innerHTML = "";
    products.forEach((p,i)=>{
        box.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">₦${p.price}</p>
            <button class="btn" onclick="addToCart('${p.name}',${p.price});updateFloatingCart();">Add to Cart</button>

            <h4>Reviews</h4>
            <div id="reviews${i}"></div>
            <input id="rname${i}" placeholder="Name">
            <input id="rtext${i}" placeholder="Review">
            <button class="btn" onclick="addReview(${i})">Submit</button>
        </div>`;
    });
}

function addReview(id){
    let name = document.getElementById("rname"+id).value;
    let text = document.getElementById("rtext"+id).value;
    if(name && text){
        let box = document.getElementById("reviews"+id);
        box.innerHTML += `<p><b>${name}:</b> ${text}</p>`;
        // Clear inputs after submission
        document.getElementById("rname"+id).value = "";
        document.getElementById("rtext"+id).value = "";
    } else {
        alert("Please enter both name and review");
    }
}

/* ==========================
   CART FUNCTIONS
========================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
    updateFloatingCart();
}

function displayCart(){
    let container = document.getElementById("cartItems");
    let totalContainer = document.getElementById("total");
    if(!container) return;

    let total = 0;
    container.innerHTML = "";
    cart.forEach((item, index)=>{
        total += item.price;
        container.innerHTML += `
        <div class="cart-item">
            ${item.name} - ₦${item.price} 
            <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });
    if(totalContainer) totalContainer.innerText = "Total: ₦"+total;
}

function removeItem(i){
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateFloatingCart();
}

function proceedToPayment(){
    window.location.href = "payment.html";
}

/* ==========================
   FLOATING CART ICON
========================== */
function updateFloatingCart(){
    let cartCount = cart.length;
    let existing = document.getElementById("cartFloat");
    if(!existing){
        let div = document.createElement("div");
        div.id = "cartFloat";
        div.className = "cart-float";
        div.innerText = "Cart: " + cartCount;
        div.onclick = function(){window.location.href="cart.html";}
        document.body.appendChild(div);
    } else {
        existing.innerText = "Cart: " + cartCount;
    }
}

/* ==========================
   PAYMENT DEMO
========================== */
function payNow(){
    alert("Payment Successful 💳");
    localStorage.removeItem("cart");
    cart = [];
    updateFloatingCart();
    window.location.href = "index.html";
}

/* ==========================
   CONTACT FORM
========================== */
function submitContact(e){
    e.preventDefault();
    alert("Message sent!");
    e.target.reset();
}

/* ==========================
   ADMIN PANEL
========================== */
function addProduct(e){
    e.preventDefault();
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;
    let img = document.getElementById("pimg").value;

    if(name && price && img){
        products.push({name, price, img});
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product uploaded");
        e.target.reset();
        displayProducts();
    } else {
        alert("Please fill all fields");
    }
}

/* ==========================
   INITIALIZE ON LOAD
========================== */
window.onload = function(){
    protect();
    displayProducts();
    displayCart();
    updateFloatingCart();
}
