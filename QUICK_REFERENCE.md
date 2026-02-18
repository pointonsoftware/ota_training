# Quick Reference Guide

## Essential Commands

### Backend (NestJS)
```bash
cd backend
npm install                # Install dependencies
npm run start:dev          # Start dev server (auto-reload)
npm run build              # Build for production
npm test                   # Run tests
```

### Frontend (React)
```bash
cd frontend
npm install                # Install dependencies
npm start                  # Start dev server (auto-reload)
npm run build              # Build for production
npm test                   # Run tests
```

## Files Students Need to Implement

### Backend - Priority Order

1. **backend/src/features/login/login.service.ts**
   - [ ] Implement `login()` method
   - [ ] Create mock user data with bcrypt hashed passwords
   - [ ] Implement `findUserByEmail()` helper
   - [ ] Implement `validatePassword()` with bcrypt
   - [ ] Implement `generateToken()` with JWT

2. **backend/src/features/login/login.module.ts**
   - [ ] Import and configure `JwtModule`
   - [ ] Add JWT secret and expiration settings

3. **backend/src/common/guards/jwt-auth.guard.ts** (Optional)
   - [ ] Implement token validation in `canActivate()`
   - [ ] Extract and verify JWT from Authorization header

### Frontend - Priority Order

1. **frontend/src/services/login.service.ts**
   - [ ] Implement `login()` method
   - [ ] Store token in localStorage
   - [ ] Store user data
   - [ ] Implement `logout()` method
   - [ ] Implement `isAuthenticated()` check
   - [ ] Implement `getCurrentUser()` retrieval

2. **frontend/src/features/login/LoginForm.tsx**
   - [ ] Complete `handleSubmit()` function
   - [ ] Call `loginService.login()`
   - [ ] Handle success (redirect to dashboard)
   - [ ] Handle errors (display message)
   - [ ] Add form validation

3. **frontend/src/services/api.service.ts**
   - [ ] Add token to Authorization header in request interceptor
   - [ ] Handle 401 errors in response interceptor

## Key Concepts to Understand

### 1. JWT (JSON Web Token)
```typescript
// Token structure: header.payload.signature
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U"

// Token contains:
// - User ID
// - Email
// - Expiration time
// - Signature (for verification)
```

### 2. Bcrypt Password Hashing
```typescript
// Never store passwords in plain text!
const plainPassword = "password123"
const hashedPassword = await bcrypt.hash(plainPassword, 10) // 10 salt rounds
// Result: $2b$10$N9qo8uLOickgx2ZMRZoMye...

// To verify:
const isValid = await bcrypt.compare(plainPassword, hashedPassword)
```

### 3. HTTP Headers
```typescript
// Request with token
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'Content-Type': 'application/json'
}
```

### 4. LocalStorage
```typescript
// Store
localStorage.setItem('accessToken', token)
localStorage.setItem('user', JSON.stringify(userData))

// Retrieve
const token = localStorage.getItem('accessToken')
const user = JSON.parse(localStorage.getItem('user'))

// Remove
localStorage.removeItem('accessToken')
localStorage.clear() // Remove everything
```

## Testing Checklist

### Manual Testing

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Login form displays correctly
- [ ] Can submit form with email and password
- [ ] Successful login stores token
- [ ] Successful login redirects user
- [ ] Invalid credentials show error
- [ ] Empty fields show validation error
- [ ] Token is included in authenticated requests
- [ ] Logout clears stored data

### curl Testing

```bash
# Test login endpoint
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'

# Expected success response:
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "1",
    "email": "student@example.com",
    "name": "Test Student"
  }
}

# Test with invalid credentials
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpassword"
  }'

# Expected error response:
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

## Common Code Patterns

### NestJS Service Implementation
```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // 1. Find user
    const user = await this.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Validate password
    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    // 4. Return response
    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
```

### React Component Implementation
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await loginService.login(credentials);
    // Success! Redirect or show message
    navigate('/dashboard');
  } catch (err: any) {
    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};
```

### Axios Request with Token
```typescript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Debugging Tips

### Backend Debugging
```bash
# Check if server is running
curl http://localhost:3001/api/auth/login

# Check logs in terminal
# Look for error messages and stack traces

# Add console.log in your code
console.log('User found:', user);
console.log('Token generated:', token);
```

### Frontend Debugging
```javascript
// Open browser DevTools (F12)
// Go to Console tab

// Check what's being sent
console.log('Submitting credentials:', credentials);

// Check response
console.log('Login response:', response);

// Check localStorage
console.log('Token:', localStorage.getItem('accessToken'));

// Go to Network tab
// Look for the POST request to /api/auth/login
// Check request payload and response
```

## Error Messages and Solutions

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| `Cannot find module` | Missing dependency | Run `npm install` |
| `Port already in use` | Port is occupied | Change port or kill process |
| `CORS error` | Backend not configured | Check CORS in main.ts |
| `401 Unauthorized` | Invalid credentials | Check email/password |
| `Cannot read property of undefined` | Null/undefined value | Add null checks |
| `Module not found: '@nestjs/jwt'` | Module not installed | `npm install @nestjs/jwt` |

## Environment Variables

### Backend .env
```env
JWT_SECRET=your-secret-key-at-least-32-characters-long
JWT_EXPIRATION=1h
PORT=3001
NODE_ENV=development
```

### Frontend .env
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Helpful npm Packages

Already included in package.json:

**Backend:**
- `@nestjs/jwt` - JWT token generation
- `@nestjs/passport` - Authentication strategies
- `bcrypt` - Password hashing
- `class-validator` - DTO validation

**Frontend:**
- `react-router-dom` - Routing
- `axios` - HTTP client

## Resources Links

- [NestJS Docs](https://docs.nestjs.com/)
- [React Docs](https://react.dev/)
- [JWT.io](https://jwt.io/) - Decode JWT tokens
- [Bcrypt Calculator](https://bcrypt-generator.com/) - Test bcrypt hashing
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - Test APIs in VS Code

## Next Steps After Completion

Once you complete the basic implementation:

1. **Add unit tests**
2. **Implement user registration**
3. **Add password reset flow**
4. **Create protected dashboard page**
5. **Add user profile management**
6. **Implement role-based access control**
7. **Add refresh token mechanism**
8. **Implement social login**

---

**Keep this guide handy while implementing! Good luck! 🚀**
