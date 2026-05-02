import React from 'react';
import { useParams } from 'react-router-dom';
import NewsFeed from '../components/NewsFeed';

const CategoryPage = ({ news, loading }) => {
  const { categoryName } = useParams();
  
  const filteredNews = categoryName === "Latest Headlines" 
    ? news 
    : news.filter(n => n.category && n.category.toLowerCase() === categoryName.toLowerCase());

  return (
    <div className="page-content" style={{ minHeight: '60vh', padding: '40px 0' }}>
      <header className="page-header" style={{ padding: '20px 0' }}>
        <div className="container">
          <h1 className="main-title animate-fade-in">{categoryName}</h1>
          <p className="subtitle animate-fade-in" style={{animationDelay: '0.1s'}}>
            Browse the latest updates and analysis regarding {categoryName}.
          </p>
        </div>
      </header>
      
      <NewsFeed title={categoryName} news={filteredNews} loading={loading} />
      
      {filteredNews.length === 0 && !loading && (
        <div className="container" style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>No articles found for this category currently.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
