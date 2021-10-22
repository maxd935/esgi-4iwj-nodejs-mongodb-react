import { CartProvider } from "../../contexts/CartContext";
import Cart from "./Cart";
import ListProduct from "./ListProduct";

export default function () {
  return (
    <>
      <h1>Product List</h1>
      <CartProvider>
        <ListProduct />
        <h1>Cart</h1>
        <Cart />
      </CartProvider>
    </>
  );
}
