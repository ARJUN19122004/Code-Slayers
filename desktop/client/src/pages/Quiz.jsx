import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

const options = [
    { label: "I enjoy coding", value: "coding" },
    { label: "I love design & creativity", value: "design" },
    { label: "I'm good at math", value: "math" },
    { label: "I enjoy statistics", value: "statistics" },
    { label: "I like solving problems", value: "problem_solving" },
    { label: "I enjoy writing/storytelling", value: "writing" },
    { label: "Interested in networking/security", value: "networks" },
    { label: "I like servers & cloud", value: "servers" },
    { label: "Love automation & DevOps", value: "automation" }
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
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-8">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Career Interest Quiz
                    </h1>
                    <p className="text-gray-600">
                        Select the interests that resonate with you to discover your ideal tech career path
                    </p>
                </div>

                {!results ? (
                    <>
                        {/* Interest Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                            {options.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => toggle(opt.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${selected.includes(opt.value)
                                        ? "bg-purple-50 border-purple-400"
                                        : "bg-white border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="text-gray-900 font-medium text-sm">
                                        {opt.label}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Selection Counter */}
                        <div className="text-center mb-4">
                            <span className={`text-sm ${selected.length >= 2 ? 'text-green-600' : 'text-yellow-600'}`}>
                                {selected.length} selected {selected.length < 2 && "(minimum 2)"}
                            </span>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-center text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || selected.length < 2}
                                className={`px-8 py-3 rounded-lg font-medium transition-all ${loading || selected.length < 2
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                            >
                                {loading ? "Analyzing..." : "Get My Career Match"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Results Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                Your Career Matches
                            </h2>

                            <div className="space-y-4">
                                {results.map((career, idx) => (
                                    <div
                                        key={career.domain}
                                        className={`p-5 rounded-xl border-2 ${idx === 0
                                            ? "bg-yellow-50 border-yellow-300"
                                            : "bg-gray-50 border-gray-200"
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {career.title}
                                                    </h3>
                                                    {idx === 0 && (
                                                        <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                                                            TOP MATCH
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${idx === 0 ? "bg-yellow-500" : "bg-blue-500"
                                                            }`}
                                                        style={{ width: `${career.percentage}%` }}
                                                    />
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3">
                                                    {career.description}
                                                </p>

                                                {/* Resources */}
                                                <div className="flex flex-wrap gap-2">
                                                    {career.resources.map(resource => (
                                                        <span
                                                            key={resource}
                                                            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                                                        >
                                                            {resource}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-2xl font-bold text-gray-900">
                                                {career.percentage}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reset Button */}
                            <div className="text-center mt-6">
                                <button
                                    onClick={resetQuiz}
                                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Take Quiz Again
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
