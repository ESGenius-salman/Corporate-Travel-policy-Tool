import React, { useState } from 'react';
import FormInput from '../../components/FormInput';
import { validateForm } from '../../utils/validateForm';

const TripRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    purpose: '',
    urgency: '',
    budget: '',
    accommodation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const urgencyOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'corporate-housing', label: 'Corporate Housing' },
    { value: 'client-provided', label: 'Client Provided' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Map formData to backend field names
      const mappedData = {
        destination: formData.destination,
        fromDate: formData.startDate,
        toDate: formData.endDate,
        purpose: formData.purpose,
        urgency: formData.urgency,
        budget: formData.budget,
        accommodation: formData.accommodation
      };

      const result = await onSubmit(mappedData);

      if (result.success) {
        setFormData({
          destination: '',
          startDate: '',
          endDate: '',
          purpose: '',
          urgency: '',
          budget: '',
          accommodation: ''
        });
        setSubmitMessage(result.message);
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trip-form-container">
      <h2>New Trip Request</h2>
      {submitMessage && (
        <div className={`submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="trip-form">
        <FormInput label="Destination" name="destination" value={formData.destination} onChange={handleChange} required error={errors.destination} />
        <div className="date-row">
          <FormInput label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} required error={errors.startDate} />
          <FormInput label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} required error={errors.endDate} />
        </div>
        <FormInput label="Purpose of Travel" type="textarea" name="purpose" value={formData.purpose} onChange={handleChange} required error={errors.purpose} rows={4} />
        <div className="form-row">
          <FormInput label="Urgency Level" type="select" name="urgency" value={formData.urgency} onChange={handleChange} options={urgencyOptions} required error={errors.urgency} />
          <FormInput label="Estimated Cost" type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="0.00" min="0" step="0.01" error={errors.budget} />
        </div>
        <FormInput label="Accommodation Preference" type="select" name="accommodation" value={formData.accommodation} onChange={handleChange} options={accommodationOptions} error={errors.accommodation} />

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Trip Request'}
        </button>
      </form>
    </div>
  );
};

export default TripRequestForm;
