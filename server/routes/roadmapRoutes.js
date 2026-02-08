const express = require("express")
const router = express.Router()

// Hardcoded templates (hackathon friendly)
const roadmaps = {
    web: [
        "HTML + CSS basics",
        "JavaScript fundamentals",
        "React / Frontend framework",
        "Build 2 projects (portfolio + CRUD app)",
        "Learn APIs + Backend basics",
        "Practice interviews + deploy projects"
    ],

    data: [
        "Python basics",
        "Numpy + Pandas",
        "Data visualization (Matplotlib/Seaborn)",
        "Machine Learning basics",
        "Kaggle projects",
        "ML interview prep"
    ],

    ux: [
        "Design principles + UX basics",
        "Figma tools",
        "User research + personas",
        "Wireframing + prototyping",
        "Build 3 case studies",
        "Portfolio + interviews"
    ],

    cloud: [
        "Linux basics",
        "Networking fundamentals",
        "AWS/Azure basics",
        "Docker + containers",
        "CI/CD pipelines",
        "Deploy real projects"
    ],

    cybersecurity: [
        "Networking fundamentals",
        "Linux commands",
        "OWASP basics",
        "Wireshark + packet analysis",
        "CTF challenges",
        "Security interview prep"
    ]
}


// GET roadmap by domain
router.get("/:domain", (req, res) => {
    const domain = req.params.domain

    const roadmap = roadmaps[domain]

    if (!roadmap) {
        return res.status(404).json({ message: "Domain not found" })
    }

    // convert into week format
    const formatted = roadmap.map((task, i) => ({
        week: i + 1,
        task
    }))

    res.json(formatted)
})

module.exports = router
