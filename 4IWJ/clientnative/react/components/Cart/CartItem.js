import {TouchableOpacity, View, Text} from 'react-native';
import React from 'react';

export default function CartItem({item, onDelete, onUpdate}) {
  const handleQuantityChange = (item, operator) => () => {
    if (operator === '+') {
      onUpdate({...item, quantity: item.quantity + 1});
    } else {
      if (item.quantity > 1) {
        onUpdate({...item, quantity: item.quantity - 1});
      } else {
        onDelete(item);
      }
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>
        {item.name} {item.quantity} x {item.price} ={' '}
        {item.quantity * item.price}
      </Text>
      <TouchableOpacity onPress={handleQuantityChange(item, '-')}>
        <Text>-</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleQuantityChange(item, '+')}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
