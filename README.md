# OTA Training - Vertical Slice Login Feature

This repository contains a training assignment for implementing a **Vertical Slice Login Feature** that connects a React frontend to a NestJS backend.

## 🎯 Learning Objectives

By completing this assignment, students will learn:
- **Vertical Slice Architecture**: Organizing code by feature rather than by technical layer
- **Full-stack development**: Connecting React frontend to NestJS backend
- **Authentication**: Implementing JWT-based authentication
- **TypeScript**: Using TypeScript in both frontend and backend
- **API Design**: Creating RESTful endpoints
- **Security**: Password hashing, token management, and secure authentication

## 📁 Project Structure

```
ota_training/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── features/
│   │   │   └── login/         # Login Feature (Vertical Slice)
│   │   │       ├── dto/       # Data Transfer Objects
│   │   │       ├── login.controller.ts
│   │   │       ├── login.service.ts
│   │   │       └── login.module.ts
│   │   ├── common/
│   │   │   └── guards/        # Authentication Guards
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── features/
│   │   │   └── login/         # Login Feature (Vertical Slice)
│   │   │       ├── LoginForm.tsx
│   │   │       └── LoginForm.css
│   │   ├── services/          # API Services
│   │   │   ├── api.service.ts
│   │   │   └── login.service.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Basic knowledge of TypeScript
- Basic knowledge of React and NestJS
- Understanding of REST APIs and JWT authentication

### Installation

#### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend will start on `http://localhost:3001`

#### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## 📝 Assignment Instructions

### Part 1: Backend Implementation (NestJS)

#### Step 1: Implement the Login Service

Open `backend/src/features/login/login.service.ts` and implement:

1. **Mock User Data**: Create an array of mock users with hashed passwords
   ```typescript
   const mockUsers = [
     {
       id: '1',
       email: 'student@example.com',
       password: await bcrypt.hash('password123', 10),
       name: 'Test Student'
     }
   ];
   ```

2. **`login()` method**: 
   - Find user by email
   - Validate password using bcrypt
   - Generate JWT token
   - Return user data and token

3. **Helper methods**: Implement `findUserByEmail()`, `validatePassword()`, and `generateToken()`

#### Step 2: Configure JWT Module

Open `backend/src/features/login/login.module.ts` and:

1. Import `JwtModule` from `@nestjs/jwt`
2. Configure JWT with secret key and expiration
   ```typescript
   JwtModule.register({
     secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
     signOptions: { expiresIn: '1h' },
   })
   ```

#### Step 3: Implement JWT Auth Guard (Optional)

Open `backend/src/common/guards/jwt-auth.guard.ts` and implement token validation.

#### Step 4: Test the Backend

Use Postman or curl to test:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

Expected response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "student@example.com",
    "name": "Test Student"
  }
}
```

### Part 2: Frontend Implementation (React)

#### Step 1: Implement the Login Service

Open `frontend/src/services/login.service.ts` and implement:

1. **`login()` method**:
   - Make POST request to `/auth/login`
   - Store token in localStorage
   - Store user information
   - Return response data

2. **`logout()` method**: Clear stored credentials

3. **`isAuthenticated()` method**: Check if token exists

4. **`getCurrentUser()` method**: Retrieve user from localStorage

#### Step 2: Complete the Login Form

Open `frontend/src/features/login/LoginForm.tsx` and:

1. **Form submission**: Call `loginService.login()` with credentials
2. **Error handling**: Display error messages to users
3. **Navigation**: Redirect to dashboard after successful login
4. **Validation**: Add client-side validation

#### Step 3: Add API Interceptors

Open `frontend/src/services/api.service.ts` and:

1. **Request interceptor**: Attach JWT token to Authorization header
2. **Response interceptor**: Handle 401 errors and redirect to login

#### Step 4: Test the Frontend

1. Start the frontend: `npm start`
2. Navigate to `http://localhost:3000/login`
3. Try logging in with: `student@example.com` / `password123`
4. Check browser console and network tab for requests

### Part 3: Integration & Testing

1. **Start both servers**: Backend (port 3001) and Frontend (port 3000)
2. **Test the login flow**: Use the web interface to log in
3. **Verify token storage**: Check localStorage in browser DevTools
4. **Test error cases**: Try invalid credentials, empty fields, etc.

## 🎓 Bonus Challenges

### Security Enhancements
- [ ] Implement password strength requirements
- [ ] Add rate limiting to prevent brute force attacks
- [ ] Implement token refresh mechanism
- [ ] Add CSRF protection

### User Experience
- [ ] Add "Remember Me" functionality
- [ ] Implement "Forgot Password" flow
- [ ] Add social login (Google, GitHub)
- [ ] Show password strength indicator

### Code Quality
- [ ] Write unit tests for services
- [ ] Write integration tests for API endpoints
- [ ] Add E2E tests using Cypress
- [ ] Implement proper error logging

### Advanced Features
- [ ] Add role-based authorization
- [ ] Implement multi-factor authentication
- [ ] Add user profile page
- [ ] Create user dashboard

## 📚 Resources

### NestJS Documentation
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [JWT Strategy](https://docs.nestjs.com/security/authentication#jwt-functionality)
- [Guards](https://docs.nestjs.com/guards)

### React Documentation
- [React Hooks](https://react.dev/reference/react)
- [React Router](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

### Security Best Practices
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 🔍 What is Vertical Slice Architecture?

Vertical Slice Architecture organizes code by **feature** rather than by technical layer. Instead of having separate folders for controllers, services, and models, we group everything related to a feature together.

### Traditional Layered Architecture:
```
src/
├── controllers/
├── services/
├── models/
└── dtos/
```

### Vertical Slice Architecture:
```
src/
└── features/
    ├── login/
    │   ├── login.controller.ts
    │   ├── login.service.ts
    │   ├── login.module.ts
    │   └── dto/
    └── user-profile/
        ├── user-profile.controller.ts
        ├── user-profile.service.ts
        └── ...
```

### Benefits:
- **Easy to navigate**: Everything for a feature is in one place
- **Easy to test**: Test all aspects of a feature together
- **Easy to understand**: Clear boundaries between features
- **Easy to modify**: Changes to one feature don't affect others

## ✅ Submission Checklist

Before submitting, ensure you have:

- [ ] Implemented backend login service with JWT
- [ ] Implemented frontend login form and service
- [ ] Successfully tested login flow end-to-end
- [ ] Handled errors appropriately
- [ ] Added comments to explain your code
- [ ] Tested with invalid credentials
- [ ] Verified token storage in browser
- [ ] Code follows TypeScript best practices

## 🤝 Need Help?

- Review the inline comments in the code files
- Check the console for error messages
- Use browser DevTools to inspect network requests
- Review NestJS and React documentation
- Ask your instructor for guidance

## 📄 License

This is a training repository for educational purposes.

---

**Happy Coding! 🚀**
