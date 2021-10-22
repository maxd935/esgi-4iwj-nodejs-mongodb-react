import { useContext, useEffect } from "react";

export default function List({ context, ItemComponent, FormComponent }) {
  const { actions, selectors } = useContext(context);
  const items = selectors.getItems();

  useEffect(() => {
    actions.loadItems && actions.loadItems();
  }, []);

  const itemActions = {};
  actions.delete && (itemActions.onDelete = (item) => actions.delete(item));
  actions.update && (itemActions.onUpdate = (item) => actions.update(item));

  return (
    <>
      {FormComponent && (
        <FormComponent onSubmit={(item) => actions.add(item)} />
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
