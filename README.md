# Match4Paws - Pet Adoption Platform

A modern web application connecting pet owners with potential adopters, built with Next.js, React, and Material-UI.

## 🔗 Quick Links
- 🌐 **Live Demo**: [https://match4paws-8utv.vercel.app/](https://match4paws-8utv.vercel.app/)

### 🧪 Test the Demo
Try the live application with these test accounts:

**Pet Owner Account** (can create/manage pet listings):
- Email: `prieglauda@turingas.com`
- Password: `Turingas2025++`

**Pet Adopter Account** (can browse pets and message owners):
- Email: `testas@turingas.com`  
- Password: `Turingas2025++`

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Planned Features](#planned-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Testing](#testing)
- [Database](#database)
- [Authentication](#authentication)
- [Scripts Reference](#scripts-reference)
- [Deployment](#deployment)

## Overview

Match4Paws is a comprehensive pet adoption platform that enables:

- **Pet owners** to list their pets for adoption
- **Potential adopters** to browse and connect with pet owners
- **Secure messaging** between parties
- **Profile management** for both owners and adopters
- **Favorites system** to save interesting pets

## Features

### Core Functionality

- **User Authentication** via Auth0
- **Pet Listings** with photos, descriptions, and details
- **Advanced Search & Filtering** by breed, size, age, location
- **Messaging** between owners and adopters
- **Favorites System** to bookmark pets
- **Profile Management** for users
- **Responsive Design** for all devices

### User Roles

- **Pet Owners**: Create and manage pet listings
- **Adopters**: Browse pets, message owners, manage favorites
- **Admin**: Platform management (if applicable)

## Planned Features
We're continuously improving Match4Paws with exciting new features in development:

- **Live Chat with WebSockets** - Real-time messaging between pet owners and adopters for instant communication
- **Geolocation-Based Search** - Find pets near your location with distance filtering and map integration
- **Swipe & Match Interface** - Tinder-style swiping experience to discover and match with perfect pets

## Tech Stack

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

## Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **PostgreSQL** database
- **Auth0** account for authentication

## Installation

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

## Environment Setup

1. **Copy the environment template**

```bash
cp .env.example .env

```

2. **In your Auth0 setup, you might want to update the callback URL to match the actual Auth0 setup:**

### Auth0 Setup

1. Create an Auth0 application
2. Configure callback URLs: `http://localhost:3000/api/auth/callback`
3. Add logout URLs: `http://localhost:3000`
4. Enable required connections (Google, email/password, etc.)

## Development

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

## Testing

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

**Note**: E2E tests require test user accounts. Create these through the UI first and update your `.env` file with the credentials.

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

## Database

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

## Authentication

Authentication is handled by Auth0 with the following features:

- Social login (Google, Facebook, etc.)
- Email/password authentication
- JWT tokens for API authorization
- Role-based access control
- Session management

## Scripts Reference

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

**Match4Paws** - Connecting pets with loving homes 🐾
