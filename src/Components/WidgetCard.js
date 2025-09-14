import React from 'react';
import './WidgetCard.css';

const WidgetCard = ({ widget, onRemove }) => {
  return (
    <div className="widget-card">
      <button className="remove-widget-btn" onClick={onRemove}>&times;</button>
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
    </div>
  );
};

export default WidgetCard;