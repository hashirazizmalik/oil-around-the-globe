import React from 'react';
import PriceWidgets from '../components/PriceWidgets';
import NewsFeed from '../components/NewsFeed';
import SupplyChain from '../components/SupplyChain';

const HomePage = ({ news, loading }) => {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="main-title animate-fade-in">Global Energy Markets</h1>
          <p className="subtitle animate-fade-in" style={{animationDelay: '0.1s'}}>
            Real-time insights, news, and supply chain data for the crude oil industry.
          </p>
        </div>
      </header>
      <PriceWidgets />
      <NewsFeed title="Top Stories" news={news.slice(0, 3)} loading={loading} />
      <SupplyChain />
    </>
  );
};

export default HomePage;
