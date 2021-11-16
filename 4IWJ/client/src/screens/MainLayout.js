import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function MainLayout() {
  const { selectors } = useContext(AuthContext);
  const isConnected = selectors.isConnected();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isConnected) {
      navigate("/security/login");
    }
  }, [isConnected]);

  return (
    <>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
