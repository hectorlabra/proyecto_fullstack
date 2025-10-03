export function IconBase({
  size = 20,
  className = "",
  title,
  children,
  ...props
}) {
  const ariaHidden = title ? undefined : true;
  const role = title ? "img" : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role={role}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export default IconBase;
