import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import Category from './Category';
import AddWidgetModal from './AddWidgetModal';
import './Dashboard.css';

const Dashboard = () => {
  const { categories, addWidget, removeWidget } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">WIDGET DASHBOARD</h1>
        <div className="dashboard-controls">
          <button className="btn" onClick={() => setIsModalOpen(true)}>Add Widget +</button>
        </div>
      </header>

      <main className="dashboard-grid">
        {categories.map(category => (
          <Category key={category.id} category={category} />
        ))}
      </main>

      {isModalOpen && (
        <AddWidgetModal
          // No specific category is passed initially
          onClose={() => setIsModalOpen(false)}
          onAddWidget={addWidget} // Pass the context functions directly
          onRemoveWidget={removeWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;
