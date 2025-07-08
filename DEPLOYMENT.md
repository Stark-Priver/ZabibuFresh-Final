# 🚀 Deployment Guide for Zabibu Fresh

This guide covers deploying your Zabibu Fresh app to production.

## 📱 Mobile App Deployment

### Prerequisites
- Expo account (free)
- Apple Developer account ($99/year for iOS)
- Google Play Console account ($25 one-time for Android)

### 1. Prepare for Production

#### Update App Configuration
```javascript
// app.json
{
  "expo": {
    "name": "Zabibu Fresh",
    "slug": "zabibu-fresh",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6200ee"
    },
    "ios": {
      "bundleIdentifier": "com.zabibufresh.app",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.zabibufresh.app",
      "versionCode": 1
    }
  }
}
```

#### Environment Variables for Production
```bash
# Create production environment file
cp .env.example .env.production

# Update with production Supabase credentials
EXPO_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

### 2. Build the App

#### Using Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

#### Using Classic Expo Build (Legacy)
```bash
# Build APK for Android
expo build:android -t apk

# Build AAB for Google Play
expo build:android -t app-bundle

# Build for iOS
expo build:ios
```

### 3. App Store Submission

#### Google Play Store (Android)
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new application
3. Upload your AAB file
4. Fill in store listing details:
   - Title: "Zabibu Fresh"
   - Short description: "Connect grape sellers and buyers in Dodoma"
   - Full description: (See template below)
   - Screenshots: Add 2-8 screenshots
   - Feature graphic: 1024x500px
5. Set content rating
6. Set pricing (Free)
7. Submit for review

#### Apple App Store (iOS)
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app
3. Upload build using Xcode or Application Loader
4. Fill in app information:
   - Name: "Zabibu Fresh"
   - Subtitle: "Grape Marketplace"
   - Description: (See template below)
   - Keywords: grape, marketplace, dodoma, tanzania, agriculture
   - Screenshots: Required for all device sizes
5. Set pricing (Free)
6. Submit for review

### 4. Store Listing Templates

#### App Description Template
```
🍇 Zabibu Fresh - Connecting Dodoma's Grape Community

Find and sell the freshest grapes in Dodoma region with Tanzania's premier grape marketplace app.

FOR SELLERS:
• List your grapes with photos and prices
• Reach buyers directly in your area
• Manage inventory easily
• Secure messaging with customers

FOR BUYERS:
• Browse fresh grapes from local farmers
• Compare prices and quality
• Contact sellers directly
• Find grapes near your location

FEATURES:
✓ Easy registration for sellers and buyers
✓ High-quality product photos
✓ Real-time messaging
✓ Location-based search
✓ Secure and private
✓ Free to use

Perfect for grape farmers, wholesalers, retailers, and consumers in the Dodoma region.

Download now and join Tanzania's growing agricultural marketplace!

Keywords: grapes, marketplace, dodoma, tanzania, agriculture, farming, fresh fruit, local produce
```

## 🌐 Web Deployment (Optional)

### Deploy to Netlify (Free)
```bash
# Build for web
expo build:web

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir web-build
```

### Deploy to Vercel (Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🗄️ Database Deployment

### Supabase Production Setup
1. **Create Production Project**
   - Go to Supabase dashboard
   - Create new project for production
   - Choose region closest to Tanzania (Europe/Asia)

2. **Run Migrations**
   ```sql
   -- Copy and run the migration file in SQL editor
   -- supabase/migrations/20250708020343_purple_garden.sql
   ```

3. **Configure Storage**
   - Create `product-images` bucket
   - Set public access for product images
   - Configure CORS if needed

4. **Set up Authentication**
   - Configure phone authentication
   - Set up email templates
   - Configure redirect URLs

## 📊 Analytics and Monitoring

### Expo Analytics
```bash
# Enable analytics in app.json
{
  "expo": {
    "analytics": {
      "amplitude": {
        "apiKey": "your-amplitude-key"
      }
    }
  }
}
```

### Supabase Monitoring
- Monitor database performance
- Set up alerts for high usage
- Track API usage against free tier limits

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] Row Level Security enabled
- [ ] Input validation implemented
- [ ] HTTPS enforced
- [ ] Authentication required for sensitive operations
- [ ] User data encrypted
- [ ] Regular security updates

## 📈 Performance Optimization

### App Performance
- [ ] Images optimized and compressed
- [ ] Lazy loading implemented
- [ ] Offline functionality added
- [ ] Caching strategies implemented
- [ ] Bundle size optimized

### Database Performance
- [ ] Proper indexes created
- [ ] Query optimization
- [ ] Connection pooling
- [ ] Regular maintenance

## 🚨 Monitoring and Maintenance

### Health Checks
- Monitor app crashes
- Track user engagement
- Monitor API response times
- Check database performance
- Monitor storage usage

### Regular Updates
- Security patches
- Dependency updates
- Feature improvements
- Bug fixes
- Performance optimizations

## 💰 Cost Management

### Supabase Free Tier Limits
- Database: 500MB
- Storage: 1GB
- Bandwidth: 2GB/month
- API requests: 50,000/month

### Scaling Strategy
1. **Monitor usage** in Supabase dashboard
2. **Optimize queries** to reduce API calls
3. **Implement caching** to reduce bandwidth
4. **Upgrade plan** when limits are reached

## 📞 Support and Maintenance

### User Support
- Set up support email
- Create FAQ section
- Monitor app store reviews
- Respond to user feedback

### Technical Support
- Monitor error logs
- Set up crash reporting
- Regular backups
- Disaster recovery plan

---

**Ready to launch? Follow this guide step by step and your Zabibu Fresh app will be live and helping the Dodoma grape community! 🍇**