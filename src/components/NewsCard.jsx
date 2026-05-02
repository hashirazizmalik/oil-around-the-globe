import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import './News.css';
import { Link } from 'react-router-dom';

const NewsCard = ({ id, title, source, time, imageUrl, category, index }) => {
  return (
    <article className="news-card card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="news-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="news-image" />
        ) : (
          <div className="news-image-placeholder"></div>
        )}
        <span className="news-category">{category}</span>
      </div>
      <div className="news-content">
        <div className="news-meta">
          <span className="news-source">{source}</span>
          <span className="news-time">
            <Clock size={14} /> {time}
          </span>
        </div>
        <h3 className="news-title">{title}</h3>
        <Link to={`/article/${id}`} className="news-read-more">
          Read Article <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
