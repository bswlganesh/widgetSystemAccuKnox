import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import Category from './Category';
import CategoryModal from './CategoryModal'; // New Modal for categories
import AddWidgetModal from './AddWidgetModal';
import './Dashboard.css';

const Dashboard = () => {
  const { categories, addWidget, removeWidget, addCategory } = useDashboard();
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleAddCategory = (categoryName) => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      title: categoryName,
      widgets: [],
    };
    addCategory(newCategory);
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">WIDGET DASHBOARD</h1>
        <div className="dashboard-controls">
          <button className="btn" onClick={() => setIsCategoryModalOpen(true)}>
            Add Category +
          </button>
          <button className="btn" onClick={() => setIsWidgetModalOpen(true)}>
            Add Widget +
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </main>

      {isCategoryModalOpen && (
        <CategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={handleAddCategory}
        />
      )}

      {isWidgetModalOpen && (
        <AddWidgetModal
          // No specific category is passed initially
          onClose={() => setIsWidgetModalOpen(false)}
          onAddWidget={addWidget} // Pass the context functions directly
          onRemoveWidget={removeWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;
