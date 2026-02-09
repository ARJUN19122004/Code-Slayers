import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

const domains = [
    { value: "web", label: "Web Development", color: "bg-blue-50 border-blue-200 hover:border-blue-400" },
    { value: "data", label: "Data Science", color: "bg-purple-50 border-purple-200 hover:border-purple-400" },
    { value: "ux", label: "UX Design", color: "bg-pink-50 border-pink-200 hover:border-pink-400" },
    { value: "cloud", label: "Cloud/DevOps", color: "bg-green-50 border-green-200 hover:border-green-400" },
    { value: "cybersecurity", label: "Cyber Security", color: "bg-red-50 border-red-200 hover:border-red-400" }
]

export default function Companies() {
    const [domain, setDomain] = useState(null)
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchCompanies = async (selectedDomain) => {
        setLoading(true)
        setDomain(selectedDomain)

        try {
            const res = await axios.get(
                `http://localhost:5000/companies/${selectedDomain}`
            )
            setCompanies(res.data)
        } catch (err) {
            console.error("Error fetching companies")
        } finally {
            setLoading(false)
        }
    }

    const resetSelection = () => {
        setDomain(null)
        setCompanies([])
    }

    const selectedDomainData = domains.find(d => d.value === domain)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-8">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Company Explorer
                    </h1>
                    <p className="text-gray-600">
                        Discover target companies and required skills
                    </p>
                </div>

                {!domain ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {domains.map((d) => (
                            <button
                                key={d.value}
                                onClick={() => fetchCompanies(d.value)}
                                className={`p-6 rounded-xl border-2 text-left transition-all ${d.color}`}
                            >
                                <div className="text-lg font-semibold text-gray-900">{d.label}</div>
                                <div className="text-gray-500 text-sm mt-1">View companies</div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Selected Domain */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                            <div className="flex items-center gap-3">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {selectedDomainData?.label}
                                    </h2>
                                    <p className="text-gray-500 text-sm">Target companies and required skills</p>
                                </div>
                            </div>
                        </div>

                        {/* Companies List */}
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                                <p className="text-gray-500">Loading companies...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {companies.map((company, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    {company.name || "Company"}
                                                </h3>
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-1">
                                                    {company.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="text-gray-500 text-sm mb-2">Required Skills:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {company.skills.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reset Button */}
                        <button
                            onClick={resetSelection}
                            className="w-full mt-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Choose Different Domain
                        </button>
                    </>
                )}
            </main>
        </div>
    )
}
