import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const exploreItems = [
    { title: "Career Quiz", path: "/quiz", desc: "Discover your ideal tech career path" },
    { title: "Resume Analyzer", path: "/resume", desc: "Get AI-powered feedback on your resume" },
    { title: "Learning Roadmap", path: "/roadmap", desc: "Personalized week-by-week learning plan" },
    { title: "Company Explorer", path: "/companies", desc: "Discover target companies and skills" },
    { title: "Readiness Check", path: "/readiness", desc: "Calculate your interview readiness" },
    { title: "Skill Priority Planner", path: "/skills", desc: "Learn which skills to focus on first" },
    { title: "Adaptive Learning", path: "/adaptive", desc: "AI-powered personalized study plan" },
]

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isExploreOpen, setIsExploreOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">Student 360</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">

                        {/* My Progress */}
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/')
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            My Progress
                        </Link>

                        {/* Pricing */}
                        <Link
                            to="/pricing"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/pricing')
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Pricing
                        </Link>

                        {/* Explore Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsExploreOpen(!isExploreOpen)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${isExploreOpen
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Explore
                                <svg
                                    className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isExploreOpen && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                    {exploreItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsExploreOpen(false)}
                                            className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${isActive(item.path) ? 'bg-blue-50' : ''}`}
                                        >
                                            <span className={`font-medium ${isActive(item.path) ? 'text-blue-600' : 'text-gray-900'}`}>{item.title}</span>
                                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Logout */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsExploreOpen(!isExploreOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isExploreOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <Link to="/" onClick={() => setIsExploreOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-50">My Progress</Link>
                        <Link to="/pricing" onClick={() => setIsExploreOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-50">Pricing</Link>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Explore</p>
                            {exploreItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsExploreOpen(false)}
                                    className="flex flex-col px-4 py-3 text-gray-700 hover:bg-gray-50"
                                >
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-gray-500">{item.desc}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
