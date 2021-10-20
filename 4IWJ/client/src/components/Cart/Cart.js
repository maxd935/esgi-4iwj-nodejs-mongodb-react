import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import cartManager from "./cartManagerV2";
import CartTotal from "./CartTotal";
import List from "./List";

export default function Cart() {
  const [cart, setCart] = useState(null);
  //useEffect(() => {
  //  cartManager.onUpdate(() => setCart(new Date().getTime()));
  //}, []);

  return (
    <>
      <List manager={cartManager} ItemComponent={CartItem} />
      <CartTotal />
      <button onClick={() => cartManager.save()}>Checkout</button>
    </>
  );
}
