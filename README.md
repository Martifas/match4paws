# Match4Paws - Pet Adoption Platform

A modern web application connecting pet owners with potential adopters, built with Next.js, React, and Material-UI.

## 📋 Table of Contents

- [Overview](#Overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Testing](#testing)
- [Database](#database)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Scripts Reference](#scripts-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)

# Overview

Match4Paws is a comprehensive pet adoption platform that enables:
- **Pet owners** to list their pets for adoption
- **Potential adopters** to browse and connect with pet owners
- **Secure messaging** between parties
- **Profile management** for both owners and adopters
- **Favorites system** to save interesting pets

## ✨ Features

### Core Functionality
- **User Authentication** via Auth0
- **Pet Listings** with photos, descriptions, and details
- **Advanced Search & Filtering** by breed, size, age, location
- **Real-time Messaging** between owners and adopters
- **Favorites System** to bookmark pets
- **Profile Management** for users
- **Responsive Design** for all devices

### User Roles
- **Pet Owners**: Create and manage pet listings
- **Adopters**: Browse pets, message owners, manage favorites
- **Admin**: Platform management (if applicable)

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Material-UI (MUI) 7** - Component library
- **Emotion** - CSS-in-JS styling
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS

### Backend & Database
- **Next.js API Routes** - Server-side logic
- **PostgreSQL** - Primary database
- **Kysely** - Type-safe SQL query builder
- **Auth0** - Authentication provider

### Development & Testing
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **Testing Library** - Component testing utilities
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Stylelint** - CSS linting

## 🔧 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **PostgreSQL** database
- **Auth0** account for authentication

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd match4paws
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment** (see [Environment Setup](#environment-setup))

5. **Set up the database**
   ```bash
   npm run migrate:latest
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 🌍 Environment Setup

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/match4paws

# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

### Auth0 Setup
1. Create an Auth0 application
2. Configure callback URLs: `http://localhost:3000/api/auth/callback`
3. Add logout URLs: `http://localhost:3000`
4. Enable required connections (Google, email/password, etc.)

## 🚀 Development

### Starting the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Code Quality
```bash
# Lint JavaScript/TypeScript
npm run lint

# Lint CSS/SCSS
npm run lint:css
npm run lint:css:fix

# Type checking
npm run typecheck
```

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run coverage
```

### End-to-End Tests
```bash
# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Test Structure
- **Unit tests**: `src/**/*.test.ts`
- **E2E tests**: `e2e/**/*.spec.ts`
- **Test utilities**: `tests/setup.tsx`, `vitest-setup.ts`

## 🗄 Database

### Schema Management
The application uses Kysely for type-safe database queries with PostgreSQL.

```bash
# Create new migration
npm run migrate:new

# Run latest migrations
npm run migrate:latest

# Generate TypeScript types from database
npm run gen:types
```

### Key Tables
- **users** - User profiles and authentication data
- **pets** - Pet listings with details
- **messages** - Chat messages between users
- **favorites** - User's favorited pets
- **images** - Pet photos and user avatars

## 🔐 Authentication

Authentication is handled by Auth0 with the following features:
- Social login (Google, Facebook, etc.)
- Email/password authentication
- JWT tokens for API authorization
- Role-based access control
- Session management

### Protected Routes
- `/profile` - User profile management
- `/messages` - Messaging system
- `/favorites` - User favorites
- `/pets/manage` - Pet management (owners only)

## 📁 Project Structure

```
match4paws/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── forms/            # Form components
│   ├── database/             # Database configuration
│   │   ├── migrate/          # Migration scripts
│   │   └── types.ts          # Generated types
│   ├── lib/                  # Utility functions
│   │   ├── queries/          # Database queries
│   │   └── constants/        # App constants
│   └── types/                # TypeScript type definitions
├── e2e/                      # End-to-end tests
│   ├── utils/               # Test utilities
│   └── *.spec.ts            # Test files
├── tests/                   # Test configuration
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 📜 Scripts Reference

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Preview production build

### Database
- `npm run migrate:new` - Create new migration
- `npm run migrate:latest` - Run pending migrations
- `npm run gen:types` - Generate database types

### Testing
- `npm test` - Run unit tests
- `npm run test:watch` - Watch mode for unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run coverage` - Generate test coverage

### Code Quality
- `npm run lint` - Lint JavaScript/TypeScript
- `npm run lint:css` - Lint CSS/SCSS
- `npm run lint:css:fix` - Fix CSS/SCSS issues
- `npm run typecheck` - TypeScript type checking

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables for Production
Ensure all environment variables are properly configured for your production environment, especially:
- Database connection strings
- Auth0 production credentials
- Proper callback URLs for your domain

### Recommended Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

## 🤝 Contributing

### Development Workflow
1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `npm test && npm run test:e2e`
4. Lint code: `npm run lint && npm run lint:css`
5. Commit with descriptive messages
6. Open a pull request

### Code Standards
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write tests for new features
- Maintain consistent code formatting
- Document complex functions and components

### Commit Message Format
```
type(scope): description

feat(auth): add social login with Google
fix(messaging): resolve message ordering issue
docs(readme): update installation instructions
```

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Search through GitHub issues
3. Create a new issue with detailed description
4. Include steps to reproduce for bugs

## 📄 License

[Add your license information here]

---

**Match4Paws** - Connecting pets with loving homes 🐾