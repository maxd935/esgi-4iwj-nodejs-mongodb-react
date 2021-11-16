import Button from "../Button";

export default function NavItem(props) {
  return (
    <li>
      <Button variant="text" {...props} />
    </li>
  );
}
