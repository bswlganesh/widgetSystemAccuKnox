import React from 'react'
import './Dashboard.css';
import Category from './Category';


const categories = [
  {
    id: 1,
    name: 'Cloud Security',
    widgets: [
      { id: 'w1', title: 'Misconfigurations', count: 125 },
      { id: 'w2', title: 'Exposed Secrets', count: 15 },
    ],
  },
  {
    id: 2,
    name: 'Application Security',
    widgets: [
      { id: 'w3', title: 'Vulnerabilities', count: 340 },
      { id: 'w4', title: 'Open Source Licenses', count: 89 },
    ],
  },
  {
    id: 3,
    name: 'Infrastructure as Code',
    widgets: [],
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">CNAPP Dashboard</h1>
        <div className="dashboard-controls">
          <button className="btn" >Add Widget +</button>
        </div>
      </header>
      <main className="dashboard-grid">
        {categories.map(category => (
          <Category key={category.id} category={category} />
        ))}
      </main>



    </div>
    
  )
}
