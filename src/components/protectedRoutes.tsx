import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/userAuth";
import type { JSX } from "react";
import { useEffect } from "react";
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { profile, fetchProfile, error } = useAuth();
  const token = localStorage.getItem("access-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (token && !profile && !error) {
      fetchProfile();
    }
  }, [token, profile, fetchProfile, error]);

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-yellow-300 "size={128} />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;