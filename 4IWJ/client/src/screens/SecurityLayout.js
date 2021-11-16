import { useContext, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function SecurityLayout() {
  const { selectors } = useContext(AuthContext);
  const isConnected = selectors.isConnected();
  const navigate = useNavigate();
  useEffect(() => {
    if (isConnected) {
      navigate("/");
    }
  }, [isConnected]);
  const location = useLocation();

  return (
    <>
      <nav>
        {location.pathname === "/security/register" && (
          <Link to="/security/login">Login</Link>
        )}
        {location.pathname === "/security/login" && (
          <Link to="/security/register">Register</Link>
        )}
      </nav>
      <main>
        <h1>Security</h1>
        <Outlet />
      </main>
    </>
  );
}
