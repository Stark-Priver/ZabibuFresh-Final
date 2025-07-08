# 🍇 Zabibu Fresh - Grape Marketplace App

A React Native mobile application connecting grape sellers and buyers in the Dodoma region of Tanzania. Built with Expo and Supabase (100% FREE tier).

## 🚀 Features

- **User Authentication**: Phone-based registration and login
- **Role-based Access**: Separate interfaces for sellers and buyers
- **Product Management**: Sellers can list grapes with photos, prices, and locations
- **Real-time Messaging**: Direct chat between buyers and sellers
- **Product Discovery**: Buyers can browse and search for grapes
- **Location-based**: Find grapes near you in Dodoma region
- **Image Storage**: Product photos with Supabase Storage
- **Responsive Design**: Clean, modern UI optimized for mobile

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for product images)
- **Real-time**: Supabase Realtime subscriptions
- **Navigation**: Expo Router
- **UI**: React Native with Ionicons

## 💰 Cost

**Completely FREE** using Supabase's generous free tier:
- 500MB PostgreSQL database
- 1GB file storage
- 2GB bandwidth/month
- 50,000 API requests/month
- Unlimited authentication
- Real-time subscriptions included

## 📱 Screenshots

*Add screenshots of your app here*

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account (free)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/zabibu-fresh-app.git
cd zabibu-fresh-app
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Supabase Setup
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy your Project URL and anon public key

### 4. Environment Configuration
1. Copy `.env.example` to `.env` in the frontend folder
2. Add your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Database Setup
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the migration file: `supabase/migrations/20250708020343_purple_garden.sql`

### 6. Storage Setup
1. In Supabase dashboard, go to Storage
2. Create a new bucket called `product-images`
3. Make it public for product image access

### 7. Run the App
```bash
cd frontend
npm start
```

## 📁 Project Structure

```
zabibu-fresh-app/
├── frontend/                 # React Native app
│   ├── app/                 # Expo Router pages
│   │   ├── (auth)/         # Authentication screens
│   │   ├── (app)/          # Main app screens
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── screens/        # Screen components
│   ├── assets/             # Images and icons
│   └── package.json
├── supabase/
│   └── migrations/         # Database schema
└── README.md
```

## 🎯 User Roles

### Sellers
- Register as grape sellers
- Add product listings with photos
- Set prices and quantities
- Specify pickup locations
- Receive messages from buyers
- Manage their product inventory

### Buyers
- Browse available grapes
- Search by location or product details
- Contact sellers directly
- Chat in real-time
- Find the best deals

## 🔐 Security Features

- Row Level Security (RLS) on all database tables
- User authentication required for all actions
- Sellers can only modify their own products
- Private messaging between users
- Secure image uploads

## 🚀 Deployment

### Mobile App Stores
1. **Build for production**:
   ```bash
   expo build:android
   expo build:ios
   ```

2. **Submit to stores**:
   - Google Play Store (Android)
   - Apple App Store (iOS)

### Web Version
```bash
expo build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the grape farming community in Dodoma, Tanzania
- Powered by Supabase's amazing free tier
- UI inspired by modern marketplace apps

## 📞 Support

For support, email support@zabibufresh.com or create an issue in this repository.

---

**Made with ❤️ for Dodoma's grape community**