import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@features/dashboard";
import Projects from "@features/projects";
import Recipes from "@/features/recipes";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/recipes" element={<Recipes />} />
        </Route>
      </Routes>
  )
}