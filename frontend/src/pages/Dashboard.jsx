import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ShortenForm from '../components/ShortenForm';
import UrlCard from '../components/UrlCard';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await api.get('/url/my-urls');
      setUrls(response.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/url/${id}`);
      setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));
      toast.success('URL deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete URL');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Links</h1>
      </div>
      
      <ShortenForm urls={urls} setUrls={setUrls} />

      <div className="urls-list">
        {loading ? (
          <p className="loading-message">Loading your URLs...</p>
        ) : urls.length > 0 ? (
          urls.map((url) => (
            <UrlCard key={url._id} url={url} onDelete={handleDelete} />
          ))
        ) : (
          <div className="empty-state">
            <p>You haven't shortened any URLs yet. Try pasting a link above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
