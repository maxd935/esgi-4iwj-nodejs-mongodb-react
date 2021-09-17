import { useState } from "react";
import Form from "./Form";
import ListItem from "./ListItem";

const defaultAnimals = [
  { name: "Chat", quantity: 1 },
  { name: "Chien", quantity: 4 },
  { name: "Dromadaire", quantity: 5 },
  { name: "Cheval", quantity: 2 },
];

export default function List({ theme }) {
  const [animals, setAnimals] = useState(defaultAnimals);

  const handleQuantityChange = (animal, operator) => () => {
    if (operator === "-" && animal.quantity === 1) deleteAnimal(animal);
    else
      setAnimals(
        animals.map((item) => {
          if (item.name === animal.name) {
            switch (operator) {
              case "+":
                item.quantity++;
                break;
              case "-":
                if (item.quantity) item.quantity--;
                break;
            }
          }
          return item;
        })
      );
  };

  const addAnimal = (value) => {
    setAnimals([...animals, value]);
  };

  const deleteAnimal = (value) => {
    setAnimals(animals.filter((item) => item.name !== value.name));
  };

  return (
    <>
      <Form theme={theme} onSubmit={addAnimal} />
      <ul>
        {animals.map((animal) => (
          <ListItem
            theme={theme}
            key={animal.name}
            animal={animal}
            deleteAnimal={deleteAnimal}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </ul>
      Total: {animals.reduce((acc, item) => acc + item.quantity, 0)}
    </>
  );
}
