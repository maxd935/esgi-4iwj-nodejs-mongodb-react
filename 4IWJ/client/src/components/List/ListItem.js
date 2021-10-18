import Button from "../Button";

export default function ListItem({
  theme,
  animal,
  handleQuantityChange,
  deleteAnimal,
  onClick,
}) {
  return (
    <>
      <li onClick={onClick}>
        <div>
          {animal.name} {animal.quantity}
        </div>
        <Button
          theme={theme}
          title="+"
          onClick={handleQuantityChange(animal, "+")}
        />
        <Button
          theme={theme}
          title="-"
          onClick={handleQuantityChange(animal, "-")}
        />
      </li>
      <Button
        theme={theme}
        title="delete"
        onClick={() => deleteAnimal(animal)}
      />
    </>
  );
}
