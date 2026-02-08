const express = require("express")
const router = express.Router()

// Career metadata with descriptions and resources
const careerData = {
    web: {
        title: "Web Development",
        icon: "🌐",
        description: "Build modern websites and web applications using HTML, CSS, JavaScript, and frameworks like React.",
        resources: ["freeCodeCamp", "The Odin Project", "MDN Web Docs"]
    },
    data: {
        title: "Data Science",
        icon: "📊",
        description: "Analyze data, build ML models, and extract insights using Python, SQL, and statistics.",
        resources: ["Kaggle", "DataCamp", "Coursera Data Science"]
    },
    ux: {
        title: "UX/UI Design",
        icon: "🎨",
        description: "Design beautiful, user-friendly interfaces and create seamless user experiences.",
        resources: ["Figma Learn", "Google UX Certificate", "Dribbble"]
    },
    cloud: {
        title: "Cloud & DevOps",
        icon: "☁️",
        description: "Deploy and manage applications on cloud platforms like AWS, Azure, and GCP.",
        resources: ["AWS Training", "Azure Learn", "Docker Docs"]
    },
    cybersecurity: {
        title: "Cybersecurity",
        icon: "🔒",
        description: "Protect systems and networks from cyber threats using security tools and practices.",
        resources: ["TryHackMe", "Hack The Box", "OWASP"]
    }
}

router.post("/recommend", (req, res) => {
    const { answers } = req.body

    // Score object
    const score = {
        web: 0,
        data: 0,
        ux: 0,
        cloud: 0,
        cybersecurity: 0
    }

    // Calculate scores based on answers
    answers.forEach(a => {
        if (a === "coding") score.web += 2
        if (a === "design") score.ux += 3
        if (a === "math") score.data += 3
        if (a === "statistics") score.data += 2
        if (a === "problem_solving") score.web += 2
        if (a === "writing") score.ux += 1
        if (a === "networks") score.cybersecurity += 3
        if (a === "servers") score.cloud += 3
        if (a === "automation") score.cloud += 2
    })

    // Calculate max possible score and percentages
    const maxScore = Math.max(...Object.values(score), 1)

    // Build results with percentages and metadata
    const results = Object.entries(score)
        .map(([domain, points]) => ({
            domain,
            percentage: Math.round((points / maxScore) * 100),
            ...careerData[domain]
        }))
        .sort((a, b) => b.percentage - a.percentage)

    res.json({ results })
})

module.exports = router
