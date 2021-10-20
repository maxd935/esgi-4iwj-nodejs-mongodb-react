import CartItem from "./CartItem";
import cartManager from "./cartManager";
import List from "./List";

export default function Cart() {
  return (
    <>
      <List manager={cartManager} ItemComponent={CartItem} />
      <p>
        Total:{" "}
        {cartManager
          .getItems()
          .reduce((acc, item) => acc + item.quantity * item.price, 0)}{" "}
        for {cartManager.getItems().length} items
      </p>
      <button onClick={() => cartManager.save()}>Checkout</button>
    </>
  );
}
