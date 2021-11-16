import React from 'react';
import List from './List';
import ProductItem from './ProductItem';
import {useContext} from 'react';
import CartContext from '../../contexts/CartContext';
import ProductContext, {ProductProvider} from '../../contexts/ProductContext';

export default function ListProduct() {
  const {actions} = useContext(CartContext);
  const Item = props => {
    return <ProductItem {...props} onAdd={item => actions.add(item)} />;
  };
  return (
    <ProductProvider>
      <List context={ProductContext} ItemComponent={Item} />
    </ProductProvider>
  );
}
