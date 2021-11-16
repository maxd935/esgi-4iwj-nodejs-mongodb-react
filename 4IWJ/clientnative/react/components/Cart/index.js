import React from 'react';
import {CartProvider} from '../../contexts/CartContext';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProductScreen from '../../screens/ProductScreen';
import CartScreen from '../../screens/CartScreen';

const Tab = createMaterialBottomTabNavigator();

export default function () {
  return (
    <CartProvider>
      <Tab.Navigator>
        <Tab.Screen name="Product List" component={ProductScreen} />
        <Tab.Screen name="Cart List" component={CartScreen} />
      </Tab.Navigator>
    </CartProvider>
  );
}
