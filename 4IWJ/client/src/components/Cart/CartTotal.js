import { useEffect, useState } from "react";
import cartManager from "./cartManagerV2";

export default function CartTotal() {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    cartManager.onUpdate(() => setCart(new Date().getTime()));
  }, []);

  return (
    <p>
      Total:{" "}
      {cartManager
        .getItems()
        .reduce((acc, item) => acc + item.quantity * item.price, 0)}{" "}
      for {cartManager.getItems().length} items
    </p>
  );
}
