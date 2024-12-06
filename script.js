const coffeeMenu = [
    {
        name: "Espresso",
        description: "Strong and concentrated coffee.",
        price: "$2.50",
        image: "espresso.jpg"
    },
    {
        name: "Americano",
        description: "Espresso with hot water.",
        price: "$3.00",
        image: "americano.jpg"
    },
    {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        price: "$3.50",
        image: "cappuccino.jpg"
    },
    {
        name: "Latte",
        description: "Espresso with steamed milk.",
        price: "$3.75",
        image: "latte.jpg"
    },
    {
        name: "Mocha",
        description: "Espresso with chocolate syrup and steamed milk.",
        price: "$4.00",
        image: "mocha.jpg"
    }
];

let cart = [];

function displayMenu() {
    const coffeeList = document.getElementById("coffee-list");
    coffeeMenu.forEach(coffee => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.name}" class="coffee-image">
            <h3>${coffee.name}</h3>
            <p>${coffee.description}</p>
            <p>${coffee.price}</p>
            <button onclick="selectCoffee('${coffee.name}')">Select</button>`;
        coffeeList.appendChild(li);
    });
}

function selectCoffee(coffeeName) {
    const coffee = coffeeMenu.find(c => c.name === coffeeName);
    document.getElementById('menu').style.display = "none";  
    document.getElementById('customization').style.display = "block";  
    localStorage.setItem("selectedCoffee", JSON.stringify(coffee));
}

function addToCart() {
    const coffee = JSON.parse(localStorage.getItem("selectedCoffee"));
    const milk = document.getElementById("milk-options").value;
    const sweetener = document.getElementById("sweeteners").value;
    const syrup = document.getElementById("flavored-syrups").value;
    const spice = document.getElementById("spices").value;
    const topping = document.getElementById("toppings").value;
    const extra = document.getElementById("extras").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    const cartItem = {
        coffee,
        milk,
        sweetener,
        syrup,
        spice,
        topping,
        extra,
        quantity,
        totalPrice: calculateTotalPrice(coffee.price, quantity)
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hide customization and show cart popup
    document.getElementById("customization").style.display = "none";
    showCartPopup();
}

function calculateTotalPrice(price, quantity) {
    const numericPrice = parseFloat(price.replace('$', '')); // Convert "$3.50" to 3.50
    return `$${(numericPrice * quantity).toFixed(2)}`; // Multiply by quantity and format
}

function showCartPopup() {
    const cartPopup = document.getElementById("cart-popup");
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach((cartItem, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
            ${cartItem.quantity} x ${cartItem.coffee.name} - ${cartItem.totalPrice} 
            <button onclick="removeItem(${index})">Remove</button>
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <button onclick="updateQuantity(${index}, 1)">+</button>
        `;
        cartItemsContainer.appendChild(item);
    });

    cartPopup.style.display = "block";
}

function closeCartPopup() {
    document.getElementById("cart-popup").style.display = "none";
    document.getElementById('menu').style.display = "block";  
}

function removeItem(index) {
    cart.splice(index, 1); // Remove the item from cart
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartPopup(); // Refresh the cart popup
}

function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1; // Prevent negative or zero quantity
    item.totalPrice = calculateTotalPrice(item.coffee.price, item.quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartPopup(); // Refresh the cart popup
}

function proceedToPayment() {
    document.getElementById("cart-popup").style.display = "none";
    document.getElementById("payment").style.display = "block";
}

function payWithApplePay() {
    alert("Paying with Apple Pay...");
    showThankYouMessage();
}

function payWithCreditCard() {
    alert("Paying with Credit/Debit Card...");
    showThankYouMessage();
}

function payWithEBT() {
    alert("Paying with EBT...");
    showThankYouMessage();
}

function payWithPayPal() {
    alert("Paying with PayPal...");
    showThankYouMessage();
}
function cancelTransaction() {
    // Clear cart and navigate back to the menu
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("payment").style.display = "none";
    document.getElementById('menu').style.display = "block";
}

function showThankYouMessage() {
    document.getElementById("payment").style.display = "none";
    document.getElementById("thank-you").style.display = "block";
}

function goBackToMenu() {
    document.getElementById('menu').style.display = "block";
    document.getElementById('customization').style.display = "none";  
    document.getElementById('payment').style.display = "none";  
    document.getElementById('thank-you').style.display = "none";  
}

window.onload = displayMenu;
