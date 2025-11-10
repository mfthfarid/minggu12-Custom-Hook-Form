import { useState, useCallback, useMemo } from "react";

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate single field - dipindah ke atas agar bisa diakses olehdependency;
  const validateField = useCallback(
    (name, value, allValues) => {
      if (validationRules[name]) {
        const error = validationRules[name](value, allValues);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
        return error;
      }
      return "";
    },
    [validationRules]
  );

  // Handle input change
  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  // Handle blur event
  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate single field on blur
      validateField(name, values[name], values);
    },
    [validateField, values]
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((name) => {
      const error = validationRules[name](values[name], values);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Mark all fields as touched when validating form
    const allTouched = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  }, [validationRules, values]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form values manually
  const setFormValues = useCallback((newValues) => {
    setValues((prev) => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      if (e) e.preventDefault();

      setIsSubmitting(true);

      const isValid = validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, values]
  );

  // Derived state menggunakan useMemo untuk optimasi
  const isValid = useMemo(
    () => Object.keys(errors).every((key) => !errors[key]),
    [errors]
  );

  const isDirty = useMemo(
    () =>
      Object.keys(values).some(
        (key) =>
          JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])
      ),
    [values, initialValues]
  );

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,

    // Actions
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    resetForm,
    setFormValues,

    // Derived state
    isValid,
    isDirty,
  };
};

export default useForm;
