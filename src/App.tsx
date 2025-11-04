import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@features/dashboard";
import Projects from "@features/projects";
import Recipes from "@/features/recipes";
import Clients from "@/features/clients";
import { Toaster } from "react-hot-toast"
import Settings from "@/features/settings";
import { useEffect } from "react";
import i18n from "./i18n";

export default function App() {
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const themeToApply = savedTheme || (systemPrefersDark ? "dark" : "light")

    // setCurrentTheme(themeToApply)
    document.documentElement.setAttribute("data-theme", themeToApply)
  }, [])
  
  useEffect(() => {
      const savedLang = localStorage.getItem("language")
      if (savedLang) {
          i18n.changeLanguage(savedLang)
      }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}