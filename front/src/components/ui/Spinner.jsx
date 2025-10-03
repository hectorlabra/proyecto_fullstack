import "../../styles/ui/spinner.css";

/**
 * Spinner component for loading states
 * @param {Object} props
 * @param {string} [props.size='md'] - sm, md, lg
 * @param {string} [props.variant='primary'] - primary, white, danger
 * @param {string} [props.label] - Accessible label for screen readers
 * @param {string} [props.className] - Additional classes
 */
export function Spinner({
  size = "md",
  variant = "primary",
  label = "Cargando",
  className = "",
  ...props
}) {
  const classes = [
    "spinner",
    `spinner-${size}`,
    `spinner-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role="status"
      aria-label={label}
      aria-live="polite"
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * SpinnerContainer - Centered spinner with optional fullscreen
 */
export function SpinnerContainer({
  fullscreen = false,
  label = "Cargando",
  size = "lg",
  ...props
}) {
  return (
    <div className={`spinner-container ${fullscreen ? "fullscreen" : ""}`}>
      <Spinner size={size} label={label} {...props} />
    </div>
  );
}

/**
 * InlineSpinner - Spinner with text label
 */
export function InlineSpinner({ label = "Cargando", size = "sm", ...props }) {
  return (
    <div className="spinner-inline">
      <Spinner size={size} label={label} {...props} />
      {label && <span>{label}</span>}
    </div>
  );
}

export default Spinner;
