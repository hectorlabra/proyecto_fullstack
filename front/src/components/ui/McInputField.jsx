import { useState } from "react";
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
  helperText = "",
  disabled = false,
  required = false,
  autoComplete,
  maxLength,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);
  const inputId = `mc-input-${name}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const classNames = [
    "mc-input-field",
    hasError && "mc-input-field--error",
    disabled && "mc-input-field--disabled",
    focused && "mc-input-field--focused",
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

      <div className="mc-input-field__wrapper">
        <input
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
            [hasError && errorId, helperText && helperId]
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

      {!hasError && helperText && (
        <p id={helperId} className="mc-input-field__helper">
          {helperText}
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
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};
