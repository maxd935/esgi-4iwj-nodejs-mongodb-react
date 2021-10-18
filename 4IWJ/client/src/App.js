import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Button from "./components/Button";
import Menu from "./components/Menu/Nav";
import List from "./components/List/List";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <div className="App">
      <header className="App-header">
        <Menu theme={theme} toggleTheme={toggleTheme} />
        {theme === "light" && <List theme={theme} />}
        <Button
          theme={theme}
          title="Click ME"
          onClick={() => alert("click me")}
        />
        <Button
          theme={theme}
          title="Click ME too"
          onClick={() => alert("click me too")}
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
