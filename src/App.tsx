import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@features/dashboard";
import Projects from "@features/projects";
import Recipes from "@/features/recipes";
import Clients from "@/features/clients";
import { Toaster } from "react-hot-toast"
import Settings from "@/features/settings";

export default function App() {

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