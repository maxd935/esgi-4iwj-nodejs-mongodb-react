import { CartProvider } from "../../contexts/CartContext";
import CartScreen from "../../screens/CartScreen";
import ProductScreen from "../../screens/ProductScreen";
import MainLayout from "../../screens/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import SecurityLayout from "../../screens/SecurityLayout";
import Login from "../Security/Login";

export default function () {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/security" element={<SecurityLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="Register" element={<></>} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<ProductScreen />} />
              <Route path="cart" element={<CartScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
