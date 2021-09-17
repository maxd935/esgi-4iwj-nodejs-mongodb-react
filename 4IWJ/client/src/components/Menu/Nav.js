import { useState } from "react";
import NavItem from "./NavItem";

export default function Nav({ theme, toggleTheme }) {
  const [foo, setFoo] = useState({ value: 3, value2: "test" });

  return (
    <ul>
      {theme}
      {foo.value}
      {foo.value2}
      <NavItem
        theme={theme}
        title="Home"
        onClick={() => alert("Home") || setFoo({ ...foo, value: 10 })}
      />
      <NavItem
        theme={theme}
        title="About"
        onClick={() => alert("About") || setFoo({ ...foo, value2: "coucou" })}
      />
      <NavItem theme={theme} title="FAQ" onClick={toggleTheme} />
    </ul>
  );
}
