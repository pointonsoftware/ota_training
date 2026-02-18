# 🎓 Student Start Here!

Welcome to the OTA Training - Vertical Slice Login Feature Assignment!

## 📋 Before You Begin

1. **Read this file first** to understand the project structure
2. **Follow the setup guide** to get your development environment running
3. **Complete the implementation** following the assignment instructions
4. **Test your work** to ensure everything works correctly

## 🚀 Quick Start (3 Steps)

### Step 1: Read the Documentation (15 minutes)

Start with these files in order:

1. **[README.md](README.md)** - Overview and assignment instructions
2. **[SETUP.md](SETUP.md)** - Step-by-step setup guide
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understanding the architecture

### Step 2: Set Up Your Environment (20-30 minutes)

Follow the instructions in [SETUP.md](SETUP.md) to:

1. Install Node.js and npm
2. Set up the backend (NestJS)
3. Set up the frontend (React)
4. Verify everything is running

### Step 3: Start Implementing (2-4 hours)

Follow the assignment instructions in [README.md](README.md) to implement:

**Backend:**
- Login service logic
- JWT token generation
- Password validation with bcrypt

**Frontend:**
- Login form submission
- API service integration
- Token storage and management

## 📚 Documentation Guide

### Primary Documents (Read These)

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **README.md** | Main assignment instructions | First |
| **SETUP.md** | Environment setup guide | Before coding |
| **ARCHITECTURE.md** | Architecture explanation | Before implementing |

### Reference Documents (Use When Needed)

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **QUICK_REFERENCE.md** | Commands, concepts, patterns | While coding |
| **EXAMPLES.md** | Reference implementations | When stuck |

## 🎯 Learning Path

### Phase 1: Understanding (Day 1)
- [ ] Read README.md
- [ ] Read SETUP.md
- [ ] Read ARCHITECTURE.md
- [ ] Understand vertical slice architecture concept
- [ ] Review the project structure

### Phase 2: Setup (Day 1)
- [ ] Install prerequisites (Node.js, npm)
- [ ] Clone and set up backend
- [ ] Clone and set up frontend
- [ ] Verify both servers start successfully
- [ ] Test backend endpoint with curl

### Phase 3: Backend Implementation (Day 2)
- [ ] Review backend code structure
- [ ] Implement login service
  - [ ] Create mock user data
  - [ ] Implement findUserByEmail()
  - [ ] Implement validatePassword()
  - [ ] Implement generateToken()
  - [ ] Complete login() method
- [ ] Configure JWT module
- [ ] Test backend with Postman/curl

### Phase 4: Frontend Implementation (Day 3)
- [ ] Review frontend code structure
- [ ] Implement login service
  - [ ] Complete login() method
  - [ ] Implement logout()
  - [ ] Implement isAuthenticated()
  - [ ] Implement getCurrentUser()
- [ ] Complete login form
  - [ ] Implement form submission
  - [ ] Add error handling
  - [ ] Add validation
- [ ] Configure API interceptors
- [ ] Test frontend login flow

### Phase 5: Integration & Testing (Day 4)
- [ ] Test complete login flow
- [ ] Test with valid credentials
- [ ] Test with invalid credentials
- [ ] Test error cases
- [ ] Verify token storage
- [ ] Test logout functionality

### Phase 6: Enhancement (Optional)
- [ ] Add protected routes
- [ ] Implement dashboard page
- [ ] Add form validation
- [ ] Improve error messages
- [ ] Add loading states
- [ ] Style improvements

## 💡 Tips for Success

### General Tips
1. **Read all comments** in the code files - they contain important hints
2. **Start small** - Get one thing working before moving to the next
3. **Test frequently** - Test after each small change
4. **Use console.log** - Debug by logging values
5. **Check DevTools** - Browser console and network tab are your friends
6. **Ask for help** - Don't spend hours stuck on one thing

### Backend Tips
1. Generate password hashes first using bcrypt
2. Test endpoints with Postman or curl
3. Check terminal logs for errors
4. Verify JWT secret is set in .env
5. Use console.log in service methods to debug

### Frontend Tips
1. Check browser console for errors
2. Use Network tab to see API requests
3. Check localStorage in Application tab
4. Add console.log to track flow
5. Test one feature at a time

## 🐛 Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Can't install packages | Clear npm cache: `npm cache clean --force` |
| Port already in use | Change port in .env or find and stop the process |
| CORS errors | Verify backend CORS configuration |
| Token not working | Check Authorization header format |
| Form not submitting | Check for JavaScript errors in console |
| Backend not starting | Check for TypeScript errors in terminal |

## 📖 Additional Resources

### When You're Stuck
1. Check **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** for code patterns
2. Review **[EXAMPLES.md](EXAMPLES.md)** for reference implementations
3. Search the error message online
4. Ask your instructor

### Learn More
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Introduction](https://jwt.io/introduction)
- [Bcrypt Explained](https://www.npmjs.com/package/bcrypt)

## ✅ Completion Checklist

Before submitting, ensure:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can log in with valid credentials
- [ ] Cannot log in with invalid credentials
- [ ] Token is stored in localStorage
- [ ] Error messages display correctly
- [ ] Form validation works
- [ ] Code follows TypeScript best practices
- [ ] All TODO comments are addressed
- [ ] Tested thoroughly

## 🎉 Next Steps After Completion

Once you complete the basic assignment:

1. **Show your work** to your instructor
2. **Get feedback** and make improvements
3. **Try bonus challenges** from README.md
4. **Help classmates** who are struggling
5. **Extend the project** with your own ideas

## 🤝 Getting Help

1. **Review documentation** in this repository
2. **Check error messages** carefully - they often tell you what's wrong
3. **Debug systematically** - isolate the problem
4. **Ask specific questions** - "Login doesn't work" vs "Getting 401 error when calling /auth/login with valid credentials"
5. **Share error logs** when asking for help

## 🏆 Success Criteria

You'll know you're successful when:

✅ You understand vertical slice architecture  
✅ You can implement a secure login system  
✅ You can connect React to NestJS  
✅ You can work with JWT tokens  
✅ You can handle errors properly  
✅ You can debug full-stack applications  

---

**Ready? Let's start with [README.md](README.md)!**

**Good luck! You've got this! 🚀**
