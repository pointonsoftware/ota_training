# Architecture Documentation

## Vertical Slice Architecture

### Overview

This project implements the **Vertical Slice Architecture** pattern, which organizes code by features (use cases) rather than technical layers.

### Why Vertical Slices?

Traditional layered architecture separates code by technical concerns:
- Controllers
- Services
- Repositories
- DTOs

This creates dependencies across layers and makes it harder to:
- Understand a complete feature
- Test a complete workflow
- Make changes to a feature
- Deploy individual features

### Vertical Slice Benefits

1. **High Cohesion**: All code for a feature is together
2. **Low Coupling**: Features are independent
3. **Easy Testing**: Test complete workflows
4. **Easy Navigation**: Find everything for a feature in one place
5. **Parallel Development**: Teams can work on different slices
6. **Easy Deployment**: Deploy features independently (with proper architecture)

## Login Feature Structure

### Backend (NestJS)

```
backend/src/features/login/
├── dto/
│   ├── login.dto.ts              # Request validation
│   └── login-response.dto.ts     # Response structure
├── login.controller.ts            # HTTP endpoints
├── login.service.ts               # Business logic
└── login.module.ts                # Feature module
```

**Flow:**
1. Client sends POST to `/api/auth/login`
2. `LoginController` receives request
3. Request body validated against `LoginDto`
4. `LoginService.login()` handles business logic:
   - Finds user by email
   - Validates password with bcrypt
   - Generates JWT token
   - Returns user info and token
5. Controller sends response to client

### Frontend (React)

```
frontend/src/features/login/
├── LoginForm.tsx                  # UI Component
└── LoginForm.css                  # Styles

frontend/src/services/
├── api.service.ts                 # HTTP client configuration
└── login.service.ts               # Login API calls
```

**Flow:**
1. User fills login form
2. `LoginForm` component calls `loginService.login()`
3. `loginService` uses `apiClient` to POST to backend
4. On success:
   - Store token in localStorage
   - Store user info in localStorage
   - Redirect to dashboard
5. On error:
   - Display error message

## Authentication Flow

### Login Sequence

```
┌────────┐         ┌──────────┐         ┌─────────┐
│ Client │         │ Frontend │         │ Backend │
└───┬────┘         └────┬─────┘         └────┬────┘
    │                   │                    │
    │ 1. Enter credentials                   │
    │──────────────────>│                    │
    │                   │                    │
    │                   │ 2. POST /auth/login│
    │                   │───────────────────>│
    │                   │                    │
    │                   │  3. Validate email │
    │                   │       & password   │
    │                   │<───────────────────│
    │                   │                    │
    │                   │ 4. Generate JWT    │
    │                   │<───────────────────│
    │                   │                    │
    │ 5. Store token    │                    │
    │    in localStorage│                    │
    │<──────────────────│                    │
    │                   │                    │
    │ 6. Redirect to    │                    │
    │    dashboard      │                    │
    │<──────────────────│                    │
```

### Authenticated Request Sequence

```
┌────────┐         ┌──────────┐         ┌─────────┐
│ Client │         │ Frontend │         │ Backend │
└───┬────┘         └────┬─────┘         └────┬────┘
    │                   │                    │
    │ 1. Request protected resource          │
    │──────────────────>│                    │
    │                   │                    │
    │                   │ 2. GET /api/profile│
    │                   │    Authorization:  │
    │                   │    Bearer <token>  │
    │                   │───────────────────>│
    │                   │                    │
    │                   │ 3. Validate JWT    │
    │                   │<───────────────────│
    │                   │                    │
    │                   │ 4. Return data     │
    │                   │<───────────────────│
    │                   │                    │
    │ 5. Display data   │                    │
    │<──────────────────│                    │
```

## Security Considerations

### Password Handling

1. **Never store plain text passwords**
2. Use bcrypt with proper salt rounds (10+)
3. Validate password strength on both frontend and backend
4. Implement rate limiting to prevent brute force

### JWT Tokens

1. **Use environment variables for secrets**
2. Set appropriate expiration times (1 hour for access tokens)
3. Store securely (httpOnly cookies preferred, localStorage acceptable for training)
4. Implement token refresh for better UX
5. Validate tokens on every protected endpoint

### CORS Configuration

1. Configure allowed origins explicitly
2. Enable credentials for cookie-based auth
3. Restrict methods and headers as needed

### Input Validation

1. Validate on both frontend (UX) and backend (security)
2. Use class-validator decorators in DTOs
3. Sanitize inputs to prevent XSS and SQL injection

## Extension Points

### Adding New Features

To add a new feature (e.g., user profile):

1. Create feature directory:
   ```
   backend/src/features/user-profile/
   ```

2. Create necessary files:
   - `user-profile.controller.ts`
   - `user-profile.service.ts`
   - `user-profile.module.ts`
   - `dto/` directory

3. Import feature module in `app.module.ts`

### Adding Protected Routes

1. Use `JwtAuthGuard` in controller:
   ```typescript
   @UseGuards(JwtAuthGuard)
   @Get('profile')
   getProfile(@Request() req) {
     return req.user;
   }
   ```

2. Guard validates token and attaches user to request

### Adding Role-Based Authorization

1. Create roles enum
2. Create roles decorator
3. Create roles guard
4. Use both guards together:
   ```typescript
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
   @Delete('users/:id')
   deleteUser(@Param('id') id: string) {
     // Only admins can access
   }
   ```

## Best Practices

### Backend

1. **Use DTOs** for all request/response data
2. **Use pipes** for validation and transformation
3. **Use guards** for authentication and authorization
4. **Use interceptors** for logging and response transformation
5. **Use exceptions** for error handling
6. **Write tests** for each slice

### Frontend

1. **Separate concerns**: Components, services, and state
2. **Use TypeScript** for type safety
3. **Handle loading states** for better UX
4. **Handle errors gracefully** with user-friendly messages
5. **Validate inputs** before sending to backend
6. **Use environment variables** for configuration
7. **Write tests** for components and services

## Testing Strategy

### Unit Tests

- Test individual functions in services
- Test component rendering and behavior
- Mock external dependencies

### Integration Tests

- Test complete feature workflows
- Test API endpoints with database
- Test authentication flows

### E2E Tests

- Test complete user journeys
- Test from frontend to backend
- Test error scenarios

## Deployment Considerations

### Environment Variables

Backend:
```
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=production
```

Frontend:
```
REACT_APP_API_URL=https://api.example.com
```

### Production Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Set up error monitoring
- [ ] Use environment-specific configs
- [ ] Implement health check endpoints
- [ ] Add API documentation (Swagger)

## Further Reading

- [Vertical Slice Architecture by Jimmy Bogard](https://jimmybogard.com/vertical-slice-architecture/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
