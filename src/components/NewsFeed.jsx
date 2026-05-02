import React from 'react';
import NewsCard from './NewsCard';
import './News.css';

const NewsFeed = ({ title = "Latest Headlines", news = [], loading = false }) => {
  return (
    <section className="news-feed-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="news-grid">
          {loading ? (
            // Render 3 skeleton cards
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="news-card card" style={{ height: '350px', padding: '0', display: 'flex', flexDirection: 'column' }}>
                <div className="skeleton" style={{ height: '200px', width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}></div>
                <div style={{ padding: '20px' }}>
                  <div className="skeleton" style={{ height: '14px', width: '30%', marginBottom: '12px' }}></div>
                  <div className="skeleton" style={{ height: '24px', width: '90%', marginBottom: '8px' }}></div>
                  <div className="skeleton" style={{ height: '24px', width: '60%' }}></div>
                </div>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map((item, idx) => (
              <NewsCard key={item.id} index={idx} {...item} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
              No news available for this category right now.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
