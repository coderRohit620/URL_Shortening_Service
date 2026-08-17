import React from 'react';
import { FiCopy, FiTrash2, FiExternalLink, FiBarChart2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const UrlCard = ({ url, onDelete }) => {
  const shortUrlLink = `http://localhost:8000/${url.short_url}`;

  const truncateUrl = (str) => {
    if (str.length > 60) {
      return str.substring(0, 60) + '...';
    }
    return str;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrlLink);
    toast.success('Copied!');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="url-card">
      <div className="url-card-content">
        <div className="url-card-main">
          <div className="url-original" title={url.full_url}>
            {truncateUrl(url.full_url)}
          </div>
          <div className="url-shortened">
            <a href={shortUrlLink} target="_blank" rel="noopener noreferrer" className="short-link">
              {shortUrlLink} <FiExternalLink className="icon" />
            </a>
          </div>
        </div>
        
        <div className="url-card-stats">
          <span className="url-date">Created on {formatDate(url.createdAt)}</span>
          <span className="url-clicks">
            <FiBarChart2 className="icon" /> {url.click} {url.click === 1 ? 'click' : 'clicks'}
          </span>
        </div>
      </div>
      
      <div className="url-card-actions">
        <button onClick={handleCopy} className="btn-action btn-copy" title="Copy to clipboard">
          <FiCopy /> Copy
        </button>
        <button onClick={() => onDelete(url._id)} className="btn-action btn-delete" title="Delete URL">
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
