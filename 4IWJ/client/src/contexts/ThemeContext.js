import { createContext, useState } from "react";

const ThemeContext = createContext("dark");

// ThemeContext.Provider : Le composant qui va fournir les données dans l'arbre de composants
// ThemeContext.Consumer : Le composant qui va utiliser les données fournies par le provider
//
// @deprecated
// class Component extends React.Component {
//   contextType = ThemeContext;
//   render() {
//     return (<p>{this.context}</p>);
//   }
// }
//

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
