export default function Button({ children, textOnly, className, ...props }) {
  let cssaClasses = textOnly ? "text-button" : "button";

  cssaClasses += " " + className;

  return (
    <button className={cssaClasses} {...props}>
      {children}
    </button>
  );
}
