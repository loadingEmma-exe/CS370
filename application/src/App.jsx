//import { useState } from 'react'
import './App.css'

function App() {
  
  return(
    <>

    <div className="container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>My App</h2>
        </div>

        <ul className="menu">
          <li>Dashboard</li>
          <li>Users</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Right Section */}
      <div className="main-content">

        {/* Navbar */}
        <nav className="navbar">
          <h1>Dashboard</h1>

          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
          </div>
        </nav>

      {/* Content Area */}
        <main className="content">
          <div className="card">
            <h2>Welcome</h2>
            <p>
              This is the main content area.
            </p>
          </div>

          <div className="card">
            <h2>Example Section</h2>
            <p>
              Add charts, tables, forms, or anything else here.
            </p>
          </div>
        </main>

      </div>
    </div>
    </>
  );
}

export default App
