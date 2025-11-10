// Validation utility functions
export const validators = {
  // Required field validation
  required:
    (message = "This field is required") =>
    (value) =>
      !value || value.toString().trim() === "" ? message : "",

  // Email validation
  email:
    (message = "Please enter a valid email") =>
    (value) => {
      if (!value || value.toString().trim() === "") return "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value.toString().trim()) ? message : "";
    },

  // Minimum length validation
  minLength:
    (min, message = `Must be at least ${min} characters`) =>
    (value) =>
      value && value.toString().length < min ? message : "",

  // Maximum length validation
  maxLength:
    (max, message = `Must be less than ${max} characters`) =>
    (value) =>
      value && value.toString().length > max ? message : "",
  // Number range validation
  numberRange:
    (
      min,
      max,
      message = `Must be between ${min} and 
${max}`
    ) =>
    (value) => {
      if (!value) return "";
      const num = Number(value);
      return isNaN(num) || num < min || num > max ? message : "";
    },

  // Custom regex validation
  pattern:
    (regex, message = "Invalid format") =>
    (value) =>
      value && !regex.test(value.toString()) ? message : "",
};

// Helper untuk membuat validation rules
export const createValidationRules = (rules) => {
  const validationRules = {};

  Object.keys(rules).forEach((fieldName) => {
    const fieldRules = rules[fieldName];

    validationRules[fieldName] = (value, allValues) => {
      // Convert value to string untuk konsistensi
      const stringValue = value ? value.toString() : "";

      for (const rule of fieldRules) {
        const error = rule(stringValue, allValues);
        if (error) return error;
      }
      return "";
    };
  });

  return validationRules;
};

// Pre-defined validation rules untuk common use cases
export const commonValidations = {
  email: [
    validators.required("Email is required"),
    validators.email("Please enter a valid email address"),
  ],

  password: [
    validators.required("Password is required"),
    validators.minLength(6, "Password must be at least 6 characters"),
  ],

  name: [
    validators.required("Name is required"),
    validators.minLength(2, "Name must be at least 2 characters"),
    validators.maxLength(50, "Name must be less than 50 characters"),
  ],

  phone: [
    validators.required("Phone number is required"),
    validators.pattern(
      /^\+?[\d\s-()]{10,}$/,
      "Please enter a valid phone number (min 10 digits)"
    ),
  ],
};
