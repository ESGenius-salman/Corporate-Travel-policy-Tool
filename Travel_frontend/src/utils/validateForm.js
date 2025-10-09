export const validateForm = (formData) => {
  const errors = {};

  // Destination validation
  if (!formData.destination || formData.destination.trim().length < 2) {
    errors.destination = 'Destination must be at least 2 characters long';
  }

  // Date validation
  if (!formData.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!formData.endDate) {
    errors.endDate = 'End date is required';
  }

  if (formData.startDate && formData.endDate) {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      errors.startDate = 'Start date cannot be in the past';
    }

    if (endDate < startDate) {
      errors.endDate = 'End date must be after start date';
    }

    // Check if trip is too long (more than 30 days)
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      errors.endDate = 'Trip duration cannot exceed 30 days';
    }
  }

  // Purpose validation
  if (!formData.purpose || formData.purpose.trim().length < 10) {
    errors.purpose = 'Purpose must be at least 10 characters long';
  }

  // Urgency validation
  if (!formData.urgency) {
    errors.urgency = 'Please select an urgency level';
  }

  // Estimated cost validation (optional but if provided, must be valid)
  if (formData.estimatedCost && (isNaN(formData.estimatedCost) || parseFloat(formData.estimatedCost) < 0)) {
    errors.estimatedCost = 'Estimated cost must be a valid positive number';
  }

  return errors;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} cannot exceed ${maxLength} characters`;
  }
  return null;
};