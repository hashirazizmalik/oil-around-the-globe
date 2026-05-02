import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch live news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage news={news} loading={loading} />} />
          <Route path="/category/:categoryName" element={<CategoryPage news={news} loading={loading} />} />
          <Route path="/article/:id" element={<ArticlePage news={news} loading={loading} />} />
        </Routes>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2026 Oil Around The Globe. Built for minimal, premium data aggregation.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
