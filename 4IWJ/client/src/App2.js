import "./App.css";
import Button from "./components/Button";
import ThemeContext, { ThemeProvider } from "./contexts/ThemeContext";
import ThemeConfigurator from "./components/ThemeConfigurator";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ toggleTheme, theme }) => {
            return (
              <>
                {theme}
                <Button title="toggleTheme" onClick={toggleTheme} />
              </>
            );
          }}
        </ThemeContext.Consumer>
        <ThemeConfigurator />
      </ThemeProvider>
    </div>
  );
}

export default App;
