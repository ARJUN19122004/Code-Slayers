import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const domains = [
    { value: "web", label: "Web Development", icon: "🌐", color: "bg-blue-50 border-blue-200 hover:border-blue-400" },
    { value: "data", label: "Data Science", icon: "📊", color: "bg-purple-50 border-purple-200 hover:border-purple-400" },
    { value: "ux", label: "UX Design", icon: "🎨", color: "bg-pink-50 border-pink-200 hover:border-pink-400" },
    { value: "cloud", label: "Cloud/DevOps", icon: "☁️", color: "bg-green-50 border-green-200 hover:border-green-400" },
    { value: "cybersecurity", label: "Cyber Security", icon: "🔒", color: "bg-red-50 border-red-200 hover:border-red-400" }
]

export default function Roadmap() {
    const [domain, setDomain] = useState(null)
    const [roadmap, setRoadmap] = useState([])
    const [loading, setLoading] = useState(false)
    const [completedWeeks, setCompletedWeeks] = useState([])

    const fetchRoadmap = async (selectedDomain) => {
        setLoading(true)
        setDomain(selectedDomain)

        try {
            const res = await axios.get(
                `http://localhost:5000/roadmap/${selectedDomain}`
            )
            setRoadmap(res.data)
            setCompletedWeeks([])
        } catch (err) {
            console.error("Error fetching roadmap")
        } finally {
            setLoading(false)
        }
    }

    const toggleWeek = (week) => {
        if (completedWeeks.includes(week)) {
            setCompletedWeeks(completedWeeks.filter(w => w !== week))
        } else {
            setCompletedWeeks([...completedWeeks, week])
        }
    }

    const resetRoadmap = () => {
        setDomain(null)
        setRoadmap([])
        setCompletedWeeks([])
    }

    const selectedDomainData = domains.find(d => d.value === domain)
    const progress = roadmap.length > 0 ? Math.round((completedWeeks.length / roadmap.length) * 100) : 0

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-4 px-6">
                <div className="max-w-3xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 text-sm">
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-8">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🗺️ Learning Roadmap
                    </h1>
                    <p className="text-gray-600">
                        Get a personalized week-by-week learning plan
                    </p>
                </div>

                {!domain ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {domains.map((d) => (
                            <button
                                key={d.value}
                                onClick={() => fetchRoadmap(d.value)}
                                className={`p-6 rounded-xl border-2 text-left transition-all ${d.color}`}
                            >
                                <div className="text-3xl mb-2">{d.icon}</div>
                                <div className="text-lg font-semibold text-gray-900">{d.label}</div>
                                <div className="text-gray-500 text-sm mt-1">6-week roadmap →</div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Progress Header */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{selectedDomainData?.icon}</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {selectedDomainData?.label}
                                        </h2>
                                        <p className="text-gray-500 text-sm">6-Week Learning Path</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">{progress}%</div>
                                    <div className="text-gray-500 text-sm">Complete</div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Roadmap Timeline */}
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                                <p className="text-gray-500">Loading roadmap...</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {roadmap.map((item) => (
                                    <div
                                        key={item.week}
                                        onClick={() => toggleWeek(item.week)}
                                        className={`
                                            p-4 rounded-xl border-2 cursor-pointer transition-all
                                            ${completedWeeks.includes(item.week)
                                                ? "bg-green-50 border-green-300"
                                                : "bg-white border-gray-200 hover:border-gray-300"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`
                                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                                ${completedWeeks.includes(item.week)
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                                }
                                            `}>
                                                {completedWeeks.includes(item.week) ? "✓" : item.week}
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-gray-500 text-sm">Week {item.week}</div>
                                                <div className={`font-medium ${completedWeeks.includes(item.week)
                                                        ? "text-green-700 line-through"
                                                        : "text-gray-900"
                                                    }`}>
                                                    {item.task}
                                                </div>
                                            </div>

                                            {completedWeeks.includes(item.week) && (
                                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Done
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reset Button */}
                        <button
                            onClick={resetRoadmap}
                            className="w-full mt-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            ← Choose Different Domain
                        </button>
                    </>
                )}
            </main>
        </div>
    )
}
