# 🌾 Kisaan-Setu: Fair Trade Fresh Produce Platform

A comprehensive e-commerce platform connecting farmers directly with consumers for fair trade fresh produce. Built with Node.js, Express, and MongoDB.

## ✨ Features

### 🛒 Core Functionality
- **Product Listings**: Farmers can create and manage crop listings with detailed information
- **User Authentication**: Secure login/signup system with Passport.js
- **Search & Filter**: Advanced search functionality with location-based filtering
- **Reviews & Ratings**: Community-driven review system for products
- **Payment Integration**: Secure payment processing with Razorpay
- **Purchase Management**: Complete order tracking and purchase history

### 🗺️ Location Services
- **Interactive Maps**: Mapbox integration for location-based product discovery
- **Geocoding**: Automatic location coordinates from address inputs
- **Location-based Search**: Find products near you

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with Bootstrap
- **Image Upload**: Cloudinary integration for product images
- **Real-time Updates**: Flash messages for user feedback
- **Session Management**: Persistent user sessions with MongoDB store

## 🛠️ Tech Stack

### Backend
- **Node.js** (v22.x) - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Passport.js** - Authentication middleware
- **EJS** - Template engine

### Frontend
- **Bootstrap** - CSS framework
- **Mapbox GL** - Interactive maps
- **Font Awesome** - Icons

### Services & APIs
- **Cloudinary** - Image storage and management
- **Razorpay** - Payment gateway
- **Mapbox** - Maps and geocoding

### Development Tools
- **Nodemon** - Development server
- **Multer** - File upload handling
- **Joi** - Data validation

## 📋 Prerequisites

- Node.js (v22.x or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox API key
- Razorpay account

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Kisaan-Setu-Fair-Trade-Fresh-Produce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_access_token
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   ```

4. **Database Setup**
   - Ensure MongoDB Atlas is configured
   - The application will automatically create necessary collections

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
Kisaan-Setu-Fair-Trade-Fresh-Produce/
├── app.js                 # Main application file
├── controllers/           # Business logic controllers
├── models/               # MongoDB schemas
├── routes/               # Express routes
├── views/                # EJS templates
├── public/               # Static assets (CSS, JS, images)
├── middleware.js         # Custom middleware
├── utils/                # Utility functions
└── init/                 # Database initialization
```

## 🎯 Key Features Explained

### Product Categories
- **Grains**: Wheat, Maize, Millets, Rice
- **Fresh Produce**: Fruits, Vegetables
- **Specialty**: Plantations, Cash-Crops

### User Roles
- **Farmers**: Can create listings, manage products
- **Consumers**: Can browse, purchase, review products

### Security Features
- Password hashing with Passport-Local-Mongoose
- Session management with MongoDB store
- Input validation with Joi
- CSRF protection

## 🔧 API Endpoints

### Authentication
- `GET /signup` - User registration form
- `POST /signup` - Create new user account
- `GET /login` - Login form
- `POST /login` - User authentication
- `GET /logout` - User logout

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /reviews/:id` - Delete review

### Payments
- `POST /payment/create-order` - Create payment order
- `POST /payment/verify` - Verify payment

## 🚀 Deployment

### Vercel Deployment
The project includes `vercel.json` for easy deployment on Vercel:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vedansh Sharma**

## 🔒 Security

For security concerns, please refer to [SECURITY.md](SECURITY.md)

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ for the farming community** 