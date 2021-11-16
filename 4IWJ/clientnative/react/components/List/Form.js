import { useEffect, useState } from "react";
import Button from "../Button";

// Exo: ajout de validateurs
// name doit être obligatoire et sa value doit supérieure à 3 caractères
// quantity doit être numérique et supérieure à 0

export default function Form({ item, theme, onSubmit }) {
  const [name, setName] = useState(item?.name ?? "");
  const [quantity, setQuantity] = useState(item?.quantity ?? 0);
  const [errorName, setErrorName] = useState(false);
  const [errorQuantity, setErrorQuantity] = useState(false);

  useEffect(() => {
    setName(item?.name ?? "");
    setQuantity(item?.quantity ?? 0);
  }, [item]);

  //useEffect(() => {
  //  if (name.length < 3) {
  //    setErrorName("Le nom doit contenir au moins 3 caractères");
  //  } else {
  //    setErrorName(false);
  //  }
  //  if (quantity <= 0) {
  //    setErrorQuantity("La quantité doit être positive");
  //  } else {
  //    setErrorQuantity(false);
  //  }
  //}, [name, quantity]);

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

    if (event.target.name === "name") {
      if (event.target.value.length < 3) {
        setErrorName("Le nom doit contenir au moins 3 caractères");
      } else {
        setErrorName(false);
      }
    }
    if (event.target.name === "quantity") {
      if (event.target.value <= 0) {
        setErrorQuantity("La quantité doit être positive");
      } else {
        setErrorQuantity(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} name="name" type="text" onChange={handleChange} />
      {errorName && <p style={{ backgroundColor: "red" }}>{errorName}</p>}
      <input
        value={quantity}
        name="quantity"
        type="number"
        onChange={handleChange}
      />
      {errorQuantity && (
        <p style={{ backgroundColor: "red" }}>{errorQuantity}</p>
      )}
      <Button
        theme={theme}
        title="submit"
        onClick={handleSubmit}
        disabled={errorName || errorQuantity}
      />
    </form>
  );
}
