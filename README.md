# Penn Stack

A modern web application built with Next.js, Express, and PostgreSQL.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Express.js, PostgreSQL
- **Authentication**: JWT, bcryptjs
- **Development**: ESLint, Nodemon

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables in `.env` with your configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run migrate` - Run database migrations

## Project Structure

- `/app` - Next.js app directory containing pages and components
- `/api` - API routes and database migrations
- `/server.js` - Custom Express server configuration
- `/middleware.js` - Authentication middleware for protected routes

## Authentication Flow

The application uses a middleware-based authentication system that:

- Protects user-specific routes (`/user/profile`)
- Handles authentication redirects for sign-in and sign-up pages
- Automatically checks user authentication status via `/api/me` endpoint
- Redirects authenticated users away from auth pages
- Redirects unauthenticated users to sign-in when accessing protected routes

Protected routes include:
- `/user/profile`
- `/user/signin`
- `/user/signup`

## Important Notes

- This project uses a custom server setup with Express.js
- The custom server configuration is in `server.js`
- Database migrations can be run using the `migrate` script
- Environment variables are required for proper functioning

## Deployment

This application cannot be deployed on Vercel due to the custom server setup. Consider using platforms that support custom Node.js servers like Heroku, DigitalOcean, or AWS.

## License

Private - All rights reserved
