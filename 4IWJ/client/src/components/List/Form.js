import { useEffect, useState } from "react";
import Button from "../Button";

// Exo: ajout de validateurs
// name doit être obligatoire et sa value doit supérieure à 3 caractères
// quantity doit être numérique et supérieure à 0

export default function Form({ item, theme, onSubmit }) {
  const [name, setName] = useState(item?.name ?? "");
  const [quantity, setQuantity] = useState(item?.quantity ?? 0);

  useEffect(() => {
    setName(item?.name ?? "");
    setQuantity(item?.quantity ?? 0);
  }, [item]);

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
      <input value={name} name="name" type="text" onChange={handleChange} />
      <input
        value={quantity}
        name="quantity"
        type="number"
        onChange={handleChange}
      />
      <Button theme={theme} title="submit" onClick={handleSubmit} />
    </form>
  );
}
