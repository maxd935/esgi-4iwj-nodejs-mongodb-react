import ThemeContext from "../contexts/ThemeContext";

export default function Button({
  variant = "button",
  onClick,
  title,
  ...rest
}) {
  //const onClick = props.onClick,
  //  title = props.title;
  //const { onClick, title } = props;

  const Component = variant === "button" ? "button" : "a";
  const context = useContext(ThemeContext);

  return (
    <ThemeContext.Consumer>
      {(context) => {
        const style = {
          backgroundColor: rest.disabled
            ? "grey"
            : context.theme === "dark"
            ? "black"
            : "white",
          color: context.theme === "dark" ? "white" : "black",
        };

        return (
          <Component style={style} onClick={onClick} {...rest}>
            {title}
          </Component>
        );
      }}
    </ThemeContext.Consumer>
  );
}
