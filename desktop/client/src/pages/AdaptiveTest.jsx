import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function AdaptiveTest() {
    const [questions, setQuestions] = useState([])
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState([])
    const [topicScores, setTopicScores] = useState(null)
    const [roadmap, setRoadmap] = useState([])
    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState("intro") // intro, test, results

    const fetchQuestions = async () => {
        setLoading(true)
        try {
            const res = await axios.get("http://localhost:5000/adaptive/test")
            setQuestions(res.data)
            setStage("test")
        } catch (err) {
            console.error("Error fetching questions")
        } finally {
            setLoading(false)
        }
    }

    const handleAnswer = (optionIdx) => {
        const q = questions[currentQ]
        const isCorrect = optionIdx === q.answer

        setAnswers([...answers, { topic: q.topic, correct: isCorrect }])

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1)
        } else {
            submitAnswers([...answers, { topic: q.topic, correct: isCorrect }])
        }
    }

    const submitAnswers = async (finalAnswers) => {
        setLoading(true)
        try {
            // Get topic scores
            const scoreRes = await axios.post("http://localhost:5000/adaptive/submit", {
                answers: finalAnswers
            })
            setTopicScores(scoreRes.data.topicScores)

            // Get adaptive plan
            const planRes = await axios.post("http://localhost:5000/adaptive/plan", {
                topicScores: scoreRes.data.topicScores
            })
            setRoadmap(planRes.data.roadmap)
            setStage("results")
        } catch (err) {
            console.error("Error submitting")
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score) => {
        if (score >= 70) return "bg-green-100 text-green-700 border-green-300"
        if (score >= 40) return "bg-yellow-100 text-yellow-700 border-yellow-300"
        return "bg-red-100 text-red-700 border-red-300"
    }

    const getScoreLabel = (score) => {
        if (score >= 70) return "Strong"
        if (score >= 40) return "Medium"
        return "Weak"
    }

    const resetTest = () => {
        setQuestions([])
        setCurrentQ(0)
        setAnswers([])
        setTopicScores(null)
        setRoadmap([])
        setStage("intro")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-8">

                {/* Intro Stage */}
                {stage === "intro" && (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Adaptive Learning Engine
                        </h1>
                        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                            Take a quick assessment to identify your weak areas and get a
                            personalized learning plan powered by AI.
                        </p>
                        <button
                            onClick={fetchQuestions}
                            disabled={loading}
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            {loading ? "Loading..." : "Start Assessment"}
                        </button>
                        <p className="text-gray-400 text-sm mt-4">10 questions • 5 topics • ~3 minutes</p>
                    </div>
                )}

                {/* Test Stage */}
                {stage === "test" && questions.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        {/* Progress */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Question {currentQ + 1} of {questions.length}</span>
                                <span>{questions[currentQ].topic}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {questions[currentQ].question}
                        </h2>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentQ].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                >
                                    <span className="inline-block w-8 h-8 bg-gray-100 rounded-full text-center leading-8 mr-3 font-medium">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading */}
                {loading && stage === "test" && (
                    <div className="text-center py-12">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-gray-500">Generating your personalized plan...</p>
                    </div>
                )}

                {/* Results Stage */}
                {stage === "results" && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Adaptive Learning Plan
                            </h1>
                            <p className="text-gray-600">
                                Plan generated based on your weaknesses
                            </p>
                        </div>

                        {/* Topic Scores */}
                        {topicScores && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Topic Scores</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(topicScores)
                                        .sort((a, b) => a[1] - b[1])
                                        .map(([topic, score]) => (
                                            <div
                                                key={topic}
                                                className={`p-4 rounded-xl border-2 ${getScoreColor(score)}`}
                                            >
                                                <div className="font-bold text-lg">{score}%</div>
                                                <div className="text-sm font-medium">{topic}</div>
                                                <div className="text-xs mt-1 opacity-75">{getScoreLabel(score)}</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Roadmap Timeline */}
                        {roadmap.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Personalized Plan</h3>
                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />

                                    <div className="space-y-4">
                                        {roadmap.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 pl-2">
                                                <div className="relative z-10 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow mt-1" />
                                                <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                    <div className="text-xs text-blue-600 font-bold mb-1">
                                                        WEEK {item.week}
                                                    </div>
                                                    <div className="text-gray-900 font-medium">
                                                        {item.task}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {roadmap.length === 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                                <h3 className="text-lg font-bold text-green-900">All Topics Mastered!</h3>
                                <p className="text-green-700">You've scored well in all areas.</p>
                            </div>
                        )}

                        {/* Pro Tips */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                            <h3 className="font-bold text-blue-900 mb-2">Pro Tips</h3>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Focus on one topic per week for best retention</li>
                                <li>• Practice with coding problems on LeetCode or HackerRank</li>
                                <li>• Retake this assessment after completing your plan</li>
                            </ul>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetTest}
                            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Take Assessment Again
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
