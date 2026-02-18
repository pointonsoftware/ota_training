import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/login/LoginForm';
import './App.css';

/**
 * Main App Component
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * 1. Configure routing:
 *    - Add routes for login, dashboard, profile, etc.
 *    - Implement protected routes that require authentication
 *    - Add 404 page
 * 
 * 2. Add authentication context:
 *    - Create AuthContext to manage auth state globally
 *    - Provide user info and auth methods to all components
 * 
 * 3. Implement route guards:
 *    - Redirect to login if not authenticated
 *    - Redirect to dashboard if already logged in
 * 
 * Example protected route:
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * 
 * BONUS CHALLENGES:
 * - Add layout components (header, sidebar, footer)
 * - Implement lazy loading for routes
 * - Add loading and error boundaries
 */

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          
          {/* TODO: Students add more routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          
          {/* Default route - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
