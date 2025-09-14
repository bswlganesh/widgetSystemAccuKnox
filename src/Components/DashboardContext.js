import React, { createContext, useReducer, useContext } from 'react';

const DashboardContext = createContext();

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WIDGET': {
      const { categoryId, widget } = action.payload;
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === categoryId
            ? { ...category, widgets: [...category.widgets, widget] }
            : category
        ),
      };
    }
    case 'REMOVE_WIDGET': {
      const { categoryId, widgetId } = action.payload;
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === categoryId
            ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
            : category
        ),
      };
    }
    default:
      return state;
  }
};

export const DashboardProvider = ({ children, initialData }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialData);

  const addWidget = (categoryId, widget) => {
    dispatch({ type: 'ADD_WIDGET', payload: { categoryId, widget } });
  };

  const removeWidget = (categoryId, widgetId) => {
    dispatch({ type: 'REMOVE_WIDGET', payload: { categoryId, widgetId } });
  };

  return (
    <DashboardContext.Provider value={{ ...state, addWidget, removeWidget }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};