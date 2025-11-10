import React from "react";
import "./FormInput.css";

const FormInput = ({
  name,
  label,
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
}) => {
  const inputId = `form-input-${name}`;
  const showError = touched && error;

  return (
    <div className={`form-input-group ${showError ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={inputId} className="form-input-label">
          {label}
          {required && (
            <span
              className="required
asterisk">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-input ${showError ? "error" : ""}`}
      />

      {showError && <div className="form-input-error">{error}</div>}
    </div>
  );
};

export default FormInput;
