import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    <Toaster/>
    </BrowserRouter>
  );
}

export default App;