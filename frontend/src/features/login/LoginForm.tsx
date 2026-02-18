import React, { useState } from 'react';
import { loginService, LoginCredentials } from '../../services/login.service';
import './LoginForm.css';

/**
 * Login Form Component - Vertical Slice
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * This is the main login form component. Students should:
 * 
 * 1. Complete the form submission logic:
 *    - Call loginService.login() with credentials
 *    - Handle successful login (redirect, show success message)
 *    - Handle errors (display error message)
 * 
 * 2. Add form validation:
 *    - Email format validation
 *    - Password minimum length
 *    - Required field validation
 *    - Display validation errors
 * 
 * 3. Improve user experience:
 *    - Add loading state during login
 *    - Disable submit button while loading
 *    - Show password toggle
 *    - Add "Remember Me" checkbox
 * 
 * 4. Navigation:
 *    - Redirect to dashboard/home after successful login
 *    - Use react-router-dom's useNavigate hook
 * 
 * BONUS CHALLENGES:
 * - Add form animation
 * - Implement "Forgot Password" link
 * - Add social login buttons
 * - Implement form accessibility (ARIA labels)
 */

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: Students add useNavigate hook from react-router-dom
  // const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // TODO: Students implement form validation
    // if (!credentials.email || !credentials.password) {
    //   setError('Please fill in all fields');
    //   return;
    // }

    setLoading(true);
    setError('');

    try {
      // TODO: Students implement login logic
      // const response = await loginService.login(credentials);
      // console.log('Login successful:', response);
      // navigate('/dashboard'); // or wherever you want to redirect
      
      // Temporary message for students
      setError('Login functionality not implemented yet. Please implement it!');
    } catch (err: any) {
      // TODO: Students handle errors appropriately
      // setError(err.response?.data?.message || 'Login failed. Please try again.');
      setError('An error occurred. Please implement error handling.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* TODO: Students can add additional links */}
        {/* <div className="login-footer">
          <a href="/forgot-password">Forgot password?</a>
          <a href="/register">Create an account</a>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
