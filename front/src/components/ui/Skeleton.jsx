import "../../styles/ui/skeleton.css";

/**
 * Base Skeleton component for loading states
 * @param {Object} props
 * @param {string} [props.variant='text'] - text, title, circle, rect
 * @param {string} [props.width] - Custom width
 * @param {string} [props.height] - Custom height
 * @param {string} [props.className] - Additional classes
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  ...props
}) {
  const classes = [
    "skeleton",
    variant !== "text" ? `skeleton-${variant}` : "skeleton-text",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return <div className={classes} style={style} {...props} />;
}

/**
 * AppointmentCardSkeleton - Skeleton for appointment card
 */
export function AppointmentCardSkeleton() {
  return (
    <div className="skeleton-appointment-card">
      <div className="skeleton-appointment-header">
        <Skeleton width="120px" height="20px" />
        <Skeleton width="80px" height="24px" />
      </div>
      <div className="skeleton-appointment-content">
        <Skeleton width="100%" height="16px" />
        <Skeleton width="80%" height="16px" />
        <Skeleton width="60%" height="16px" />
      </div>
      <div className="skeleton-appointment-actions">
        <Skeleton width="100px" height="36px" />
        <Skeleton width="100px" height="36px" />
      </div>
    </div>
  );
}

/**
 * AppointmentListSkeleton - Multiple appointment cards
 */
export function AppointmentListSkeleton({ count = 3 }) {
  return (
    <div className="skeleton-container" aria-busy="true" aria-label="Cargando citas">
      {Array.from({ length: count }, (_, i) => (
        <AppointmentCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default Skeleton;
