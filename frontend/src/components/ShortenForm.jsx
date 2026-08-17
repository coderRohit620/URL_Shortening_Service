import React, { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ShortenForm = ({ urls, setUrls }) => {
  const [fullUrl, setFullUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullUrl) return;

    setIsSubmitting(true);
    try {
      const response = await api.post('/url/shorten', { fullUrl });
      const newUrl = response.data.data;
      setUrls([newUrl, ...urls]);
      setFullUrl('');
      toast.success('URL shortened successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shorten-form-container">
      <form className="shorten-form" onSubmit={handleSubmit}>
        <input
          type="url"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
          className="shorten-input"
        />
        <button type="submit" className="btn-shorten" disabled={isSubmitting}>
          {isSubmitting ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
    </div>
  );
};

export default ShortenForm;
