import PropTypes from "prop-types";
import "./McSkeleton.css";

/**
 * McSkeleton - Loading placeholder animado
 */
export default function McSkeleton({
  variant = "text",
  width,
  height,
  count = 1,
  className = "",
  ...props
}) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={["mc-skeleton", `mc-skeleton--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  ));

  return count > 1 ? (
    <div className="mc-skeleton-group">{skeletons}</div>
  ) : (
    skeletons
  );
}

McSkeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "title", "circular", "rectangular"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  count: PropTypes.number,
  className: PropTypes.string,
};
