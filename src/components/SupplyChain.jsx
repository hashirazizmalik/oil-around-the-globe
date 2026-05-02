import React, { useState, useEffect } from 'react';
import { Database, TrendingDown, TrendingUp } from 'lucide-react';
import './SupplyChain.css';

const SupplyChain = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => {
        setInventoryData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch inventory data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="supply-chain-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Supply Chain & Inventories</h2>
          <span className="source-badge">
            <Database size={14} /> Source: US EIA Weekly via TradingEconomics
          </span>
        </div>
        
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Week Ending</th>
                <th>Inventory Type</th>
                <th>Total Amount (Barrels)</th>
                <th>WoW Change</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`}>
                    <td><div className="skeleton" style={{ height: '20px', width: '80px' }}></div></td>
                    <td><div className="skeleton" style={{ height: '20px', width: '120px' }}></div></td>
                    <td><div className="skeleton" style={{ height: '20px', width: '100px' }}></div></td>
                    <td><div className="skeleton" style={{ height: '28px', width: '90px', borderRadius: '20px' }}></div></td>
                  </tr>
                ))
              ) : inventoryData.length > 0 ? (
                inventoryData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.week}</td>
                    <td>{row.type}</td>
                    <td className="font-mono">{row.amount}</td>
                    <td>
                      <span className={`status-badge ${row.status}`}>
                        {row.status === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {row.change}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>No inventory data available at the moment.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="table-footer">
            <p>* Data is scraped live from recent economic reports.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChain;
