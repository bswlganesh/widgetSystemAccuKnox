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
    case 'ADD_CATEGORY': {
      const { newCategory } = action.payload;
      return {
        ...state,
        categories: [...state.categories, newCategory],
      };
    }
    case 'REMOVE_CATEGORY': {
      const { categoryId } = action.payload;
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== categoryId
        ),
      };
    }
    case 'UPDATE_CATEGORY_NAME': {
      const { categoryId, newName } = action.payload;
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === categoryId ? { ...category, title: newName } : category
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

  const addCategory = (newCategory) => {
    dispatch({ type: 'ADD_CATEGORY', payload: { newCategory } });
  };

  const removeCategory = (categoryId) => {
    dispatch({ type: 'REMOVE_CATEGORY', payload: { categoryId } });
  };

  const updateCategoryName = (categoryId, newName) => {
    dispatch({ type: 'UPDATE_CATEGORY_NAME', payload: { categoryId, newName } });
  };

  return (
    <DashboardContext.Provider
      value={{
        ...state, addWidget, removeWidget, addCategory, removeCategory, updateCategoryName
      }}
    >
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