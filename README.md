# Fitness Booking Frontend

This repository contains the frontend application for the Fitness Booking system. It is built with Next.js and implements user-facing booking flows, service listings, authentication, and an administrator dashboard.

## Features

- Landing pages for available fitness services
- User registration and login
- Booking management for authenticated users
- Administrative dashboard for service and booking administration
- Responsive layout for web browsers

## Technology stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Axios for HTTP requests
- ESLint for code quality and linting

## Prerequisites

- Node.js 20 or later
- npm 10 or later

## Installation

1. Navigate to the project directory:
   ```bash
   cd fitness-booking-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Local development

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

## Production build

Create an optimized production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Linting

Check the source code for lint issues:

```bash
npm run lint
```

## Project structure

- `app/` - main application routes and layouts
- `components/` - reusable UI components
- `lib/` - shared utilities and HTTP client setup
- `public/` - static assets and images
- `src/` - source files and application logic

## Notes

This frontend is intended to work with a backend API that provides authentication, service data, and booking management. Ensure the backend endpoint configuration is set correctly in the application before deploying.
