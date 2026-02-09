import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Resume() {
    const [file, setFile] = useState(null)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a PDF file first")
            return
        }

        const formData = new FormData()
        formData.append("resume", file)

        setLoading(true)
        setError(null)

        try {
            const res = await axios.post(
                "http://localhost:5000/resume/analyze",
                formData
            )
            setResult(res.data)
        } catch (err) {
            console.error("Resume analysis error:", err)
            setError(err.response?.data?.message || err.response?.data?.error || "Error analyzing resume. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const resetAnalysis = () => {
        setFile(null)
        setResult(null)
        setError(null)
    }

    const getScoreColor = (score) => {
        if (score >= 70) return "text-green-600"
        if (score >= 40) return "text-yellow-600"
        return "text-red-600"
    }

    const getScoreBg = (score) => {
        if (score >= 70) return "bg-green-50 border-green-200"
        if (score >= 40) return "bg-yellow-50 border-yellow-200"
        return "bg-red-50 border-red-200"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-8">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Resume ATS Analyzer
                    </h1>
                    <p className="text-gray-600">
                        Upload your resume and get AI-powered feedback
                    </p>
                </div>

                {!result ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                            <p className="text-gray-700 mb-4 font-medium">
                                {file ? file.name : "Drop your resume here or click to browse"}
                            </p>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                    setFile(e.target.files[0])
                                    setError(null)
                                }}
                                className="hidden"
                                id="resume-upload"
                            />
                            <label
                                htmlFor="resume-upload"
                                className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors border border-gray-300"
                            >
                                {file ? "Change File" : "Select PDF"}
                            </label>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center text-sm">
                                {error}
                            </div>
                        )}

                        {/* Analyze Button */}
                        <button
                            onClick={handleUpload}
                            disabled={loading || !file}
                            className={`w-full mt-6 py-3 rounded-lg font-medium transition-all ${loading || !file
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Analyzing..." : "Analyze Resume"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">

                        {/* Score Card */}
                        <div className={`rounded-xl border-2 p-8 text-center ${getScoreBg(result.score)}`}>
                            <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                                {result.score}/100
                            </div>
                            <div className="text-gray-600 text-lg mt-2">ATS Score</div>
                        </div>

                        {/* Found Keywords */}
                        {result.found && result.found.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-green-700 mb-3">
                                    Keywords Found ({result.found.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.found.map((k, i) => (
                                        <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Missing Keywords */}
                        {result.missing && result.missing.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-red-700 mb-3">
                                    Missing Keywords ({result.missing.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.missing.map((k, i) => (
                                        <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggestions */}
                        {result.suggestions && result.suggestions.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-yellow-700 mb-3">
                                    Suggestions
                                </h3>
                                <ul className="space-y-2">
                                    {result.suggestions.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700">
                                            <span className="text-yellow-500">•</span>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Reset Button */}
                        <button
                            onClick={resetAnalysis}
                            className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Analyze Another Resume
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
