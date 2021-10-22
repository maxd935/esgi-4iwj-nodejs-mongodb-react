import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";

export default function CartTotal() {
  const { selectors } = useContext(CartContext);

  return (
    <p>
      Total: {selectors.getPrice()} for {selectors.getItemsCount()} items
    </p>
  );
}
