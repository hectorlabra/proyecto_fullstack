import PropTypes from "prop-types";
import "./McCard.css";

/**
 * McCard - Contenedor elevado para agrupar información
 */
export default function McCard({
  children,
  header,
  footer,
  interactive = false,
  onClick,
  className = "",
  ...props
}) {
  const classNames = [
    "mc-card",
    interactive && "mc-card--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Component = interactive ? "button" : "div";

  return (
    <Component
      className={classNames}
      onClick={onClick}
      type={interactive ? "button" : undefined}
      {...props}
    >
      {header && <div className="mc-card__header">{header}</div>}
      <div className="mc-card__body">{children}</div>
      {footer && <div className="mc-card__footer">{footer}</div>}
    </Component>
  );
}

McCard.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  interactive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
