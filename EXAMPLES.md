# Implementation Examples

This file contains example implementations for reference. Students should try implementing on their own first before looking at these examples.

## ⚠️ Important Note

These are **reference examples** to help you if you get stuck. Try to implement the features yourself first! Learning happens through doing, not just copying.

---

## Backend Examples

### Example 1: Login Service with Mock Data

```typescript
// backend/src/features/login/login.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class LoginService {
  // Mock users - In production, this would come from a database
  private readonly mockUsers = [
    {
      id: '1',
      email: 'student@example.com',
      // This is 'password123' hashed with bcrypt
      password: '$2b$10$YourHashedPasswordHere',
      name: 'Test Student',
    },
    {
      id: '2',
      email: 'admin@example.com',
      password: '$2b$10$AnotherHashedPasswordHere',
      name: 'Admin User',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // Step 1: Find user by email
    const user = await this.findUserByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Step 2: Validate password
    const isPasswordValid = await this.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Step 3: Generate JWT token
    const token = await this.generateToken(user.id, user.email);

    // Step 4: Return response (without password!)
    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  private async findUserByEmail(email: string): Promise<any> {
    // In production, this would be a database query
    // Example: return await this.userRepository.findOne({ where: { email } });
    return this.mockUsers.find(user => user.email === email);
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  private async generateToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email: email };
    return this.jwtService.sign(payload);
  }
}
```

### Example 2: Login Module Configuration

```typescript
// backend/src/features/login/login.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { 
        expiresIn: process.env.JWT_EXPIRATION || '1h' 
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
```

### Example 3: JWT Auth Guard Implementation

```typescript
// backend/src/common/guards/jwt-auth.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    // Bearer token format: "Bearer <token>"
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      // Verify and decode the token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      });

      // Attach user info to request object
      request.user = payload;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
```

### Example 4: Creating Hashed Passwords for Mock Users

```typescript
// Helper script to generate hashed passwords
// Create: backend/src/scripts/generate-hash.ts

import * as bcrypt from 'bcrypt';

async function generateHash(password: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
}

// Generate hashes
generateHash('password123');
generateHash('admin123');

// Run with: npx ts-node src/scripts/generate-hash.ts
```

---

## Frontend Examples

### Example 1: Login Service Implementation

```typescript
// frontend/src/services/login.service.ts

import apiClient from './api.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const loginService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        credentials
      );

      // Store token in localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      
      // Store user info
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },

  getCurrentUser: (): any => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },
};
```

### Example 2: API Service with Interceptors

```typescript
// frontend/src/services/api.service.ts

import axios from 'axios';
import { loginService } from './login.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = loginService.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      loginService.logout();
      window.location.href = '/login';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### Example 3: Login Form Component

```typescript
// frontend/src/features/login/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService, LoginCredentials } from '../../services/login.service';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call login service
      const response = await loginService.login(credentials);
      
      console.log('Login successful:', response);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      // Handle errors
      const errorMessage = 
        err.response?.data?.message || 
        'Login failed. Please check your credentials.';
      
      setError(errorMessage);
      console.error('Login error:', err);
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
              disabled={loading}
              autoComplete="email"
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
              disabled={loading}
              autoComplete="current-password"
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
      </div>
    </div>
  );
};

export default LoginForm;
```

### Example 4: Protected Route Component

```typescript
// frontend/src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { loginService } from '../services/login.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = loginService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

### Example 5: Dashboard Component

```typescript
// frontend/src/features/dashboard/Dashboard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/login.service';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = loginService.getCurrentUser();

  const handleLogout = () => {
    loginService.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="user-info">
        <p>Welcome, {user?.name}!</p>
        <p>Email: {user?.email}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
```

### Example 6: Updated App.tsx with Routes

```typescript
// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/login/LoginForm';
import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { loginService } from './services/login.service';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              loginService.isAuthenticated() ? 
                <Navigate to="/dashboard" replace /> : 
                <LoginForm />
            } 
          />
          
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Default route */}
          <Route 
            path="/" 
            element={
              <Navigate 
                to={loginService.isAuthenticated() ? "/dashboard" : "/login"} 
                replace 
              />
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

---

## Testing Examples

### Backend Unit Test Example

```typescript
// backend/src/features/login/login.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';

describe('LoginService', () => {
  let service: LoginService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return token and user on successful login', async () => {
      const loginDto = {
        email: 'student@example.com',
        password: 'password123',
      };

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe(loginDto.email);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const loginDto = {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      };

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
```

---

## Remember

- These are **reference implementations**
- Try to code it yourself first
- Understand each line - don't just copy
- Modify to fit your needs
- Add your own improvements
- Learn from mistakes - they're valuable!

**Good luck with your implementation! 🚀**
