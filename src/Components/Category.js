import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';
import { useDashboard } from './DashboardContext';
import './Category.css';

const Category = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWidget, removeWidget } = useDashboard();

  return (
    <section className="category">
      {/* Category Header */}
      <div className="category-header">
        <h2 className="category-title">{category.title}</h2>
        <button className="add-widget-btn" onClick={() => setIsModalOpen(true)}>
          ＋ Add / Remove Widget
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="widgets-grid">
        {category.widgets.map(widget => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={() => removeWidget(category.id, widget.id)}
          />
        ))}

        {/* Add Widget Placeholder Card */}
        <div
          className="widget-card add-widget-card"
          onClick={() => setIsModalOpen(true)}
        >
          ＋ Add Widget
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddWidgetModal
          category={category}
          onClose={() => setIsModalOpen(false)}
          onAddWidget={addWidget}
          onRemoveWidget={removeWidget}
        />
      )}
    </section>
  );
};

export default Category;
