# Pizza Cart with AlpineJS and API Integration 🍕🛒

## Table of Contents

1. [Overview](#overview)
2. [Technologies and Skills Learned](#technologies-and-skills-learned)
3. [Features](#features)
4. [Checkout Process](#checkout-process)
5. [AlpineJS Pizza Cart Widget](#alpinejs-pizza-cart-widget)
6. [Flow of Work](#flow-of-work)

---

## Overview 📝

I developed a Pizza Cart application for Zandile at Perfect Pizza, building upon a previous online pamphlet project. The application allows customers to place pizza orders online for collection, complete with a shopping cart and a checkout process.

---

## Technologies and Skills Learned 💻

### AlpineJS
Learned how to build dynamic front-end features using AlpineJS, a minimal framework for composing JavaScript behavior in HTML.

### API Integration
Gained experience in API calls and integration, using Axios to fetch data from the Pizza Cart API.

### Mocha
Acquired skills in writing and running tests using Mocha, a JavaScript test framework running on Node.js and in the browser.

### UI/UX
Enhanced my skills in UI/UX by implementing features that improve the shopping and checkout experience.

---

## Features 🌟

### Shopping Cart 🛒
Customers can add pizzas to their cart by pressing an "Order" button. The cart updates in real-time, showing totals for small, medium, and large pizzas, along with the total cost.

### Easy Add & Remove 🔄
Zandile wanted a feature that allows users to easily add or remove pizzas from the cart, which I implemented. The totals update accordingly.

---

## Checkout Process 🛍️

### Payment Input 💵
Upon pressing the "Check Out" button, users are prompted to enter a payment amount.

### Payment Validation 🤑
- If the payment amount is sufficient, a message "Enjoy your pizzas" is displayed and the cart is cleared.
- If the payment amount is insufficient, a message "Sorry - that is not enough money!" is displayed. Messages disappear after a short period.

---

## AlpineJS Pizza Cart Widget 🎛️

I created a widget that lists all pizzas from the API and allows users to add a pizza to the cart. The widget also features three pizzas above the list and gives users the option to view all their historical orders.

---

## Flow of Work 🛠️

- Started by listing all pizzas from the API in a HTML table.
- Added buttons to each pizza for adding to the cart via the API.
- Implemented "+" and "-" buttons for cart modification.
- Added payment support to the cart.
- Featured pizzas are displayed above the list.

