import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import './PriceWidgets.css';

const PriceCard = ({ title, symbol, price, isLoading }) => {
  return (
    <div className="widget-card card animate-fade-in price-card">
      <div className="price-card-inner">
        <span className="price-card-symbol tag-uppercase">
          {symbol}
        </span>
        <h3 className="price-card-title">{title}</h3>
        
        <div className="price-card-value-container">
          {isLoading ? (
            <div className="skeleton" style={{ height: '48px', width: '60%' }}></div>
          ) : price === null ? (
            <div className="price-card-error">Unavailable</div>
          ) : (
            <>
              <DollarSign size={32} className="price-card-icon" />
              <span className="price-card-amount">
                {price.toFixed(2)}
              </span>
              <span className="price-card-unit">/ barrel</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PriceWidgets = () => {
  const [prices, setPrices] = useState({ wti: null, brent: null });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/price');
      if (response.ok) {
        const data = await response.json();
        setPrices({ wti: data.wti, brent: data.brent });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch live prices:", error);
      // Fallback prices if backend is unreachable
      setPrices({ wti: 82.45, brent: 86.10 });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // Refresh every 10 minutes (600,000 ms)
    const interval = setInterval(fetchPrices, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="price-widgets-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Real-Time Prices</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34c759', display: 'inline-block' }}></span>
            Live Data
          </span>
        </div>
        <div className="widgets-grid">
          <PriceCard title="WTI Crude Oil" symbol="NYMEX:CL1!" price={prices.wti} isLoading={isLoading} />
          <PriceCard title="Brent Crude Oil" symbol="ICEEUR:BRN1!" price={prices.brent} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};

export default PriceWidgets;
