import { useState, useEffect } from "react";
import { render } from "react-dom";
import Form from "./Form";
import ListItem from "./ListItem";

const defaultAnimals = [
  { name: "Chat", quantity: 1 },
  { name: "Chien", quantity: 4 },
  { name: "Dromadaire", quantity: 5 },
  { name: "Cheval", quantity: 2 },
];

export default function List({ theme }) {
  const [animals, setAnimals] = useState(null);
  const [animalSelected, setAnimalSelected] = useState(null);
  useEffect(() => {
    console.log("mounting");
    fetch("http://localhost:3001/animals")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
      });
    return () => {
      console.log("unmounting");
    };
  }, []);

  useEffect(() => {
    console.log("theme has changed : " + theme);

    return () => {
      console.log("theme will update : " + theme);
    };
  }, [theme]);

  useEffect(() => {
    console.log("animals has changed");
  }, [animals]);

  useEffect(() => {
    console.log("theme or animals have changed");
  }, [theme, animals]);

  const handleQuantityChange = (animal, operator) => () => {
    if (operator === "-" && animal.quantity === 1) deleteAnimal(animal);
    else
      fetch(`http://localhost:3001/animals/${animal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: animal.quantity + (operator === "-" ? -1 : 1),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAnimals(animals.map((a) => (a.id === data.id ? data : a)));
        });
  };

  const addAnimal = (value) => {
    fetch("http://localhost:3001/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimals([...animals, data]);
      });
  };

  const deleteAnimal = async (value) => {
    const response = await fetch(`http://localhost:3001/animals/${value.id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setAnimals(animals.filter((item) => item.id !== value.id));
    }
  };

  return (
    <>
      {!animals && (
        <>
          <ListItem
            theme={theme}
            animal={{ name: "...", quantity: "..." }}
            handleQuantityChange={() => {}}
          />
          <ListItem
            theme={theme}
            animal={{ name: "...", quantity: "..." }}
            handleQuantityChange={() => {}}
          />
        </>
      )}
      {animals && (
        <>
          <Form item={animalSelected} theme={theme} onSubmit={addAnimal} />
          <ul>
            {animals.map((animal) => (
              <ListItem
                theme={theme}
                key={animal.name}
                animal={animal}
                onClick={() => setAnimalSelected(animal)}
                deleteAnimal={deleteAnimal}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </ul>
          Total: {animals.reduce((acc, item) => acc + item.quantity, 0)}
        </>
      )}
    </>
  );
}
