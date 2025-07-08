# Contributing to Zabibu Fresh

Thank you for your interest in contributing to Zabibu Fresh! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## 📋 Development Setup

### Prerequisites
- Node.js (v16+)
- Expo CLI
- Git
- Supabase account (free)

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/zabibu-fresh-app.git
cd zabibu-fresh-app

# Install dependencies
cd frontend
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials

# Start development server
npm start
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Swahili language support
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Payment integration (M-Pesa)
- [ ] GPS location picker
- [ ] Product reviews and ratings

### Medium Priority
- [ ] Advanced search filters
- [ ] Seller verification system
- [ ] Bulk product upload
- [ ] Analytics dashboard
- [ ] Export/import features

### Low Priority
- [ ] Dark mode theme
- [ ] Social media sharing
- [ ] Referral system
- [ ] Advanced messaging features

## 🔧 Code Guidelines

### React Native/JavaScript
- Use functional components with hooks
- Follow ESLint configuration
- Use TypeScript where beneficial
- Keep components small and focused
- Use meaningful variable names

### Database
- Always use Row Level Security (RLS)
- Create proper indexes for performance
- Use transactions for related operations
- Follow naming conventions (snake_case for DB)

### UI/UX
- Follow Material Design principles
- Ensure accessibility compliance
- Test on different screen sizes
- Use consistent spacing and colors
- Provide loading states and error handling

## 🧪 Testing

### Before Submitting
- [ ] Test on both iOS and Android
- [ ] Verify all user flows work
- [ ] Check for console errors/warnings
- [ ] Test with slow network conditions
- [ ] Verify database operations
- [ ] Test authentication flows

### Manual Testing Checklist
- [ ] User registration (seller/buyer)
- [ ] Login/logout functionality
- [ ] Product creation/editing/deletion
- [ ] Image upload/display
- [ ] Real-time messaging
- [ ] Search and filtering
- [ ] Navigation between screens

## 📝 Pull Request Process

1. **Create descriptive PR title**
   - Use format: `[Feature/Fix/Docs]: Brief description`
   - Example: `Feature: Add Swahili language support`

2. **Provide detailed description**
   - What changes were made?
   - Why were they necessary?
   - How to test the changes?
   - Screenshots (if UI changes)

3. **Link related issues**
   - Reference issue numbers: `Fixes #123`

4. **Update documentation**
   - Update README if needed
   - Add comments for complex code
   - Update API documentation

## 🐛 Bug Reports

When reporting bugs, please include:

- **Device information**: OS, version, device model
- **App version**: Current version number
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console logs**: Any error messages

## 💡 Feature Requests

For new features, please provide:

- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should it work?
- **User stories**: Who benefits and how?
- **Technical considerations**: Implementation notes
- **Mockups/wireframes**: If applicable

## 🌍 Localization

We welcome translations! Currently supporting:
- English (default)
- Swahili (in progress)

To add a new language:
1. Create language files in `frontend/locales/`
2. Update language selector component
3. Test all screens with new language
4. Ensure proper text direction (RTL if needed)

## 📱 Platform-Specific Guidelines

### iOS
- Follow Apple Human Interface Guidelines
- Test on various iPhone sizes
- Ensure proper safe area handling
- Test with iOS accessibility features

### Android
- Follow Material Design guidelines
- Test on various Android versions
- Handle different screen densities
- Test with Android accessibility features

## 🔒 Security Considerations

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Implement proper authentication checks
- Follow OWASP mobile security guidelines

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: support@zabibufresh.com for urgent matters

## 🎉 Recognition

Contributors will be:
- Listed in the README contributors section
- Mentioned in release notes
- Invited to join the core team (for significant contributions)

Thank you for helping make Zabibu Fresh better for the Dodoma grape community! 🍇