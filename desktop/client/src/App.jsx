import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Quiz from "./pages/Quiz"
import Resume from "./pages/Resume"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  )
}
