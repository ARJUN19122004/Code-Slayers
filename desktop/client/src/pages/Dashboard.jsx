import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const features = [
    {
        title: "Career Quiz",
        description: "Discover your ideal tech career path based on your interests and skills",
        icon: "🎯",
        path: "/quiz",
        color: "bg-purple-50 border-purple-200 hover:border-purple-400"
    },
    {
        title: "Resume Analyzer",
        description: "Get AI-powered feedback on your resume and improve your chances",
        icon: "📄",
        path: "/resume",
        color: "bg-blue-50 border-blue-200 hover:border-blue-400"
    },
    {
        title: "Learning Roadmap",
        description: "Get a personalized week-by-week learning plan for your chosen domain",
        icon: "🗺️",
        path: "/roadmap",
        color: "bg-green-50 border-green-200 hover:border-green-400"
    },
    {
        title: "Company Explorer",
        description: "Discover target companies and required skills for your chosen career domain",
        icon: "🏢",
        path: "/companies",
        color: "bg-orange-50 border-orange-200 hover:border-orange-400"
    },
    {
        title: "Readiness Check",
        description: "Calculate your interview readiness score and track your preparation progress",
        icon: "🧠",
        path: "/readiness",
        color: "bg-teal-50 border-teal-200 hover:border-teal-400"
    },
    {
        title: "Skill Priority Planner",
        description: "Learn which skills to focus on first for maximum placement success",
        icon: "⚡",
        path: "/skills",
        color: "bg-red-50 border-red-200 hover:border-red-400"
    },
    {
        title: "Adaptive Learning",
        description: "Take a DSA assessment and get an AI-powered personalized study plan",
        icon: "🧠",
        path: "/adaptive",
        color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400"
    }
]

export default function Dashboard() {
    const navigate = useNavigate()
    const [readiness, setReadiness] = useState(null)
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        const calculateReadiness = async () => {
            try {
                const res = await axios.post("http://localhost:5000/readiness", {
                    resumeScore: 70,
                    skillScore: 60,
                    projects: 3
                })
                setReadiness(res.data)
            } catch (err) {
                setReadiness({
                    finalScore: 68,
                    level: "Intermediate",
                    breakdown: {
                        resumeScore: 70,
                        skillScore: 60,
                        projectScore: 60
                    }
                })
            }
        }
        calculateReadiness()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            🚀 Student 360
                        </h1>
                        <p className="text-sm text-gray-500">
                            Welcome back, {user.name || 'Student'}!
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">

                {/* Readiness Score Card */}
                {readiness && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    🧠 Interview Readiness
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Your overall preparation score
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-gray-900">
                                    {readiness.finalScore}%
                                </div>
                                <span className={`
                                    inline-block px-3 py-1 rounded-full text-sm font-medium mt-2
                                    ${readiness.level === "Interview Ready"
                                        ? "bg-green-100 text-green-700"
                                        : readiness.level === "Intermediate"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }
                                `}>
                                    {readiness.level}
                                </span>
                            </div>
                        </div>

                        {/* Score Breakdown */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-gray-500 text-sm mb-1">📄 Resume Score</div>
                                <div className="text-2xl font-bold text-gray-900">{readiness.breakdown.resumeScore}</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${readiness.breakdown.resumeScore}%` }}
                                    />
                                </div>
                                <div className="text-gray-400 text-xs mt-1">40% weight</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-gray-500 text-sm mb-1">🎯 Skill Test</div>
                                <div className="text-2xl font-bold text-gray-900">{readiness.breakdown.skillScore}</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-purple-500 h-2 rounded-full"
                                        style={{ width: `${readiness.breakdown.skillScore}%` }}
                                    />
                                </div>
                                <div className="text-gray-400 text-xs mt-1">40% weight</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-gray-500 text-sm mb-1">💼 Projects</div>
                                <div className="text-2xl font-bold text-gray-900">{readiness.breakdown.projectScore}</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${readiness.breakdown.projectScore}%` }}
                                    />
                                </div>
                                <div className="text-gray-400 text-xs mt-1">20% weight</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <Link
                            key={feature.path}
                            to={feature.path}
                            className="group"
                        >
                            <div className={`
                                h-full p-6 rounded-xl border-2 transition-all duration-200
                                ${feature.color}
                            `}>
                                <div className="text-4xl mb-3">{feature.icon}</div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {feature.description}
                                </p>
                                <div className="mt-4 flex items-center text-gray-500 text-sm font-medium group-hover:text-gray-900">
                                    Get Started
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-6 text-gray-400 text-sm border-t border-gray-200 bg-white mt-8">
                Built with ❤️ by Code Slayers | CELESTIAL BUILDATHON 2026
            </footer>
        </div>
    )
}
