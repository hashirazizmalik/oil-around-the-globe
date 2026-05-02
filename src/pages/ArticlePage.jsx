import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import RichTextRenderer from '../components/RichTextRenderer';
import '../components/News.css';

const ArticlePage = ({ news, loading }) => {
  const { id } = useParams();
  const [fullContent, setFullContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  
  const article = news.find(n => n.id === parseInt(id));

  useEffect(() => {
    if (article && article.link) {
      setContentLoading(true);
      fetch(`/api/article?url=${encodeURIComponent(article.link)}`)
        .then(res => res.json())
        .then(data => {
          if (data.textContent) {
            setFullContent(data.textContent);
          }
          setContentLoading(false);
        })
        .catch(err => {
          console.error("Failed to scrape full article:", err);
          setContentLoading(false);
        });
    }
  }, [article]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 0', maxWidth: '800px', minHeight: '60vh' }}>
        <div className="skeleton" style={{ height: '40px', width: '70%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '400px', width: '100%', marginBottom: '40px', borderRadius: 'var(--radius-lg)' }}></div>
        <RichTextRenderer loading={true} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Article not found</h2>
        <Link to="/" style={{ color: 'var(--accent-color)' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <article className="container" style={{ padding: '40px 24px', maxWidth: '800px', minHeight: '70vh' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to News
      </Link>
      
      <div style={{ marginBottom: '24px' }}>
        <span className="news-category tag-uppercase" style={{ position: 'static', display: 'inline-block', marginBottom: '16px', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px' }}>
          {article.category}
        </span>
        <h1 className="title-large" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>{article.title}</h1>
        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>{article.source}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {article.time}</span>
        </div>
      </div>

      {article.imageUrl && (
        <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '40px' }}>
          <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div className="text-body">
        {contentLoading ? (
          <RichTextRenderer loading={true} />
        ) : fullContent ? (
          <RichTextRenderer content={fullContent} />
        ) : (
          <RichTextRenderer content={article.content} />
        )}
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>
            Read original article on {article.source}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
