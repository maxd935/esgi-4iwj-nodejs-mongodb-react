import { useContext, useState } from "react";
import ThemeContext, { ThemeProvider } from "../contexts/ThemeContext";

export default function ThemeConfigurator() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [localTheme, setLocalTheme] = useState(theme);
  return (
    <>
      {["dark", "light"].map((t) => (
        <button key={t} onClick={() => setLocalTheme(t)}>
          {t} {localTheme === t ? "🔘" : ""}
        </button>
      ))}
      <button onClick={() => setTheme(localTheme)}>Apply</button>
      <ThemeProvider theme={localTheme}>
        <ThemeContext.Consumer>
          {(context) => {
            return <h1>{context.theme}</h1>;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </>
  );
}
