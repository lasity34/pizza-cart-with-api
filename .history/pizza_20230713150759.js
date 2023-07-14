function pizzaCart() {
  return {
    smallAmount: 0,
    mediumAmount: 0,
    largeAmount: 0,
    paymentAmount: 0,
    message: "",
    payMessage: "",
    smallAdded: false,
    mediumAdded: false,
    largeAdded: false,
    show: false,
    prices: {
      small: 27.99,
      medium: 57.99,
      large: 87.99,
    },
    lastMessageAdded: "",

    pizzas: [],
    username: "bjorn",
    cartId: "jI0VaxiP9k",
    cartPizzas: [],
    cartTotal: 0.0,
    increment(size) {
      if (size === "small" && this.smallAdded) {
        this.smallAmount++;
      } else if (size === "medium" && this.mediumAdded) {
        this.mediumAmount++;
      } else if (size === "large" && this.largeAdded) {
        this.largeAmount++;
      }
    },
    buy(size) {
      if (size === "small") {
        this.smallAdded = true;
        this.smallAmount++; // increment the small pizza count
        this.message = "Small Pizza has been added";
      } else if (size === "medium") {
        this.mediumAdded = true;
        this.mediumAmount++; // increment the medium pizza count
        this.message = "Medium Pizza has been added";
      } else if (size === "large") {
        this.largeAdded = true;
        this.largeAmount++; // increment the large pizza count
        this.message = "Large Pizza has been added";
      }
      this.toggleModal();
    },
    decrement(size) {
      if (size === "small" && this.smallAmount > 0 && this.smallAdded) {
        this.smallAmount--;
        if (this.smallAmount === 0) this.smallAdded = false;
      }
      if (size === "medium" && this.mediumAmount > 0 && this.mediumAdded) {
        this.mediumAmount--;
        if (this.mediumAmount === 0) this.mediumAdded = false;
      }
      if (size === "large" && this.largeAmount > 0 && this.largeAdded) {
        this.largeAmount--;
        if (this.largeAmount === 0) this.largeAdded = false;
      }
    },
    total() {
      return (
        this.smallAmount * this.prices.small +
        this.mediumAmount * this.prices.medium +
        this.largeAmount * this.prices.large
      );
    },
    paymentTotal() {
      if (this.paymentAmount < this.total()) {
        this.payMessage = `<p class='flex bg-red-600 text-white py-2 px-4 font-bold text-lg my-3 py-1'>R${(
          this.total() - this.paymentAmount
        ).toFixed(2)} is needed</p>`;
        setTimeout(() => {
          this.payMessage = "";
        }, 2000);
      } else if (this.paymentAmount > this.total()) {
        this.payMessage = `<p class='flex bg-red-600 text-white py-2 px-4 font-bold text-lg my-3 py-1'>There is R${(
          this.paymentAmount - this.total()
        ).toFixed(2)} too much</p>`;
        setTimeout(() => {
          this.payMessage = "";
        }, 2000);
      } else if (this.paymentAmount == this.total() && this.total() !== 0) {
        this.payMessage =
          "<p class='flex bg-green-600 text-white py-2 px-4 font-bold text-lg my-3 py-1'>Enjoy your pizzas<p>";
        this.reset();
        setTimeout(() => {
          this.payMessage = "";
        }, 2000);
      }
    },
    toggleModal() {
      this.show = !this.show;
      if (this.show) {
        setTimeout(() => {
          this.show = false;
        }, 2000); // Close after 2 seconds
      }
    },
    reset() {
      this.smallAmount = 0;
      this.mediumAmount = 0;
      this.largeAmount = 0;
      this.paymentAmount = 0;
      this.message = "";

      this.smallAdded = false;
      this.mediumAdded = false;
      this.largeAdded = false;
      this.show = false;
    },

    getCart() {
      const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`;
      return axios.get(getCartURL);
    },
    addPizza(pizzaId) {
     return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/add", {
        cart_code: this.cartId,
        pizza_id: pizzaId,
      });
    },
    showCartData() {
      this.getCart().then((result) => {
        const cartData = result.data;
        console.log(cartData);

        this.cartPizzas = cartData.pizzas;
        this.cartId = cartData.total;
      });
    },
    init() {
      axios
        .get("https://pizza-api.projectcodex.net/api/pizzas")
        .then((result) => {
          this.pizzas = result.data.pizzas;
        });

      this.showCartData();
    },
    addPizzaToCart(pizza) {
      console.log(pizza);
    },
    removePizzaFromCart() {},
  };
}

document.addEventListener("alpine:init", () => {
  Alpine.data("pizzaCart", pizzaCart);
});
