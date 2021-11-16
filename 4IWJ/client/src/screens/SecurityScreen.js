import { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import Login from "../components/Security/Login";
import AuthContext from "../contexts/AuthContext";
import SecurityLayout from "./SecurityLayout";

export default function SecurityScreen() {
  return (
    <>
      <h1>Security</h1>
      <Route path="" element={<SecurityLayout />}></Route>
    </>
  );
}
