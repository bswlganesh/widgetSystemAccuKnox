import React, { useState } from 'react';

import './Category.css';

const Category = ({ category }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

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
      </div>
      </section>
  );
};

export default Category;
