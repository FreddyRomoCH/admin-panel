import { Route, Routes } from "react-router-dom";
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
import { supabaseClients } from "./lib/supabaseClient";
import Loading from "./components/shared/Loading";

export default function App() {
  const { fetchSession, setUser, loading, user, initialized } = useAuthStore()

  useEffect(() => {
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

  if (loading || !initialized) {
    return (
        <Loading 
          length={1} 
          direction="cols" 
          loader="spinner" 
        />
    )
  }

  return (
    <>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route index element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />

          <Route path="/recipes" element={
            <ProtectedRoute>
              <Recipes />
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
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}