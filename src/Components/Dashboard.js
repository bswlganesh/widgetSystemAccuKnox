import React from 'react'
import './Dashboard.css';


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
       {/* map some widget catogories */}
      </main>
    </div>
    
  )
}
