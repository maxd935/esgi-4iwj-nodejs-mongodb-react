import {createContext, useState} from 'react';
import React from 'react';
const ProductContext = createContext();

export const ProductProvider = function ({children}) {
  const [items, setItems] = useState([]);

  const actions = {
    loadItems: function () {
      fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => {
          setItems(data);
        });
    },
  };

  const selectors = {
    getItems: function getItems() {
      return items;
    },
  };

  return (
    <ProductContext.Provider value={{selectors, actions}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
