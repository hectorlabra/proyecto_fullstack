import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./McInputField.css";

/**
 * McInputField - Campo de entrada unificado
 * Incluye label, input, mensajes de error/ayuda
 */
export default function McInputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
  error = "",
  helpText = "",
  helperText = "",
  disabled = false,
  required = false,
  autoComplete,
  maxLength,
  className = "",
  icon,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const hasError = Boolean(error);
  const inputId = `mc-input-${name}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const finalHelperText = helpText || helperText;

  const handleWrapperClick = () => {
    if (inputRef.current && (type === "date" || type === "time")) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  const classNames = [
    "mc-input-field",
    hasError && "mc-input-field--error",
    disabled && "mc-input-field--disabled",
    focused && "mc-input-field--focused",
    icon && "mc-input-field--with-icon",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={inputId} className="mc-input-field__label">
          {label}
          {required && (
            <span className="mc-input-field__required" aria-label="requerido">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      <div className="mc-input-field__wrapper" onClick={handleWrapperClick}>
        {icon && (
          <span className="mc-input-field__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className="mc-input-field__input"
          aria-invalid={hasError}
          aria-describedby={
            [hasError && errorId, finalHelperText && helperId]
              .filter(Boolean)
              .join(" ") || undefined
          }
          {...props}
        />
      </div>

      {hasError && (
        <p id={errorId} className="mc-input-field__error" role="alert">
          {error}
        </p>
      )}

      {!hasError && finalHelperText && (
        <p id={helperId} className="mc-input-field__helper">
          {finalHelperText}
        </p>
      )}
    </div>
  );
}

McInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helpText: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  icon: PropTypes.node,
};
