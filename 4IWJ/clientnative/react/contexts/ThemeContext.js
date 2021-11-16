import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark" });

// ThemeContext.Provider : Le composant qui va fournir les données dans l'arbre de composants
// ThemeContext.Consumer : Le composant qui va utiliser les données fournies par le provider
//
// @deprecated
// class Component extends React.Component {
//   static contextType = ThemeContext;
//   render() {
//     return (<p>{this.context}</p>);
//   }
// }
//

export const ThemeProvider = ({ children, theme: defaultTheme = "dark" }) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const setThemeFromValue = (value) => setTheme(value);
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeFromValue }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
