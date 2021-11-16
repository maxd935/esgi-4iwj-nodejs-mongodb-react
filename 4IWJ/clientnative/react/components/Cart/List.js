import {useContext, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import React from 'react';
export default function List({context, ItemComponent, FormComponent}) {
  const {actions, selectors} = useContext(context);
  const items = selectors.getItems();

  useEffect(() => {
    actions.loadItems && actions.loadItems();
  }, []);

  const itemActions = {};
  actions.delete && (itemActions.onDelete = item => actions.delete(item));
  actions.update && (itemActions.onUpdate = item => actions.update(item));

  return (
    <>
      {FormComponent && <FormComponent onSubmit={item => actions.add(item)} />}
      {!items && <Text>Loading...</Text>}
      {items && !items.length && <Text>No values</Text>}
      {items && items.length !== 0 && (
        <FlatList
          data={items}
          renderItem={({item}) => (
            <ItemComponent item={item} {...itemActions} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </>
  );
}
