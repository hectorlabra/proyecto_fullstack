import PropTypes from "prop-types";
import "./McBadge.css";

/**
 * McBadge - Indicadores de estado y categorías
 * Variantes: default, success, warning, danger, info
 */
export default function McBadge({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const classNames = [
    "mc-badge",
    `mc-badge--${variant}`,
    `mc-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}

McBadge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "success", "warning", "danger", "info"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};
