import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Readiness() {
    const [resumeScore, setResumeScore] = useState(70)
    const [skillScore, setSkillScore] = useState(60)
    const [projects, setProjects] = useState(3)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const calculateReadiness = async () => {
        setLoading(true)

        try {
            const res = await axios.post("http://localhost:5000/readiness", {
                resumeScore,
                skillScore,
                projects
            })
            setResult(res.data)
        } catch (err) {
            console.error("Error calculating readiness")
        } finally {
            setLoading(false)
        }
    }

    const getLevelStyle = (level) => {
        if (level === "Interview Ready") return "bg-green-100 text-green-700"
        if (level === "Intermediate") return "bg-yellow-100 text-yellow-700"
        return "bg-red-100 text-red-700"
    }

    const getScoreBg = (score) => {
        if (score >= 70) return "bg-green-50 border-green-200"
        if (score >= 40) return "bg-yellow-50 border-yellow-200"
        return "bg-red-50 border-red-200"
    }

    const getScoreColor = (score) => {
        if (score >= 70) return "text-green-600"
        if (score >= 40) return "text-yellow-600"
        return "text-red-600"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-2xl mx-auto px-6 py-8">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Readiness Check
                    </h1>
                    <p className="text-gray-600">
                        Calculate your interview readiness score
                    </p>
                </div>

                {/* Input Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Enter Your Scores</h2>

                    <div className="space-y-6">
                        {/* Resume Score */}
                        <div>
                            <div className="flex justify-between text-gray-700 mb-2">
                                <label className="font-medium">Resume ATS Score</label>
                                <span className="font-bold">{resumeScore}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={resumeScore}
                                onChange={(e) => setResumeScore(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="text-gray-400 text-xs mt-1">Weight: 40%</div>
                        </div>

                        {/* Skill Score */}
                        <div>
                            <div className="flex justify-between text-gray-700 mb-2">
                                <label className="font-medium">Skill Test Score</label>
                                <span className="font-bold">{skillScore}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={skillScore}
                                onChange={(e) => setSkillScore(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <div className="text-gray-400 text-xs mt-1">Weight: 40%</div>
                        </div>

                        {/* Projects */}
                        <div>
                            <div className="flex justify-between text-gray-700 mb-2">
                                <label className="font-medium">Number of Projects</label>
                                <span className="font-bold">{projects}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={projects}
                                onChange={(e) => setProjects(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                            <div className="text-gray-400 text-xs mt-1">Weight: 20% (max 5 projects count)</div>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={calculateReadiness}
                        disabled={loading}
                        className={`w-full mt-6 py-3 rounded-lg font-medium transition-all ${loading
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Calculating..." : "Calculate Readiness"}
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="space-y-4">
                        {/* Main Score */}
                        <div className={`rounded-xl border-2 p-8 text-center ${getScoreBg(result.finalScore)}`}>
                            <div className={`text-5xl font-bold ${getScoreColor(result.finalScore)}`}>
                                {result.finalScore}%
                            </div>
                            <div className="text-gray-600 text-lg mt-2 mb-4">Overall Readiness</div>
                            <span className={`inline-block px-4 py-2 rounded-full font-medium ${getLevelStyle(result.level)}`}>
                                {result.level}
                            </span>
                        </div>

                        {/* Breakdown */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-blue-600">{result.breakdown.resumeScore}</div>
                                    <div className="text-gray-500 text-sm">Resume</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-purple-600">{result.breakdown.skillScore}</div>
                                    <div className="text-gray-500 text-sm">Skills</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-green-600">{result.breakdown.projectScore}</div>
                                    <div className="text-gray-500 text-sm">Projects</div>
                                </div>
                            </div>
                        </div>

                        {/* Formula */}
                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <div className="text-gray-500 text-sm">
                                Formula: (Resume × 0.4) + (Skills × 0.4) + (Projects × 0.2)
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
