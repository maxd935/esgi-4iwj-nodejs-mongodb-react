import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import CartItem from "./CartItem";
import cartManager from "./cartManagerV2";
import CartTotal from "./CartTotal";
import List from "./List";

export default function Cart() {
  const [cart, setCart] = useState(null);
  //useEffect(() => {
  //  cartManager.onUpdate(() => setCart(new Date().getTime()));
  //}, []);
  const { actions } = useContext(CartContext);

  return (
    <>
      <List context={CartContext} ItemComponent={CartItem} />
      <CartTotal />
      <button onClick={() => actions.save()}>Checkout</button>
    </>
  );
}
