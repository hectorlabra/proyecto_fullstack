import PropTypes from "prop-types";
import "./McButton.css";

/**
 * McButton - Sistema de botones Medi Citas
 * Variantes: primary, accent, ghost, outline, danger
 * Estados: normal, hover, focus, disabled, loading
 */
export default function McButton({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  onClick,
  className = "",
  ...props
}) {
  const classNames = [
    "mc-button",
    `mc-button--${variant}`,
    `mc-button--${size}`,
    fullWidth && "mc-button--full-width",
    loading && "mc-button--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="mc-button__spinner" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeOpacity="0.25"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
      {icon && iconPosition === "left" && !loading && (
        <span
          className="mc-button__icon mc-button__icon--left"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span
        className={loading ? "mc-button__label--loading" : "mc-button__label"}
      >
        {children}
      </span>
      {icon && iconPosition === "right" && !loading && (
        <span
          className="mc-button__icon mc-button__icon--right"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </button>
  );
}

McButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "accent", "ghost", "outline", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};
