import { useEffect, useState } from "react";

export default function List({ manager, ItemComponent, FormComponent }) {
  const [items, setItems] = useState(manager.getItems());

  useEffect(() => {
    manager.onUpdate(() => {
      setItems(manager.getItems());
    });
    manager.loadItems && manager.loadItems();
  }, []);

  const itemActions = {};
  manager.delete && (itemActions.onDelete = (item) => manager.delete(item));
  manager.update && (itemActions.onUpdate = (item) => manager.update(item));

  return (
    <>
      {FormComponent && (
        <FormComponent onSubmit={(item) => manager.add(item)} />
      )}
      {!items && <div>Loading...</div>}
      {items && !items.length && <p>No values</p>}
      {items && items.length !== 0 && (
        <ul>
          {items.map((item) => (
            <ItemComponent key={item.id} item={item} {...itemActions} />
          ))}
        </ul>
      )}
    </>
  );
}
