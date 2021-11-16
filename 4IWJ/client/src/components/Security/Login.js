import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/AuthContext";

export default function Login() {
  const { actions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.login(values.email, values.password).then(() => navigate("/"));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="email" value={values.email} onChange={handleChange} />
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </>
  );
}
