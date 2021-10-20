export default function ProductItem({ item, onAdd }) {
  return (
    <li>
      {item.name} {item.price}
      <a onClick={() => onAdd(item)}>Add to cart</a>
    </li>
  );
}
