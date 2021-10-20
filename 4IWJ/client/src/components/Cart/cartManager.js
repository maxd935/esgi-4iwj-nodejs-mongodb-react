export default {
  items: [],
  onUpdate: function (callback) {
    this.callback = callback;
  },
  add: function (item) {
    if (this.items.find((i) => i.id === item.id)) {
      this.items = this.items.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
    } else {
      this.items = [...this.items, { ...item, quantity: 1 }];
    }
    this?.callback();
  },
  update: function (item) {
    this.items = this.items.map((i) => {
      if (i.id === item.id) {
        return item;
      }
      return i;
    });
    this?.callback();
  },
  delete: function (item) {
    this.items = this.items.filter((i) => i.id !== item.id);
    this?.callback();
  },
  getItems: function getItems() {
    return this.items;
  },
  save: function () {
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: this.items,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.items = [];
        this.callback();
        alert("Order placed successfully");
      });
  },
};
