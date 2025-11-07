import { useAuthStore } from "@/store/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuthStore()

    if (loading) return <Loading length={4} direction="cols" />

    if (!user) return <Navigate to="/login" replace />

    return children
}