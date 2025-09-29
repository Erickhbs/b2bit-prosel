# B2BIT FRONT-END PROSEL

This is a React-based web application built with TypeScript, featuring a login page and a protected profile page. It uses Formik for form handling, Yup for validation, Axios for API requests, Tailwind CSS for styling, and Shadcn UI for components like buttons, inputs, and spinners.

## Features
- Login page with email and password validation.
- Protected profile page accessible only to authenticated users.
- Responsive UI with toast notifications for user feedback.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A text editor like [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Erickhbs/b2bit-prosel.git
cd b2bit-prosel
```

### 2. Install Dependencies
Install the required Node.js packages using npm:
```bash
npm install
```

### 3. Configure Environment
The application uses Axios to communicate with a backend API. You need to configure the API base URL using the `VITE_API_URL` environment variable.

1. Create a `.env` file in the root of the project (or update it if it exists):
   ```env
   VITE_API_URL=https://api.example.com
   ```
   Replace `https://api.example.com` with the actual backend API URL. The endpoint for login is `/auth/login/` and for profile is `/auth/profile/`.

2. Update the Axios configuration in `src/services/axios.ts` to use `VITE_API_URL`:
   ```tsx
   import axios from "axios";

   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
   });

   export default api;
   ```

### 4. Run the Application
Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`. If the port is in use, React will prompt you to use a different one.

### 5. Using the Application
- **Login Page**: Navigate to `http://localhost:3000/login` and use valid credentials (e.g., email: `user@example.com`, password: `password123`).
- **Profile Page**: After logging in, you’ll be redirected to `/profile`. You must be authenticated to access this page.
- **Text Editor**: Open the project in Visual Studio Code (or your preferred editor) to explore or modify the code:
  ```bash
  code .
  ```

### 6. Project Structure
Key files and folders:
- `src/App.tsx`: Defines the main routes using React Router.
- `src/pages/login/Login.tsx`: Implements the login page.
- `src/pages/profile/Profile.tsx`: Displays user profile information.
- `src/components/protectedRoutes.tsx`: Protects routes by checking authentication.
- `src/hooks/userAuth.ts`: Handles authentication logic.
- `src/services/axios.ts`: Axios configuration for API requests.
- `src/assets/`: Contains static assets like `b2bitlogo.png`.

### 7. Available Scripts
- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production to the `build` folder.

### 8. Dependencies
Key dependencies include:
- React
- React Router
- Formik & Yup
- Axios
- Tailwind CSS
- Shadcn UI
- Sonner (for toast notifications)

See `package.json` for the full list.

### 9. API Endpoints
The application interacts with the following backend endpoints:
- `POST /auth/login/`: Authenticates users and returns an access token.
- `GET /auth/profile/`: Retrieves the authenticated user’s profile data.

Ensure your backend API is running and accessible at the URL specified in `VITE_API_URL`.
