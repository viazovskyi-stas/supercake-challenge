# Supercake Coding Challenge - Veterinary Customer Search

**Developed by Viazovskyi Stanislav**  
*Full-stack Developer*

A modern, responsive customer search interface for veterinary clinics built with Next.js, TypeScript, and Tailwind CSS.

*This project was created as part of the SoftGroup coding challenge.*

## 🎬 Demo

<video width="100%" controls>
  <source src="./showcase.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## ✨ Features

- **Real-time Search**: Search customers by name, email, phone, or pet names with debounced API calls
- **Species Filtering**: Filter customers by their pets' species with intuitive toggle buttons
- **Tag Filtering**: Advanced filtering by pet tags with search and selection capabilities
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Clean Architecture**: Built using Feature-Sliced Design (FSD) principles
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, accessible interface built with Tailwind CSS
- **URL State Management**: All filters and search terms are preserved in URL parameters

## 🏗️ Architecture

The project follows **Feature-Sliced Design (FSD)** methodology:

```
src/
├── shared/          # Shared utilities, types, and base components
│   ├── api/         # API clients
│   ├── hooks/       # Reusable React hooks
│   ├── types/       # TypeScript type definitions
│   ├── ui/          # Base UI components (Input, Button, Card, Badge)
│   └── utils/       # Utility functions
├── entities/        # Business entities
│   ├── customer/    # Customer entity components
│   └── pet/         # Pet entity components
├── features/        # Feature implementations
│   ├── customer-search/  # Search functionality
│   └── pet-filter/       # Species filtering
├── widgets/         # Composite UI blocks
│   └── customer-list/    # Customer list display
└── app/             # Next.js App Router pages
```

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - UI library
- **clsx & tailwind-merge** - Utility for conditional CSS classes

## 📱 Interface Overview

### Search Functionality

- Text-based search across customer names, emails, phones, and pet names
- Real-time results with 300ms debouncing for optimal performance
- Case-insensitive matching with exact ID lookup support

### Species Filtering

- Visual toggle buttons for each pet species
- Color-coded badges for different species (dogs, cats, birds, etc.)
- Clear all filters functionality
- Real-time filtering combined with text search

### Tag Filtering

- Search and filter pets by their tags
- Dropdown selection of available tags
- Multiple tag selection with visual indicators
- Tag-based filtering combined with species and text search

### Customer Display

- Modern card-based layout with customer information
- Pet information with species icons and tag badges
- Responsive grid layout (1/2/3 columns based on screen size)
- Loading states and error handling
- Empty state when no results found
- Hover effects and smooth transitions

## 🔧 Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Clean Code**: Meaningful names, small functions, single responsibility

## 📋 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript compiler
npm run format     # Format code with Prettier
npm run checks     # Run all quality checks
```

## 🔍 API Integration

The application integrates with the existing `/api/customers` endpoint:

- Supports `searchText` parameter for text-based search
- Supports `species` parameter for filtering by pet species (repeat format: `?species=dog&species=cat`)
- Supports `tags` parameter for filtering by pet tags (repeat format: `?tags=Friendly&tags=Playful`)
- Returns filtered customer data with their pets and tags
- Uses modern URL parameter format for better readability and standards compliance

## 📱 Responsive Design

- **Mobile**: Single column layout with stacked filters
- **Tablet**: Two column grid for customer cards
- **Desktop**: Three column grid with horizontal filter layout

The interface adapts seamlessly across all device sizes while maintaining usability and visual hierarchy.
