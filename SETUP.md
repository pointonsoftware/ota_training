# Setup Guide for Students

This guide will help you set up and run the OTA Training Login Feature project.

## Prerequisites Check

Before starting, ensure you have:

1. **Node.js** (version 16 or higher)
   ```bash
   node --version
   ```
   If not installed, download from [nodejs.org](https://nodejs.org/)

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **A code editor** (VS Code recommended)
   Download from [code.visualstudio.com](https://code.visualstudio.com/)

4. **Git** (for version control)
   ```bash
   git --version
   ```

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd ota_training
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# (Optional) Edit .env file with your preferred settings
# On Linux/Mac: nano .env
# On Windows: notepad .env

# Start the development server
npm run start:dev
```

You should see:
```
🚀 Application is running on: http://localhost:3001
📝 Login endpoint: http://localhost:3001/api/auth/login
```

**Keep this terminal open!** The backend needs to keep running.

### Step 3: Frontend Setup

Open a **new terminal** (keep the backend running in the first terminal).

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# (Optional) Edit .env if backend is running on a different port

# Start the development server
npm start
```

Your browser should automatically open to `http://localhost:3000/login`

**Keep this terminal open too!**

### Step 4: Verify Setup

1. **Backend Check**:
   - Terminal shows: `Application is running on: http://localhost:3001`
   - No error messages

2. **Frontend Check**:
   - Browser opens to login page
   - Form is visible with email and password fields
   - No console errors (press F12 to open DevTools)

3. **Test Connection**:
   Open a third terminal and run:
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```
   
   You should get an error about "not implemented" - that's expected! It means the backend is responding.

## Common Issues and Solutions

### Issue: Port Already in Use

**Error**: `Port 3001 is already in use` or `Port 3000 is already in use`

**Solution**:
```bash
# Find what's using the port (Mac/Linux)
lsof -i :3001
lsof -i :3000

# Find what's using the port (Windows)
netstat -ano | findstr :3001
netstat -ano | findstr :3000

# Kill the process or change the port in your .env file
```

### Issue: npm install fails

**Error**: Various npm installation errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try installing again
npm install
```

### Issue: Module not found errors

**Error**: `Cannot find module '@nestjs/common'` or similar

**Solution**:
```bash
# Make sure you're in the correct directory
pwd  # Should show either backend/ or frontend/

# Reinstall dependencies
npm install
```

### Issue: TypeScript errors

**Error**: TypeScript compilation errors

**Solution**:
```bash
# Make sure TypeScript is installed
npm install typescript --save-dev

# Check your tsconfig.json is present
ls -la tsconfig.json
```

### Issue: CORS errors in browser

**Error**: `Access-Control-Allow-Origin` errors in browser console

**Solution**:
- Verify backend is running on port 3001
- Verify frontend is running on port 3000
- Check CORS configuration in `backend/src/main.ts`
- Clear browser cache and reload

### Issue: Can't connect to backend

**Error**: Network errors, `ERR_CONNECTION_REFUSED`

**Solution**:
- Make sure backend is running (`npm run start:dev` in backend directory)
- Check the backend URL in `frontend/.env`
- Try accessing `http://localhost:3001/api/auth/login` directly in browser

## Testing Your Setup

### Test 1: Backend is Running

```bash
curl http://localhost:3001/api/auth/login
```

Expected: Some response (not a connection error)

### Test 2: Frontend is Accessible

Open browser to: `http://localhost:3000/login`

Expected: Login form visible

### Test 3: Frontend Can Reach Backend

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try submitting the login form
4. Check for requests to `http://localhost:3001/api/auth/login`

## VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **ESLint** - JavaScript/TypeScript linting
2. **Prettier** - Code formatter
3. **TypeScript Vue Plugin (Volar)** - Better TypeScript support
4. **REST Client** - Test API endpoints from VS Code

## Next Steps

Now that your setup is complete, you can:

1. **Read the README.md** for assignment instructions
2. **Read ARCHITECTURE.md** to understand the project structure
3. **Start implementing** the login feature!

## Development Workflow

### Making Changes

1. **Edit code** in your editor
2. **Save file** - servers will auto-reload
3. **Check browser/terminal** for errors
4. **Test changes** in the browser

### Running Tests (when implemented)

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Formatting

```bash
# Format backend code
cd backend
npm run format

# Format frontend code
cd frontend
npm run format
```

### Stopping the Servers

- Press `Ctrl+C` in each terminal to stop the servers
- Or close the terminal windows

## Getting Help

If you're stuck:

1. **Read error messages carefully** - they often tell you exactly what's wrong
2. **Check the console** (browser DevTools F12)
3. **Check terminal output** for backend errors
4. **Search the error message** online
5. **Review the code comments** - they have hints and examples
6. **Ask your instructor** - that's what they're there for!

## Useful Commands Reference

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run start:dev        # Start development server
npm run build           # Build for production
npm run test            # Run tests
npm run lint            # Check code quality
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm start               # Start development server
npm run build           # Build for production
npm test                # Run tests
npm run lint            # Check code quality
```

## System Requirements

- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 1GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux
- **Internet**: Required for npm package installation

---

**Ready to code? Let's go! 🚀**
