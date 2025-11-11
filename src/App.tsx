import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@layouts/AuthLayout";
import Dashboard from "@features/dashboard";
import Projects from "@features/projects";
import Recipes from "@/features/recipes";
import Clients from "@/features/clients";
import { Toaster } from "react-hot-toast"
import Settings from "@/features/settings";
import { useEffect } from "react";
import i18n from "./i18n";
import LoginPage from "@/features/login";
import { useAuthStore } from "@store/useAuthStore";
import ProtectedRoute from "@components/shared/ProtectedRoute";
import { supabaseClients } from "@lib/supabaseClient";
import Loading from "@components/shared/Loading";
import Register from "@features/register";

export default function App() {
  const { fetchSession, setUser, loading, user, initialized } = useAuthStore()

  useEffect(() => {

    fetchSession()

    const { data: listener } = supabaseClients.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchSession()
      } else {
        setUser(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [fetchSession, setUser])

  useEffect(() => {
    if (loading) return

    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const themeToApply =
      user?.theme ||
      savedTheme ||
      (systemPrefersDark ? "dark" : "light")

    document.documentElement.setAttribute("data-theme", themeToApply)
    localStorage.setItem("theme", themeToApply)
  }, [user, loading])

  useEffect(() => {
    if (loading) return

    const savedLang = localStorage.getItem("language")

    const langToApply =
      user?.language ||
      savedLang ||
      "en"

    i18n.changeLanguage(langToApply)
    localStorage.setItem("language", langToApply)
  }, [user, loading])

  if (!initialized) {
    return (
        <Loading 
          length={1} 
          direction="cols" 
          loader="spinner" 
        />
    )
  }

  const isAdmin = user?.is_admin ?? false

  return (
    <>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route index element={
            <ProtectedRoute>
              { isAdmin 
                ? <Dashboard /> 
                : <Navigate to="/clients" /> 
              }
            </ProtectedRoute>
          } />

          <Route path="/projects" element={
            <ProtectedRoute>
              { isAdmin 
                ? <Projects /> 
                : <Navigate to="/clients" /> 
              }
            </ProtectedRoute>
          } />

          <Route path="/recipes" element={
            <ProtectedRoute>
              { isAdmin 
                ? <Recipes /> 
                : <Navigate to="/clients" /> 
              }
            </ProtectedRoute>
          } />

          <Route path="/clients" element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          <Route path="/register" element={
            <ProtectedRoute>
              { isAdmin 
                ? <Register /> 
                : <Navigate to="/clients" /> 
              }
            </ProtectedRoute>
          } />
          
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}