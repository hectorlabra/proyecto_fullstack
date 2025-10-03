import "../../styles/ui/input.css";

/**
 * Input/TextField component with accessibility and validation
 * @param {Object} props
 * @param {string} props.id - Unique ID for input (required for a11y)
 * @param {string} props.label - Label text
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {boolean} [props.required=false] - Required field
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.size='md'] - sm, md, lg
 * @param {boolean} [props.multiline=false] - Render as textarea
 */
export function Input({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helper,
  required = false,
  disabled = false,
  size = "md",
  multiline = false,
  className = "",
  ...props
}) {
  const hasError = Boolean(error);
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const inputClasses = [
    "input-field",
    size !== "md" ? `input-${size}` : "",
    multiline ? "textarea" : "",
    hasError ? "error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const InputElement = multiline ? "textarea" : "input";

  return (
    <div className="input-group">
      {label && (
        <label
          htmlFor={id}
          className={`input-label ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}
      <InputElement
        id={id}
        type={multiline ? undefined : type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        {...props}
      />
      {helper && !error && (
        <span id={helperId} className="input-helper">
          {helper}
        </span>
      )}
      {error && (
        <span id={errorId} className="input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
