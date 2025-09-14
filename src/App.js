import React from 'react';
import { DashboardProvider } from './Components/DashboardContext';
import Dashboard from './Components/Dashboard';
import initialData from './json/dashboard-data.json';

export default function App() {
  return (
    <DashboardProvider initialData={initialData}>
      <Dashboard />
    </DashboardProvider>
  );
}
