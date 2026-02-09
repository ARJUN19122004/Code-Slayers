import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Dashboard() {
    const [readiness, setReadiness] = useState(null)

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
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-8">

                {/* Readiness Score Card */}
                {readiness && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Interview Readiness
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
                                <div className="text-gray-500 text-sm mb-1">Resume Score</div>
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
                                <div className="text-gray-500 text-sm mb-1">Skill Test</div>
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
                                <div className="text-gray-500 text-sm mb-1">Projects</div>
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

            </main>

            {/* Footer */}
            <footer className="text-center py-6 text-gray-400 text-sm border-t border-gray-200 bg-white mt-8">
                Built by Code Slayers | CELESTIAL BUILDATHON 2026
            </footer>
        </div>
    )
}
