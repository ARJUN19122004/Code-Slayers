import { useState } from "react"
import axios from "axios"

const options = [
    { label: "I enjoy coding", value: "coding", icon: "💻" },
    { label: "I love design & creativity", value: "design", icon: "🎨" },
    { label: "I'm good at math", value: "math", icon: "🔢" },
    { label: "I enjoy statistics", value: "statistics", icon: "📈" },
    { label: "I like solving problems", value: "problem_solving", icon: "🧩" },
    { label: "I enjoy writing/storytelling", value: "writing", icon: "✍️" },
    { label: "Interested in networking/security", value: "networks", icon: "🔐" },
    { label: "I like servers & cloud", value: "servers", icon: "☁️" },
    { label: "Love automation & DevOps", value: "automation", icon: "⚙️" }
]

export default function Quiz() {
    const [selected, setSelected] = useState([])
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const toggle = (value) => {
        if (selected.includes(value))
            setSelected(selected.filter(v => v !== value))
        else
            setSelected([...selected, value])
    }

    const handleSubmit = async () => {
        if (selected.length < 2) {
            setError("Please select at least 2 interests")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await axios.post(
                "http://localhost:5000/quiz/recommend",
                { answers: selected }
            )
            setResults(res.data.results)
        } catch (err) {
            setError("Failed to get recommendations. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const resetQuiz = () => {
        setSelected([])
        setResults(null)
        setError(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        🎯 Career Interest Quiz
                    </h1>
                    <p className="text-purple-200">
                        Select the interests that resonate with you to discover your ideal tech career path
                    </p>
                </div>

                {!results ? (
                    <>
                        {/* Interest Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {options.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => toggle(opt.value)}
                                    className={`p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${selected.includes(opt.value)
                                            ? "bg-purple-600/40 border-purple-400 shadow-lg shadow-purple-500/30"
                                            : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40"
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{opt.icon}</div>
                                    <div className="text-white font-medium text-sm">
                                        {opt.label}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Selection Counter */}
                        <div className="text-center mb-6">
                            <span className={`text-sm ${selected.length >= 2 ? 'text-green-400' : 'text-yellow-400'}`}>
                                {selected.length} selected {selected.length < 2 && "(minimum 2)"}
                            </span>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6 text-center">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || selected.length < 2}
                                className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 ${loading || selected.length < 2
                                        ? "bg-gray-600 cursor-not-allowed opacity-50"
                                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/50"
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
                                    "Get My Career Match 🚀"
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Results Section */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                📊 Your Career Matches
                            </h2>

                            <div className="space-y-4">
                                {results.map((career, idx) => (
                                    <div
                                        key={career.domain}
                                        className={`p-5 rounded-xl transition-all ${idx === 0
                                                ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                                                : "bg-white/5 border border-white/10"
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">{career.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {career.title}
                                                    </h3>
                                                    {idx === 0 && (
                                                        <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                                                            TOP MATCH
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${idx === 0
                                                                ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                                                : "bg-purple-500"
                                                            }`}
                                                        style={{ width: `${career.percentage}%` }}
                                                    />
                                                </div>

                                                <p className="text-purple-200 text-sm mb-3">
                                                    {career.description}
                                                </p>

                                                {/* Resources */}
                                                <div className="flex flex-wrap gap-2">
                                                    {career.resources.map(resource => (
                                                        <span
                                                            key={resource}
                                                            className="bg-white/10 text-purple-200 text-xs px-3 py-1 rounded-full"
                                                        >
                                                            📚 {resource}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-2xl font-bold text-white">
                                                {career.percentage}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reset Button */}
                            <div className="text-center mt-8">
                                <button
                                    onClick={resetQuiz}
                                    className="px-6 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
                                >
                                    ← Take Quiz Again
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
