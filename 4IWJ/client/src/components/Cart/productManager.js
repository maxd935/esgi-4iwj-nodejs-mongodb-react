export default {
  items: null,
  onUpdate: function (callback) {
    this.callback = callback;
  },
  loadItems: function loadItems() {
    return fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        this.items = data;
        this?.callback();
      });
  },
  getItems: function getItems() {
    return this.items;
  },
};
