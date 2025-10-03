import "../../styles/ui/card.css";

/**
 * Card component for content containers
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.variant='default'] - default, elevated, flat, interactive
 * @param {string} [props.className] - Additional classes
 */
export function Card({ children, variant = "default", className = "", ...props }) {
  const classes = [
    "card",
    variant !== "default" ? `card-${variant}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3 className={`card-title ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardSubtitle({ children, className = "", ...props }) {
  return (
    <p className={`card-subtitle ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardActions({ children, className = "", ...props }) {
  return (
    <div className={`card-actions ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
