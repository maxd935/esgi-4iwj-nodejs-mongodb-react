export default function Button({
  variant = "button",
  onClick,
  title,
  theme,
  ...rest
}) {
  //const onClick = props.onClick,
  //  title = props.title;
  //const { onClick, title } = props;
  const style = {
    backgroundColor: rest.disabled
      ? "grey"
      : theme === "dark"
      ? "black"
      : "white",
    color: theme === "dark" ? "white" : "black",
  };

  const Component = variant === "button" ? "button" : "a";

  return (
    <Component style={style} onClick={onClick} {...rest}>
      {title}
    </Component>
  );
}
