function pizzaCart() {
  return {
    quantity: 0,
    paymentAmount: 0,
    message: "",
    username: "",
    usernameInput: '',
    usernameMessage: '',
    show: false,
    showLogin: localStorage.get("username") ? true : false,
    lastMessageAdded: "",
    pizzas: [],
    cartPizzas: [],
    featuredPizzas: [],
    cartId: "",
    cartTotal: 0.0,
    toggleModal() {
      this.show = !this.show;
      if (this.show) {
        setTimeout(() => {
          this.show = false;
        }, 2500); 
      }
    },

    // API

    login() {
      if (this.usernameInput.length < 2) {
        this.usernameMessage = `<span class="mt-4 text-lg font-bold text-white bg-red-500 p-3 rounded inline-block">Username too Short</span>`;
        setTimeout(() => {
            this.usernameMessage = '';
        }, 2000); // Close after 2 seconds
      } else {
        this.username = this.usernameInput
        this.usernameInput = ''
        this.usernameMessage =  `<span class="mt-4 text-xl font-bold text-gray-700 bg-white p-3 rounded inline-block">🛒 Welcome ${ this.username} 🛒</span>
        `;
        // Store username in the localStorage
        localStorage.setItem("username", this.username);
        setTimeout(() => {
          this.usernameMessage = '';
          this.showLogin = false
      }, 2000); // Close after 2 seconds
        this.createCart();
      }
    },
    

    createCart() {
      return new Promise((resolve, reject) => {
        if (!this.username) {
          reject();
          return;
        }
    
        const cartid = localStorage["cartId"];
        const createCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`;
    
        if (cartid) {
          this.cartId = cartid;
          resolve();
        } else {
          axios.get(createCartURL).then((result) => {
            this.cartId = result.data.cart_code;
            localStorage["cartId"] = this.cartId;
            resolve();
          });
        }
      });
    },
  
    getCart() {
      const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`;
      return axios.get(getCartURL);
    },

    addPizza(pizzaId) {
      return axios.post(
        "https://pizza-api.projectcodex.net/api/pizza-cart/add",
        {
          cart_code: this.cartId,
          pizza_id: pizzaId,
        }
      );
    },
    removePizza(pizzaId) {
      return axios.post(
        "https://pizza-api.projectcodex.net/api/pizza-cart/remove",
        {
          cart_code: this.cartId,
          pizza_id: pizzaId,
        }
      );
    },
    pay(amount) {
      return axios.post(
        "https://pizza-api.projectcodex.net/api/pizza-cart/pay",
        {
          cart_code: this.cartId,
          amount,
        }
      );
    },
    showCartData() {
      this.getCart().then((result) => {
        const cartData = result.data;
        this.cartPizzas = cartData.pizzas;
        this.cartTotal = cartData.total;
      });
    },
    async init() {
      axios
        .get("https://pizza-api.projectcodex.net/api/pizzas")
        .then((result) => {
          this.pizzas = result.data.pizzas;
        });

        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          this.username = storedUsername;
          this.showLogin = false
        }

        await this.createCart()

      this.showCartData();

      this.getFeaturedPizza()
    },
    addPizzaToCart(pizzaId, pizzaFlavor) {
      this.addPizza(pizzaId).then(() => {
        this.message = `<span class="bg-white text-gray-800 text-2xl py-4 px-4 rounded shadow text-lg font-bold"> 🍕 ${pizzaFlavor} has been added to your cart🍕</span>`

        this.toggleModal()
        this.showCartData();
      });
    },
    removePizzaFromCart(pizzaId) {
      this.removePizza(pizzaId).then(() => {
        this.showCartData();
      });
    },
    payForCart() {
      this.pay(this.paymentAmount).then((result) => {
        if (result.data.status === "failure") {
          this.message = `<span class="bg-red-700 text-white py-2 px-4 rounded shadow text-2xl font-bold">${result.data.message}</span>`
          ;
          this.toggleModal()
          setTimeout(() => (this.message = ""), 3000);
        } else {
          this.message = `<span class="bg-yellow-100  py-2 px-4 rounded shadow text-lg font-bold">🥳 Payment Received! time to eat 🥳</span>`;
          this.toggleModal();

          setTimeout(() => {
            this.message = "";
            this.username = '';
            this.cartPizzas = [];
            this.cartTotal = 0.0;
            this.cartId = "";
            localStorage.removeItem('username');
            localStorage.removeItem('cartId');
            this.paymentAmount = 0;
            this.showLogin = true
          }, 3000);
        }
      });
    },
    postFeaturedPizza(pizzaId, pizzaFlavor) {
      const lastThreePizzaIds = this.featuredPizzas.slice(-3);
      this.message = `<span class="bg-white text-gray-800 text-2xl py-4 px-4 rounded shadow text-lg font-bold">${pizzaFlavor} has been added to the favorites</span>`
      this.toggleModal()

      if (lastThreePizzaIds.some(pizza => pizza.id === pizzaId)) {

        this.message = `<span class="bg-white text-gray-800 text-2xl py-4 px-4 rounded shadow text-lg font-bold">Pizza already added</span>`
        return;
      }

      return axios.post(
        "https://pizza-api.projectcodex.net/api/pizzas/featured",
        {
          username : this.username,
          pizza_id : pizzaId
        }
      ).then(() => {
        this.getFeaturedPizza()
      })
      
    },
    getFeaturedPizza() {
      return axios.get(
        `https://pizza-api.projectcodex.net/api/pizzas/featured?username=bjorn`,
      ).then((result) => {
        const pizzas = result.data.pizzas
        this.featuredPizzas = pizzas.slice(Math.max(pizzas.length -3, 0))
      
      })
    }
  };
}

document.addEventListener("alpine:init", () => {
  Alpine.data("pizzaCart", pizzaCart);
});


