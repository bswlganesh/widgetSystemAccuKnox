import React, { useState, useMemo } from "react";
import "./AddWidgetModal.css";
import { useDashboard } from "./DashboardContext";

const AddWidgetModal = ({ category, onClose, onAddWidget, onRemoveWidget }) => {
  const { categories } = useDashboard();
  // If a category is passed directly, use it. Otherwise, start with null.
  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [activeTab, setActiveTab] = useState("Add/Remove");
  const [searchQuery, setSearchQuery] = useState("");
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");

  // Track existing widgets
  const existingWidgetIds = useMemo(() => {
    if (!selectedCategory) return new Set();
    return new Set(selectedCategory.widgets.map((w) => w.id));
  }, [selectedCategory]);

  const handleToggleWidget = (widgetId, isChecked) => {
    if (!isChecked) {
      // Ensure we have a category before trying to remove
      if (selectedCategory) {
        onRemoveWidget(selectedCategory.id, widgetId);
      }
    }
  };

  const handleAddWidget = (e) => {
    e.preventDefault();
    if (!newWidgetName.trim() || !newWidgetText.trim()) {
      alert("Please enter both name and text.");
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}`,
      name: newWidgetName,
      text: newWidgetText,
    };

    onAddWidget(selectedCategory.id, newWidget);
    setNewWidgetName("");
    setNewWidgetText("");
  };

  const filteredWidgets = useMemo(() => {
    if (!selectedCategory) return [];
    return selectedCategory.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  // If no category is selected yet (modal opened from dashboard header)
  if (!selectedCategory) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content slide-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Select a Category</h2>
            <button className="close-modal-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p className="modal-subtitle">
              Choose which category to add or remove widgets from.
            </p>
            <ul className="category-selection-list">
              {categories.map((cat) => (
                <li key={cat.id} onClick={() => setSelectedCategory(cat)}>
                  {cat.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="modal-header">
          <h2>Manage Widgets: {selectedCategory.title}</h2>
          <button className="close-modal-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* TABS */}
        <div className="modal-tabs">
          {["Add/Remove", "Create New"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="modal-body">
          {activeTab === "Add/Remove" && (
            <>
              <p className="modal-subtitle">
                Uncheck a widget to remove it from the dashboard.
              </p>
              <input
                type="search"
                placeholder="Search widgets..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ul className="widget-list">
                {filteredWidgets.map((widget) => (
                  <li key={widget.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={existingWidgetIds.has(widget.id)}
                        onChange={(e) =>
                          handleToggleWidget(widget.id, e.target.checked)
                        }
                      />
                      {widget.name}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "Create New" && (
            <>
              <p className="modal-subtitle">
                Create a brand new widget for this category.
              </p>
              <form className="add-widget-form" onSubmit={handleAddWidget}>
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Widget Text"
                  value={newWidgetText}
                  onChange={(e) => setNewWidgetText(e.target.value)}
                  required
                ></textarea>
                <div className="form-actions">
                  <button type="submit" className="confirm-small">
                    Add Widget
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
