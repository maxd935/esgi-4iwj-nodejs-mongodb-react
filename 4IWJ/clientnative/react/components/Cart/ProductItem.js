import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ProductItem({item, onAdd}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>
        {item.name} {item.price}
      </Text>
      <TouchableOpacity onPress={() => onAdd(item)}>
        <Text>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}
