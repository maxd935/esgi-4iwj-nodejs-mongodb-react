import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    if (payload) {
      if (payload.exp < Date.now()) {
        actions.logout();
      } else {
        setUser(payload);
      }
    } else {
      setUser(null);
    }
  }, []);

  const actions = {
    login: async function (email, password) {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(JSON.parse(atob(data.token.split(".")[1])));
    },
    logout: async function () {
      localStorage.removeItem("token");
      setUser(null);
    },
  };

  const selectors = {
    getUser: function getUser() {
      return user;
    },
    isConnected: function isConnected() {
      return user !== null;
    },
  };

  return (
    <AuthContext.Provider value={{ selectors, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
