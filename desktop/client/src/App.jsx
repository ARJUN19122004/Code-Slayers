import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Quiz from "./pages/Quiz"
import Resume from "./pages/Resume"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Roadmap from "./pages/Roadmap"
import Companies from "./pages/Companies"
import Readiness from "./pages/Readiness"
import Skills from "./pages/Skills"
import AdaptiveTest from "./pages/AdaptiveTest"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path="/readiness" element={<ProtectedRoute><Readiness /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
        <Route path="/adaptive" element={<ProtectedRoute><AdaptiveTest /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
