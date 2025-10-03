import "../../styles/ui/badge.css";

/**
 * Badge component for appointment status and labels
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge text
 * @param {string} [props.variant='default'] - success, warning, danger, info, default
 * @param {string} [props.size='md'] - sm, md, lg
 * @param {boolean} [props.showIndicator=false] - Show colored dot indicator
 * @param {string} [props.className] - Additional classes
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  showIndicator = false,
  className = "",
  ...props
}) {
  const classes = [
    "badge",
    `badge-${variant}`,
    size !== "md" ? `badge-${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {showIndicator && <span className="badge-icon" aria-hidden="true" />}
      {children}
    </span>
  );
}

/**
 * StatusBadge - Semantic component for appointment status
 * Maps appointment status to appropriate badge variant
 */
export function StatusBadge({ status, ...props }) {
  const statusMap = {
    confirmed: { variant: "success", text: "Confirmada", indicator: true },
    pending: { variant: "warning", text: "Pendiente", indicator: true },
    cancelled: { variant: "danger", text: "Cancelada", indicator: true },
    canceled: { variant: "danger", text: "Cancelada", indicator: true },
    completed: { variant: "info", text: "Completada", indicator: true },
    "no-show": { variant: "danger", text: "No Asistió", indicator: true },
  };

  const config = statusMap[status?.toLowerCase()] || {
    variant: "default",
    text: status || "Desconocido",
    indicator: false,
  };

  return (
    <Badge
      variant={config.variant}
      showIndicator={config.indicator}
      {...props}
    >
      {config.text}
    </Badge>
  );
}

export default Badge;
