import React, { createContext, useReducer, useContext, useEffect } from 'react';

const DashboardContext = createContext();

const LOCAL_STORAGE_KEY = 'dashboardState';

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
  const [state, dispatch] = useReducer(dashboardReducer, initialData, (defaultInitialData) => {
    try {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedState ? JSON.parse(storedState) : defaultInitialData;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return defaultInitialData;
    }
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [state]);

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