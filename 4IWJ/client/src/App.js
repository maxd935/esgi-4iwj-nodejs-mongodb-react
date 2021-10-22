import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Button from "./components/Button";
import Menu from "./components/Menu/Nav";
import List from "./components/List/List";
import ThemeContext, { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <div className="App">
      <Button title="Click ME too" onClick={() => alert("click me too")} />
      <ThemeProvider>
        <header className="App-header">
          <Menu toggleTheme={toggleTheme} />
          {theme === "light" && <List />}
          <Button title="Click ME" onClick={() => alert("click me")} />
          <ThemeContext.Consumer>
            {({ toggleTheme }) => {
              return <Button title="toggleTheme" onClick={toggleTheme} />;
            }}
          </ThemeContext.Consumer>
          <Button title="Click ME too" onClick={() => alert("click me too")} />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
