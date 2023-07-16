function pizzaCart() {
  return {
    quantity: 0,
    paymentAmount: 0,
    message: "",
    usernameMessage: '',
    show: false,
    lastMessageAdded: "",
    pizzas: [],
    cartPizzas: [],
    username: "",
    cartId: "",
    cartTotal: 0.0,
    toggleModal() {
      this.show = !this.show;
      if (this.show) {
        setTimeout(() => {
          this.show = false;
        }, 2000); // Close after 2 seconds
      }
    },

    // API

    login() {
      if (this.username.length < 2) {
        this.usernameMessage = 'Username too Short';
        setTimeout(() => {
            this.usernameMessage = '';
        }, 2000); // Close after 2 seconds
      } else {
        this.usernameMessage =  `🛒Welcome + ${ this.username}🛒`;
        // Store username in the localStorage
        localStorage.setItem("username", this.username);
        setTimeout(() => {
          this.usernameMessage = '';
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
        }

        await this.createCart()

      this.showCartData();
    },
    addPizzaToCart(pizzaId) {
      this.addPizza(pizzaId).then(() => {
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
          this.message = result.data.message;
          setTimeout(() => (this.message = ""), 3000);
        } else {
          this.message = "Payment Received";

          setTimeout(() => {
            this.message = "";
            this.cartPizzas = [];
            this.cartTotal = 0.0;
            this.cartId = "";
            localStorage.removeItem('username');
            localStorage.removeItem('cartId');
            this.paymentAmount = 0;
        
          }, 3000);
        }
      });
    },
  };
}

document.addEventListener("alpine:init", () => {
  Alpine.data("pizzaCart", pizzaCart);
});


