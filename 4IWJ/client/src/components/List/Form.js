import { useState } from "react";
import Button from "../Button";

export default function Form({ theme, onSubmit }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const setters = {
    name: setName,
    quantity: setQuantity,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name,
      quantity,
    });
  };

  const handleChange = (event) => {
    setters[event.target.name](event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" onChange={handleChange} />
      <input name="quantity" type="number" onChange={handleChange} />
      <Button theme={theme} title="submit" onClick={handleSubmit} />
    </form>
  );
}
