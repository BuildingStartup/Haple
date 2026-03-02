# 🏪 HAPLE - Campus Marketplace Platform

## 📋 Overview

**HAPLE** is a modern campus marketplace platform built with React + Vite that connects student buyers with trusted student sellers. Whether you're looking for food, fashion, design services, tech repairs, or anything else, HAPLE makes it easy to discover and connect with sellers right on campus.

The platform provides two distinct user experiences:
- **Buyers**: Browse and search for sellers across various categories
- **Sellers**: Create profiles, manage products/services, and connect with customers

## ✨ Key Features

### For Buyers
- 🔍 **Browse & Search**: Explore sellers by category or search across the entire marketplace
- 📂 **Category Filtering**: Find sellers in products, services, food, fashion, accessories, and more
- 👤 **Seller Profiles**: View detailed seller information, photos, and contact details
- 📊 **Seller Stats**: See seller ratings, products/services count, and engagement metrics
- 🎯 **Smart Navigation**: Intuitive UI optimized for mobile and desktop views

### For Sellers
- 📝 **Profile Management**: Create and customize your seller profile
- 🖼️ **Product Gallery**: Upload and manage seller images and portfolio
- 🏷️ **Category Selection**: List your business under relevant product/service categories
- 🔄 **Profile Editing**: Update your information and manage your offerings
- 📈 **Analytics Dashboard**: Track your profile views and engagement

### General
- 🔐 **Authentication**: Secure sign-up and login powered by Supabase
- 🎨 **Responsive Design**: Seamless experience on mobile, tablet, and desktop
- ⚡ **Fast Performance**: Built with Vite for optimal load times
- 🎯 **Real-time Updates**: Instant authentication state management

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Efficient form handling
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library (Font Awesome, HeroIcons, etc.)

### Backend & Database
- **Supabase** - Backend as a Service (Authentication & Database)
- **Supabase Auth** - User authentication
- **PostgreSQL** (via Supabase) - Data persistence

### Development Tools
- **ESLint** - Code linting
- **npm** - Package manager

## 📁 Project Structure

```
src/
├── App.jsx                    # Main app component with routing
├── main.jsx                   # Entry point
├── index.css                  # Global styles
│
├── context/
│   └── AuthContext.jsx        # Authentication context provider
│
├── pages/                     # Page components (route handlers)
│   ├── Home.jsx              # Landing page
│   ├── Login.jsx             # User login
│   ├── SignUp.jsx            # User registration
│   ├── Explore.jsx           # Category & seller browsing
│   ├── CategorySellers.jsx   # Sellers in specific category
│   ├── SellerProfile.jsx     # Individual seller details
│   ├── MyProfile.jsx         # Seller's own profile view
│   └── ProfileEdit.jsx       # Profile editing
│
├── features/                 # Custom hooks for features
│   ├── authentication/       # Auth-related hooks
│   │   ├── useLogin.js
│   │   ├── useSignUp.js
│   │   ├── useSignOut.js
│   │   └── useUser.js
│   ├── categories/           # Category management hooks
│   │   ├── useCategories.js
│   │   └── useSellerCategory.js
│   ├── profiles/             # Seller profile hooks
│   │   ├── useSearchSeller.js
│   │   ├── useSeller.js
│   │   ├── useSellerImages.js
│   │   ├── useSellersCategorySlug.js
│   │   └── useUpdateSeller.js
│   └── stats/                # Analytics hooks
│       └── useStats.js
│
├── services/                 # API service calls
│   ├── supabase.js          # Supabase client configuration
│   ├── apiAuth.js           # Authentication endpoints
│   ├── apiCategory.js       # Category endpoints
│   ├── apiSellers.js        # Seller endpoints
│   ├── apiSellerImage.js    # Seller image endpoints
│   └── apiStats.js          # Analytics endpoints
│
├── ui/                       # Reusable UI components
│   ├── AddProductButton.jsx
│   ├── AddProductForm.jsx
│   ├── BigScreen.jsx        # Desktop layout wrapper
│   ├── SmallScreen.jsx      # Mobile layout wrapper
│   ├── CatalogDisplay.jsx   # Category showcase component
│   ├── Error404.jsx         # 404 page
│   ├── NetworkError.jsx     # Network error display
│   ├── ProtectedRoute.jsx   # Route protection wrapper
│   ├── SearchBar.jsx        # Search input component
│   ├── SellerContact.jsx    # Contact information
│   ├── SellerInfo.jsx       # Seller information display
│   ├── SellersList.jsx      # Grid of seller cards
│   ├── Spinner.jsx          # Loading spinner
│   ├── SpinnerMini.jsx      # Small loading spinner
│   └── ViewProducts.jsx     # Product/service viewer
│
├── utils/                    # Utility functions
│   ├── helpers.js           # General helper functions
│   └── slugify.js           # URL slug generation
│
└── hooks/                    # Custom React hooks (if any)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account and project setup

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd haple
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Supabase**
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

### Linting

```bash
npm run lint
```

## 🎯 User Flows

### Buyer Flow
1. **Home** → Browse marketplace introduction
2. **Explore** → Browse all categories and search sellers
3. **Category Sellers** → View sellers in specific category with search
4. **Seller Profile** → View detailed seller information and catalog

### Seller Flow
1. **Sign Up** → Create new seller account
2. **My Profile** → View your seller profile
3. **Profile Edit** → Update seller information, images, and categories
4. **Manage Presence** → Keep your profile updated with latest offerings

## 🔑 Core Features Explained

### 1. **Authentication System**
- Built with Supabase Auth
- Supports sign-up, login, and session management
- Real-time user state through `AuthContext`
- Protected routes for seller-only features

### 2. **Marketplace Browsing**
- **Explore Page**: Shows all categories sorted by Products and Services
- **Category Search**: Dynamic category filtering with previews
- **Smart Search**: Search sellers across the entire marketplace
- **Seller Cards**: Display seller name, image, category, and stats

### 3. **Seller Profiles**
- Complete seller information (name, bio, images)
- Product/Service listings
- Contact information
- Profile customization and editing
- Performance metrics and viewer statistics

### 4. **Search & Discovery**
- Full-text search across seller names and businesses
- Category-based filtering
- Search within specific categories
- Real-time search results with loading states

### 5. **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Separate mobile (SmallScreen) and desktop (BigScreen) layouts
- Touch-friendly interface optimized for campus environment

## 📊 Architecture

### State Management
- **AuthContext**: Global authentication state
- **Custom Hooks**: Feature-specific state logic
- **Local Component State**: UI-specific state with `useState`

### Data Flow
1. **Services** → Make API calls to Supabase
2. **Custom Hooks** → Manage state and side effects
3. **Components** → Consume hooks and render UI
4. **Pages** → Compose components into full pages

### Error Handling
- Network error boundaries
- Toast notifications for user feedback
- Fallback UI states (loading, error, empty states)

## 🌟 Best Practices

- **Component Organization**: Separation of concerns with features and services
- **Reusable Components**: Shared UI components in `ui/` folder
- **Custom Hooks**: Logic extracted into custom hooks for reusability
- **Responsive Design**: Mobile-first approach
- **Error States**: Comprehensive error handling and user feedback

## 📝 Environment Variables

Create a `.env.local` file with:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

Feel free to fork, create feature branches, and submit pull requests to enhance HAPLE!

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for campus communities**
