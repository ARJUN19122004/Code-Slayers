import Navbar from "../components/Navbar"

const pricingData = {
    free: {
        name: "Free",
        price: "₹0",
        period: "forever",
        description: "Get started with basic career guidance",
        features: [
            { text: "Career Interest Quiz", included: true },
            { text: "Basic Learning Roadmap", included: true },
            { text: "1 Resume ATS Scan", included: true },
            { text: "Limited Skill Assessment", included: true },
            { text: "Adaptive Learning", included: false },
            { text: "Unlimited ATS Scans", included: false },
            { text: "AI Resume Rewriting", included: false },
            { text: "Mock Interviews", included: false },
            { text: "JD → Projects Generator", included: false },
            { text: "Company Recommendations", included: false },
        ],
        cta: "Get Started Free",
        popular: false
    },
    premium: {
        name: "Premium",
        price: "₹199",
        period: "/month",
        yearlyPrice: "₹999/year",
        description: "Unlock all AI-powered features",
        features: [
            { text: "Career Interest Quiz", included: true },
            { text: "Basic Learning Roadmap", included: true },
            { text: "Unlimited Resume ATS Scans", included: true },
            { text: "Full Skill Assessment", included: true },
            { text: "Adaptive Learning AI", included: true },
            { text: "AI Resume Bullet Rewriting", included: true },
            { text: "Mock Interview Practice", included: true },
            { text: "JD → Projects Generator", included: true },
            { text: "Personalized Company Match", included: true },
            { text: "Placement Readiness Tracking", included: true },
        ],
        cta: "Upgrade to Premium",
        popular: true
    }
}

const revenueStreams = [
    {
        title: "Student Subscription",
        description: "₹199/month or ₹999/year",
        highlight: "Primary Revenue"
    },
    {
        title: "Resume Pro Add-ons",
        description: "₹49/scan • ₹99/AI rewrite",
        highlight: "Microtransactions"
    },
    {
        title: "College Partnerships",
        description: "₹50,000/year campus license",
        highlight: "B2B Model"
    },
    {
        title: "Company Hiring Portal",
        description: "₹10,000/hiring campaign",
        highlight: "Future Scaling"
    }
]

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-12">

                {/* Hero */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-blue-500/20 text-blue-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
                        Freemium Model
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Start free and upgrade when you're ready to unlock the full power of AI-driven career guidance
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">

                    {/* Free Plan */}
                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 relative">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">{pricingData.free.name}</h3>
                            <p className="text-gray-400 text-sm">{pricingData.free.description}</p>
                        </div>

                        <div className="mb-6">
                            <span className="text-5xl font-bold text-white">{pricingData.free.price}</span>
                            <span className="text-gray-400 ml-2">{pricingData.free.period}</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {pricingData.free.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    {feature.included ? (
                                        <span className="text-green-400">✓</span>
                                    ) : (
                                        <span className="text-gray-600">✗</span>
                                    )}
                                    <span className={feature.included ? "text-gray-300" : "text-gray-600"}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-3 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-700 transition">
                            {pricingData.free.cta}
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur border-2 border-blue-500 rounded-2xl p-8 relative">
                        {/* Popular Badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                                MOST POPULAR
                            </span>
                        </div>

                        <div className="mb-6 mt-2">
                            <h3 className="text-xl font-bold text-white mb-2">{pricingData.premium.name}</h3>
                            <p className="text-gray-400 text-sm">{pricingData.premium.description}</p>
                        </div>

                        <div className="mb-2">
                            <span className="text-5xl font-bold text-white">{pricingData.premium.price}</span>
                            <span className="text-gray-400 ml-2">{pricingData.premium.period}</span>
                        </div>
                        <p className="text-green-400 text-sm mb-6">or {pricingData.premium.yearlyPrice} (save 58%)</p>

                        <ul className="space-y-3 mb-8">
                            {pricingData.premium.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">{feature.text}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
                            {pricingData.premium.cta}
                        </button>
                    </div>
                </div>

                {/* Revenue Projections */}
                <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                        Revenue Projections
                    </h2>
                    <p className="text-gray-400 text-center mb-8">
                        Scalable business model with multiple revenue streams
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        {revenueStreams.map((stream, idx) => (
                            <div key={idx} className="bg-gray-800/50 rounded-xl p-5 text-center border border-gray-700">
                                <h3 className="text-white font-semibold mb-1">{stream.title}</h3>
                                <p className="text-gray-400 text-sm mb-2">{stream.description}</p>
                                <span className="inline-block bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                                    {stream.highlight}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-800">
                Built by Code Slayers | CELESTIAL BUILDATHON 2026
            </footer>
        </div>
    )
}
