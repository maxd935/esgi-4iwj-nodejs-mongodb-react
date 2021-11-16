import {createContext, useState} from 'react';
import React from 'react';
const CartContext = createContext();

export const CartProvider = function ({children}) {
  const [items, setItems] = useState([]);

  const actions = {
    loadItems: function () {
      fetch('http://localhost:3001/carts')
        .then(res => res.json())
        .then(data => {
          setItems(data);
        });
    },
    add: function (item) {
      let found = items.find(i => i.id === item.id);
      if (found) {
        return this.update({...found, quantity: found.quantity + 1});
      } else {
        return fetch('http://localhost:3001/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...item, quantity: 1}),
        })
          .then(res => res.json())
          .then(item => {
            setItems([...items, {...item, quantity: 1}]);
          });
      }
    },
    update: function (item) {
      return fetch('http://localhost:3001/carts/' + item.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
        .then(res => res.json())
        .then(item => {
          setItems(
            items.map(i => {
              if (i.id === item.id) {
                return item;
              }
              return i;
            }),
          );
        });
    },
    delete: function (item) {
      return fetch('http://localhost:3001/carts/' + item.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.status === 200)
        .then(() => {
          setItems(items.filter(i => i.id !== item.id));
        });
    },
    save: function () {
      return fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
        }),
      })
        .then(response => response.json())
        .then(() => {
          Promise.all(items.map(item => this.delete(item))).then(() => {
            setItems([]);
            alert('Order placed successfully');
          });
        });
    },
  };

  const selectors = {
    getItems: function getItems() {
      return items;
    },
    getPrice: function getPrice() {
      return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    getItemsCount: function getItemsCount() {
      return items.length;
    },
  };

  return (
    <CartContext.Provider value={{selectors, actions}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
