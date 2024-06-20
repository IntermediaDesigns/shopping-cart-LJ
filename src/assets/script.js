/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
let products = [
  {
    name: "Cherry",
    price: 4.0,
    quantity: 0,
    productId: 1,
    image: "images/cherry.jpg",
  },
  {
    name: "Orange",
    price: 5.0,
    quantity: 0,
    productId: 2,
    image: "images/orange.jpg",
  },
  {
    name: "Strawberry",
    price: 10.0,
    quantity: 0,
    productId: 3,
    image: "images/strawberry.jpg",
  },
];

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

function addProductToCart(productId) {
  let product = products.find((product) => product.productId === productId);

  if (!product) {
    
    return;
  }

  let cartProduct = cart.find((product) => product.productId === productId);
  if (cartProduct) {
    cartProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
}

function getProductIdFromElement(element) {
  while (element) {
    if (element.dataset.productId) {
      return element.dataset.productId;
    }
    element = element.parentElement;
  }
  return null;
}

document.querySelector(".products").addEventListener("click", (e) => {
  let productId = getProductIdFromElement(e.target);
  if (productId !== null) {
    addProductToCart(productId);
  }
});

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(productId) {
  let product = cart.find((product) => product.productId === productId);
  product.quantity++;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  let product = cart.find((product) => product.productId === productId);
  product.quantity--;

  if (product.quantity === 0) {
    removeProductFromCart(productId);
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  let product = cart.find((product) => product.productId === productId);
  product.quantity = 0;
  cart = cart.filter((product) => product.productId !== productId);
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
  let total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return parseFloat(total.toFixed(2));
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  cart = [];
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
function pay(amount) {
  let change = amount - cartTotal();
  return parseFloat(change.toFixed(2));
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

/* Begin remove all items from cart */
function dropCart() {
  let shoppingCart = document.querySelector(".empty-btn");
  shoppingCart.classList.add("button-container"); // Add this line
  let div = document.createElement("button");
  div.classList.add("empty");
  div.innerHTML = `Empty Cart`;
  shoppingCart.append(div);
}
dropCart();

document.querySelector(".empty-btn").addEventListener("click", (e) => {
  if (e.target.classList.contains("empty")) {
    emptyCart();
    drawCart();
    drawCheckout();
    clearSummary();
    clearInput();
  }
});
/* End all items from cart */

// Clear the summary section after emptying the cart
function clearSummary() {
  let paymentSummary = document.querySelector(".pay-summary");
  paymentSummary.innerHTML = "";
}
clearSummary();

// Clear input field after payment
function clearInput() {
  document.querySelector(".received").value = "";
}

// clear input after .pay is clicked
document.querySelector(".pay").addEventListener("click", (e) => {
  e.preventDefault();
  let productPrice = 5; // replace with actual product price
  let cashReceived = parseFloat(document.querySelector(".received").value);
  let cashReturned = calculateCashReturned(productPrice, cashReceived);
  if (cashReturned !== undefined) {
    
  }
  document.querySelector(".received").value = "";
});

/* The following is for running unit tests.
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
};
