import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';
import CategoryModal from './CategoryModal'; // New Modal
import { useDashboard } from './DashboardContext';
import './Category.css';

const Category = ({ category }) => {
  const [isWidgetModalOpen, setisWidgetModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { addWidget, removeWidget, removeCategory, updateCategoryName } =
    useDashboard();

  const handleRemoveCategory = () => {
    if (window.confirm(`Are you sure you want to delete the "${category.title}" category?`)) {
      removeCategory(category.id);
    }
  };

  const handleUpdateCategory = (newName) => {
    updateCategoryName(category.id, newName);
    setIsCategoryModalOpen(false);
  };

  return (
    <section className="category">
      {/* Category Header */}
      <div className="category-header">
        <h2 className="category-title">{category.title}</h2>
        <div className="category-controls">
          <button className="category-btn" onClick={() => setIsCategoryModalOpen(true)}>
            Edit
          </button>
          <button className="category-btn danger" onClick={handleRemoveCategory}>
            Remove
          </button>
          <button
            className="add-widget-btn"
            onClick={() => setisWidgetModalOpen(true)}
          >
            ＋ Add / Remove Widget
          </button>
        </div>
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
          onClick={() => setisWidgetModalOpen(true)}
        >
          ＋ Add Widget
        </div>
      </div>

      {/* Widget Modal */}
      {isWidgetModalOpen && (
        <AddWidgetModal
          category={category}
          onClose={() => setisWidgetModalOpen(false)}
          onAddWidget={addWidget}
          onRemoveWidget={removeWidget}
        />
      )}

      {/* Category Edit Modal */}
      {isCategoryModalOpen && (
        <CategoryModal
          category={category}
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={handleUpdateCategory}
        />
      )}
    </section>
  );
};

export default Category;
