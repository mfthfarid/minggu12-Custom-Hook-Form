import React from "react";
import "./FormTextarea.css";

const FormTextarea = ({
  name,
  label,
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
}) => {
  const textareaId = `form-textarea-${name}`;
  const showError = touched && error;

  return (
    <div className={`form-textarea-group ${showError ? "has-error" : ""}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="form-textarea
label">
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

      <textarea
        id={textareaId}
        name={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`form-textarea ${showError ? "error" : ""}`}
      />

      {showError && <div className="form-textarea-error">{error}</div>}
    </div>
  );
};

export default FormTextarea;
