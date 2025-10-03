import "../../styles/ui/button.css";

/**
 * Button component with healthcare branding
 * @param {Object} props
 * @param {string} [props.as='button'] - Element type (button, a, Link)
 * @param {string} [props.variant='primary'] - primary, secondary, ghost, danger
 * @param {string} [props.size='md'] - sm, md, lg
 * @param {boolean} [props.fullWidth=false] - Block width
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} [props.leadingIcon] - Icon before text
 * @param {React.ReactNode} [props.trailingIcon] - Icon after text
 * @param {React.ReactNode} props.children - Button content
 */
export function Button({
  as = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  children,
  className = "",
  ...props
}) {
  const Component = as;
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} disabled={disabled} {...props}>
      {leadingIcon && (
        <span className="btn-icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="btn-label">{children}</span>
      {trailingIcon && (
        <span className="btn-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </Component>
  );
}

export default Button;
