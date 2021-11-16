import {useContext} from 'react';
import {Text} from 'react-native';
import CartContext from '../../contexts/CartContext';
import React from 'react';

export default function CartTotal() {
  const {selectors} = useContext(CartContext);

  return (
    <Text>
      Total: {selectors.getPrice()} for {selectors.getItemsCount()} items
    </Text>
  );
}
