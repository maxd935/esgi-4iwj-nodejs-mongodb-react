import {useContext} from 'react';
import {Text, TouchableHighlight} from 'react-native';
import CartContext from '../../contexts/CartContext';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import List from './List';
import React from 'react';

export default function Cart() {
  const {actions} = useContext(CartContext);

  return (
    <>
      <List context={CartContext} ItemComponent={CartItem} />
      <CartTotal />
      <TouchableHighlight onPress={() => actions.save()}>
        <Text>Checkout</Text>
      </TouchableHighlight>
    </>
  );
}
