import React from 'react';

const RichTextRenderer = ({ content, loading }) => {
  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '20px', width: '100%', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '20px', width: '100%', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '20px', width: '90%', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '20px', width: '95%', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '12px' }}></div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <>
      {content.split('\n').map((part, i) => (
        part.trim() ? <p key={i} style={{ marginBottom: '16px' }}>{part}</p> : null
      ))}
    </>
  );
};

export default RichTextRenderer;
