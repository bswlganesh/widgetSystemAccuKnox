import React, { useState, useEffect } from 'react';
import './AddWidgetModal.css'; // Reusing styles for consistency

const CategoryModal = ({ category, onClose, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.title);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a category name.');
      return;
    }
    onSave(name);
  };

  const modalTitle = category ? 'Edit Category' : 'Add New Category';
  const buttonText = category ? 'Save Changes' : 'Add Category';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content slide-in"
        style={{ width: '400px', height: 'auto', top: '20vh', right: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{modalTitle}</h2>
          <button className="close-modal-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p className="modal-subtitle">
              {category
                ? `Enter a new name for the "${category.title}" category.`
                : 'Enter the name for the new category.'}
            </p>
            <input
              type="text"
              placeholder="Category Name"
              className="search-bar" // Reusing style
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="confirm-btn">{buttonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;