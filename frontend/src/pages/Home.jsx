import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api, { BASE_URL } from '../api/axios';
import toast from 'react-hot-toast';
import { FiCopy, FiExternalLink, FiLink, FiZap, FiGlobe } from 'react-icons/fi';

const Home = () => {
  const [fullUrl, setFullUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullUrl) return;

    setIsSubmitting(true);
    try {
      const response = await api.post('/url/shorten', { fullUrl });
      const data = response.data.data;
      setShortenedUrl({
        shortUrl: `${BASE_URL}/${data.short_url}`,
        originalUrl: data.full_url,
      });
      toast.success('URL shortened successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl.shortUrl);
    toast.success('Copied to clipboard!');
  };

  const handleShortenAnother = () => {
    setFullUrl('');
    setShortenedUrl(null);
  };

  return (
    <div className="home">
      <section className="hero-section">
        <h1 className="hero-title">
          Shorten your links,<br />
          <span className="hero-highlight">share them faster.</span>
        </h1>
        <p className="hero-subtitle">
          Paste a long URL and get a short, shareable link in seconds. No account required.
        </p>

        {!shortenedUrl ? (
          <form className="hero-form" onSubmit={handleSubmit}>
            <div className="hero-input-wrapper">
              <FiLink className="hero-input-icon" />
              <input
                type="url"
                value={fullUrl}
                onChange={(e) => setFullUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                required
                className="hero-input"
              />
            </div>
            <button type="submit" className="btn-primary btn-hero" disabled={isSubmitting}>
              {isSubmitting ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>
        ) : (
          <div className="result-card">
            <div className="result-original">
              {shortenedUrl.originalUrl.length > 70
                ? shortenedUrl.originalUrl.substring(0, 70) + '...'
                : shortenedUrl.originalUrl}
            </div>
            <div className="result-short">
              <a href={shortenedUrl.shortUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl.shortUrl}
                <FiExternalLink className="icon" />
              </a>
            </div>
            <div className="result-actions">
              <button onClick={handleCopy} className="btn-primary">
                <FiCopy /> Copy
              </button>
              <button onClick={handleShortenAnother} className="btn-secondary">
                Shorten Another
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="features-section">
        <div className="feature">
          <div className="feature-icon"><FiZap /></div>
          <h3>Instant</h3>
          <p>Get your short link in under a second. No sign-up needed.</p>
        </div>
        <div className="feature">
          <div className="feature-icon"><FiGlobe /></div>
          <h3>Trackable</h3>
          <p>Sign in to track clicks and manage all your links in one place.</p>
        </div>
        <div className="feature">
          <div className="feature-icon"><FiLink /></div>
          <h3>Simple</h3>
          <p>Clean, short links that are easy to share anywhere.</p>
        </div>
      </section>

      <div className="home-cta">
        <p>Want to manage and track your links? <Link to="/register">Create a free account →</Link></p>
      </div>
    </div>
  );
};

export default Home;
