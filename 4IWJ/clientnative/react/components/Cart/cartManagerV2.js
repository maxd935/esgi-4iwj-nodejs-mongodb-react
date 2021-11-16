export default {
  items: [],
  callbacks: [],
  callback: function () {
    this.callbacks.forEach((cb) => cb());
  },
  onUpdate: function (callback) {
    this.callbacks.push(callback);
  },
  loadItems: function () {
    fetch("http://localhost:3001/carts")
      .then((res) => res.json())
      .then((data) => {
        this.items = data;
        this.callback();
      });
  },
  add: function (item) {
    if (this.items.find((i) => i.id === item.id)) {
      this.items = this.items.map((i) => {
        if (i.id === item.id) {
          this.update({ i, quantity: i.quantity + 1 });
        }
        return i;
      });
    } else {
      fetch("http://localhost:3001/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, quantity: 1 }),
      })
        .then((res) => res.json())
        .then((item) => {
          this.items = [...this.items, { item, quantity: 1 }];
          this?.callback();
        });
    }
  },
  update: function (item) {
    fetch("http://localhost:3001/carts/" + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((item) => {
        this.items = this.items.map((i) => {
          if (i.id === item.id) {
            return item;
          }
          return i;
        });
        this?.callback();
      });
  },
  delete: function (item) {
    fetch("http://localhost:3001/carts/" + item.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.status === 200)
      .then(() => {
        this.items = this.items.filter((i) => i.id !== item.id);
        this?.callback();
      });
  },
  getItems: function getItems() {
    //{id, item, quantity}
    return this.items.map((i) => ({
      ...i.item,
      quantity: i.quantity,
      id: i.id,
    }));
    //{id, name, price, quantity}
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
