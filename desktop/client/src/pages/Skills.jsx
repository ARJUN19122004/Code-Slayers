import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const domains = [
    { value: "web", label: "Web Development", icon: "🌐" },
    { value: "data", label: "Data Science", icon: "📊" },
    { value: "ux", label: "UX Design", icon: "🎨" },
    { value: "cloud", label: "Cloud/DevOps", icon: "☁️" },
    { value: "cybersecurity", label: "Cyber Security", icon: "🔒" }
]

export default function Skills() {
    const [domain, setDomain] = useState("web")
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchSkills = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`http://localhost:5000/skills/${domain}`)
            setSkills(res.data)
        } catch (err) {
            console.error("Error fetching skills")
        } finally {
            setLoading(false)
        }
    }

    const highPriority = skills.filter(s => s.priority === "High")
    const mediumPriority = skills.filter(s => s.priority === "Medium")
    const lowPriority = skills.filter(s => s.priority === "Low")
    const selectedDomain = domains.find(d => d.value === domain)

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-4 px-6">
                <div className="max-w-5xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 text-sm">
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">

                {/* Hero Section */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">⚡</div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Skill Priority Planner
                    </h1>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Learn high priority skills first for maximum placement success
                    </p>
                </div>

                {/* Controls Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Your Domain
                            </label>
                            <select
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-gray-50"
                            >
                                {domains.map(d => (
                                    <option key={d.value} value={d.value}>{d.icon} {d.label}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={fetchSkills}
                            disabled={loading}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-sm ${loading
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Analyzing...
                                </span>
                            ) : (
                                "🚀 Generate Priority Skills"
                            )}
                        </button>
                    </div>
                </div>

                {/* Results */}
                {skills.length > 0 && (
                    <div className="space-y-8">

                        {/* Domain Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{selectedDomain?.icon}</span>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedDomain?.label}</h2>
                                <p className="text-gray-500 text-sm">{skills.length} skills ranked by priority</p>
                            </div>
                        </div>

                        {/* High Priority */}
                        {highPriority.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">🔥</span>
                                    <h3 className="text-lg font-bold text-gray-900">High Priority</h3>
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                        LEARN FIRST
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {highPriority.map(skill => (
                                        <div key={skill.skill} className="bg-white border-2 border-red-200 rounded-2xl p-5 hover:shadow-lg hover:border-red-300 transition-all">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="font-bold text-gray-900 text-lg">{skill.skill}</h4>
                                                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                    High
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">{skill.reason}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-400">Priority Score</div>
                                                <div className="text-red-600 font-bold">{skill.score}</div>
                                            </div>
                                            <div className="w-full bg-red-100 rounded-full h-1.5 mt-2">
                                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${Math.min(skill.score * 20, 100)}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Medium Priority */}
                        {mediumPriority.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">⚡</span>
                                    <h3 className="text-lg font-bold text-gray-900">Medium Priority</h3>
                                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                        LEARN NEXT
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {mediumPriority.map(skill => (
                                        <div key={skill.skill} className="bg-white border-2 border-yellow-200 rounded-2xl p-5 hover:shadow-lg hover:border-yellow-300 transition-all">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="font-bold text-gray-900 text-lg">{skill.skill}</h4>
                                                <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                    Medium
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">{skill.reason}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-400">Priority Score</div>
                                                <div className="text-yellow-600 font-bold">{skill.score}</div>
                                            </div>
                                            <div className="w-full bg-yellow-100 rounded-full h-1.5 mt-2">
                                                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${Math.min(skill.score * 20, 100)}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Low Priority */}
                        {lowPriority.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">🧩</span>
                                    <h3 className="text-lg font-bold text-gray-900">Low Priority</h3>
                                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                        LEARN LATER
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {lowPriority.map(skill => (
                                        <div key={skill.skill} className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 transition-all">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="font-bold text-gray-900 text-lg">{skill.skill}</h4>
                                                <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                    Low
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">{skill.reason}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-400">Priority Score</div>
                                                <div className="text-gray-600 font-bold">{skill.score}</div>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                                <div className="bg-gray-500 h-1.5 rounded-full" style={{ width: `${Math.min(skill.score * 20, 100)}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pro Tips */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
                            <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tips</h3>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Focus on High Priority skills for your first 3 months</li>
                                <li>• Build projects using these skills to strengthen your portfolio</li>
                                <li>• Medium Priority skills are great for differentiation in interviews</li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
