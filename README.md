# Maxwell Academy - React + TypeScript + PocketBase

A modern React application with TypeScript, Tailwind CSS, and PocketBase integration for user authentication and role-based access control.

## Features

- **Student Signup**: Self-registration for students with automatic role assignment
- **User Authentication**: Login system with role-based redirects
- **Role-Based Access**: Three user roles (student, faculty, admin) with protected routes
- **Modern UI**: Clean, responsive design using Tailwind CSS
- **State Management**: Zustand for global state management
- **Type Safety**: Full TypeScript support

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Backend**: PocketBase
- **Authentication**: PocketBase Auth

## Prerequisites

- Node.js (v18 or higher)
- PocketBase server running on `http://127.0.0.1:8090`

## PocketBase Setup

1. Download and start PocketBase server
2. Create a `users` collection with the following fields:
   - `name` (text, required)
   - `email` (email, required, unique)
   - `password` (password, required)
   - `phone` (text, required)
   - `role` (select, options: admin, faculty, student, default: student)

3. Configure authentication:
   - Enable email/password authentication
   - Set up email templates for verification (optional)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # Reusable components
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── StudentSignup.tsx
│   ├── Login.tsx
│   ├── StudentDashboard.tsx
│   ├── FacultyDashboard.tsx
│   └── AdminDashboard.tsx
├── services/           # API and external services
│   └── pocketbase.ts
├── store/              # State management
│   └── authStore.ts
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## User Roles

### Student
- Can sign up publicly
- Access to student dashboard
- Basic user information display

### Faculty
- Created manually by admin
- Access to faculty dashboard
- Cannot sign up publicly

### Admin
- Created manually in PocketBase
- Access to admin dashboard
- Full system access

## Routes

- `/signup` - Student registration page
- `/login` - User login page
- `/student/dashboard` - Student dashboard (protected)
- `/faculty/dashboard` - Faculty dashboard (protected)
- `/admin/dashboard` - Admin dashboard (protected)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
