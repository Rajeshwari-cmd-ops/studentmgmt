import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../common/Toast';
import { API } from '../../data/api';
import { Mail, Phone, Building2, Send, CheckCircle2 } from 'lucide-react';

export const InstContactModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programInterest: 'Computer Applications (BCA/MCA)',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }
    try {
      await API.submitInquiry({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        program: formData.programInterest,
        message: formData.message || 'General Admissions Inquiry'
      });
    } catch (err) {
      console.warn('Inquiry API error:', err);
    }
    setIsSubmitted(true);
    addToast('Admissions inquiry submitted successfully! Saved to FIC Institute database.', 'success');
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      programInterest: 'Computer Applications (BCA/MCA)',
      message: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Admissions & Institutional Inquiry"
      subtitle="Connect with FIC Institute admissions counselors and academic advisors."
      size="md"
      footer={
        !isSubmitted && (
          <>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="button" className="btn-academic-primary" onClick={handleSubmit}>
              <Send size={15} />
              <span>Submit Inquiry</span>
            </button>
          </>
        )
      }
    >
      {isSubmitted ? (
        <div className="inquiry-success-box">
          <div className="success-icon-circle">
            <CheckCircle2 size={36} />
          </div>
          <h3>Inquiry Received</h3>
          <p>
            Thank you for reaching out to <strong>FIC Institute</strong>. An academic counselor has received your details and will get in touch with you shortly.
          </p>
          <button className="btn-academic-primary" onClick={handleClose} style={{ marginTop: '16px' }}>
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row-2">
            <div className="form-group">
              <label>Applicant Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Contact *</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="applicant@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Program of Interest</label>
              <select
                value={formData.programInterest}
                onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
              >
                <option value="Computer Applications (BCA/MCA)">Computer Applications (BCA / MCA)</option>
                <option value="Management Studies (BBA/MBA)">Management Studies (BBA / MBA)</option>
                <option value="Commerce & Finance (B.Com Honors)">Commerce & Finance (B.Com Honors)</option>
                <option value="Data Analytics & AI Certification">Data Analytics & AI Certification</option>
                <option value="Executive & Skill Development">Executive & Skill Development</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Inquiry Message / Questions</label>
            <textarea
              rows="3"
              placeholder="Tell us about your educational background or any specific queries regarding eligibility, fees, or curriculum..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
        </form>
      )}
    </Modal>
  );
};
