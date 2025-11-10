import React from "react";
import "./FormSelect.css";

const FormSelect = ({
  name,
  label,
  value,
  options = [],
  error,
  touched,
  onChange,
  onBlur,
  placeholder = "Select an option",
  required = false,
  disabled = false,
}) => {
  const selectId = `form-select-${name}`;
  const showError = touched && error;

  return (
    <div className={`form-select-group ${showError ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={selectId} className="form-select-label">
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

      <select
        id={selectId}
        name={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        disabled={disabled}
        className={`form-select ${showError ? "error" : ""}`}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {showError && <div className="form-select-error">{error}</div>}
    </div>
  );
};

export default FormSelect;
