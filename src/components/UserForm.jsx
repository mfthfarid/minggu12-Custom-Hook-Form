import React from "react";
import useForm from "../hooks/useForm";
import { createValidationRules, commonValidations } from "../utils/validator";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import "./UserForm.css";

// Initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  age: "",
  address: "",
  subscription: "basic",
};

// Validation rules
const validationRules = createValidationRules({
  firstName: commonValidations.name,
  lastName: commonValidations.name,
  email: commonValidations.email,
  phone: commonValidations.phone,
  gender: [(value) => (!value ? "Please select gender" : "")],
  age: [
    (value) => (!value ? "Age is required" : ""),
    (value) =>
      value && (Number(value) < 1 || Number(value) > 120)
        ? "Please enter a valid age (1-120)"
        : "",
  ],
  address: [
    (value) => (!value ? "Address is required" : ""),
    (value) =>
      value && value.length < 10
        ? "Address must be at least 10 characters"
        : "",
  ],
});

const UserForm = ({ onSubmit, initialData, mode = "create" }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid,
    isDirty,
  } = useForm(initialData || initialValues, validationRules);

  // console.log("Form State:", {
  //   values,
  //   errors,
  //   touched,
  //   isValid,
  //   isDirty,
  //   isSubmitting,
  // });

  // Gender options
  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // Subscription options
  const subscriptionOptions = [
    { value: "basic", label: "Basic" },
    { value: "premium", label: "Premium" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const handleFormSubmit = async (formData) => {
    console.log("Form submitted:", formData);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSubmit) {
        onSubmit(formData);
      }
      alert(
        `✅ User ${
          mode === "create" ? "created" : "updated"
        } successfully!\n\nData: ${JSON.stringify(formData, null, 2)}`
      );

      if (mode === "create") {
        resetForm();
      }
    } catch (error) {
      alert("❌ Error submitting form. Please try again.");
    }
  };

  return (
    <div className="user-form-container">
      <div className="form-header">
        <h2>{mode === "create" ? "Create New User" : "Edit User"}</h2>
        <p>
          Fill in the form below. All fields with{" "}
          <span className="required-asterisk">*</span> are required.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="user-form"
        noValidate>
        <div className="form-row">
          <div className="form-column">
            <FormInput
              name="firstName"
              label="First Name"
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-column">
            <FormInput
              name="lastName"
              label="Last Name"
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-column">
            <FormInput
              name="phone"
              label="Phone Number"
              value={values.phone}
              error={errors.phone}
              touched={touched.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <FormSelect
              name="gender"
              label="Gender"
              value={values.gender}
              error={errors.gender}
              touched={touched.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              options={genderOptions}
              required
            />
          </div>

          <div className="form-column">
            <FormInput
              name="age"
              label="Age"
              type="number"
              value={values.age}
              error={errors.age}
              touched={touched.age}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter age"
              min="1"
              max="120"
              required
            />
          </div>
        </div>

        <FormSelect
          name="subscription"
          label="Subscription Plan"
          value={values.subscription}
          error={errors.subscription}
          touched={touched.subscription}
          onChange={handleChange}
          onBlur={handleBlur}
          options={subscriptionOptions}
        />

        <FormTextArea
          name="address"
          label="Address"
          value={values.address}
          error={errors.address}
          touched={touched.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your complete address"
          rows={3}
          required
        />

        <div className="form-actions">
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
            disabled={isSubmitting || !isDirty}>
            🔄 Reset Form
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !isValid || !isDirty}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                {mode === "create" ? "Creating User..." : "Updating User..."}
              </>
            ) : mode === "create" ? (
              "📝 Create User"
            ) : (
              "💾 Update User"
            )}
          </button>
        </div>

        {/* Form Status */}
        <div className="form-status">
          <div className="status-item">
            <span className="status-label">Form Valid:</span>
            <span className={`status-value ${isValid ? "valid" : "invalid"}`}>
              {isValid ? "✅ Yes" : "❌ No"}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Form Dirty:</span>
            <span className={`status-value ${isDirty ? "dirty" : "clean"}`}>
              {isDirty ? "📝 Yes" : "✨ No"}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Submitting:</span>
            <span
              className={`status-value ${
                isSubmitting ? "submitting" : "idle"
              }`}>
              {isSubmitting ? "⏳ Processing..." : "✅ Ready"}
            </span>
          </div>
        </div>
        {/* Form Debug Info */}
        <div className="form-debug">
          <details>
            <summary>🔧 Debug Information (for learning purposes)</summary>
            <div className="debug-content">
              <div className="debug-section">
                <h4>Form Values:</h4>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
              <div className="debug-section">
                <h4>Validation Errors:</h4>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </div>
              <div className="debug-section">
                <h4>Touched Fields:</h4>
                <pre>{JSON.stringify(touched, null, 2)}</pre>
              </div>
              <div className="debug-section">
                <h4>Form State:</h4>
                <pre>
                  {JSON.stringify(
                    {
                      isValid,
                      isDirty,
                      isSubmitting,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </details>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
