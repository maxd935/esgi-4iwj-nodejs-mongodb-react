export default function CartItem({ item, onDelete, onUpdate }) {
  const handleQuantityChange = (item, operator) => () => {
    if (operator === "+") {
      onUpdate({ ...item, quantity: item.quantity + 1 });
    } else {
      if (item.quantity > 1) {
        onUpdate({ ...item, quantity: item.quantity - 1 });
      } else {
        onDelete(item);
      }
    }
  };

  return (
    <li>
      {item.name} {item.quantity} x {item.price} = {item.quantity * item.price}
      <a onClick={handleQuantityChange(item, "-")}>-</a>
      <a onClick={handleQuantityChange(item, "+")}>+</a>
      <a onClick={() => onDelete(item)}>Delete</a>
    </li>
  );
}
