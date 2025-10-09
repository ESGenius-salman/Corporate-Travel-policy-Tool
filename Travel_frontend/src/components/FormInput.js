import React from 'react';
import './FormInput.css';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  rows = 3,
  ...props
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={`form-input ${error ? 'error' : ''}`}
            {...props}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`form-input ${error ? 'error' : ''}`}
            {...props}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`form-input ${error ? 'error' : ''}`}
            {...props}
          />
        );
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;