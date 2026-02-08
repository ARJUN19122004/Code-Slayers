const express = require("express")
const axios = require("axios")
const router = express.Router()

// Skill database with importance, difficulty, and frequency
const skillsDB = {
    web: [
        { name: "HTML/CSS", importance: 5, difficulty: 1, frequency: 0.9 },
        { name: "JavaScript", importance: 5, difficulty: 2, frequency: 0.95 },
        { name: "React", importance: 4, difficulty: 3, frequency: 0.8 },
        { name: "Node.js", importance: 4, difficulty: 2, frequency: 0.75 },
        { name: "Git", importance: 4, difficulty: 1, frequency: 0.9 },
        { name: "System Design", importance: 5, difficulty: 4, frequency: 0.7 },
        { name: "TypeScript", importance: 3, difficulty: 2, frequency: 0.6 },
        { name: "REST APIs", importance: 4, difficulty: 2, frequency: 0.85 }
    ],
    data: [
        { name: "Python", importance: 5, difficulty: 2, frequency: 0.95 },
        { name: "Pandas", importance: 5, difficulty: 2, frequency: 0.9 },
        { name: "SQL", importance: 5, difficulty: 2, frequency: 0.85 },
        { name: "Machine Learning", importance: 4, difficulty: 4, frequency: 0.7 },
        { name: "Statistics", importance: 5, difficulty: 3, frequency: 0.8 },
        { name: "Data Visualization", importance: 4, difficulty: 2, frequency: 0.75 },
        { name: "NumPy", importance: 4, difficulty: 2, frequency: 0.85 },
        { name: "Deep Learning", importance: 3, difficulty: 5, frequency: 0.5 }
    ],
    ux: [
        { name: "Figma", importance: 5, difficulty: 2, frequency: 0.9 },
        { name: "User Research", importance: 5, difficulty: 3, frequency: 0.85 },
        { name: "Wireframing", importance: 4, difficulty: 1, frequency: 0.9 },
        { name: "Prototyping", importance: 4, difficulty: 2, frequency: 0.85 },
        { name: "Design Systems", importance: 4, difficulty: 3, frequency: 0.7 },
        { name: "Usability Testing", importance: 5, difficulty: 2, frequency: 0.8 },
        { name: "Information Architecture", importance: 4, difficulty: 3, frequency: 0.65 },
        { name: "Accessibility", importance: 4, difficulty: 2, frequency: 0.6 }
    ],
    cloud: [
        { name: "AWS", importance: 5, difficulty: 3, frequency: 0.85 },
        { name: "Docker", importance: 5, difficulty: 2, frequency: 0.9 },
        { name: "Kubernetes", importance: 4, difficulty: 4, frequency: 0.7 },
        { name: "Linux", importance: 5, difficulty: 2, frequency: 0.95 },
        { name: "CI/CD", importance: 5, difficulty: 2, frequency: 0.85 },
        { name: "Terraform", importance: 4, difficulty: 3, frequency: 0.65 },
        { name: "Networking", importance: 4, difficulty: 3, frequency: 0.75 },
        { name: "Monitoring", importance: 4, difficulty: 2, frequency: 0.8 }
    ],
    cybersecurity: [
        { name: "Network Security", importance: 5, difficulty: 3, frequency: 0.9 },
        { name: "Linux", importance: 5, difficulty: 2, frequency: 0.95 },
        { name: "Python", importance: 4, difficulty: 2, frequency: 0.85 },
        { name: "Penetration Testing", importance: 5, difficulty: 4, frequency: 0.75 },
        { name: "Security Tools", importance: 4, difficulty: 2, frequency: 0.85 },
        { name: "Incident Response", importance: 5, difficulty: 3, frequency: 0.7 },
        { name: "Cryptography", importance: 4, difficulty: 4, frequency: 0.6 },
        { name: "Compliance", importance: 4, difficulty: 2, frequency: 0.65 }
    ]
}

// Default reasons as fallback
const defaultReasons = {
    "HTML/CSS": "Foundation of all web pages",
    "JavaScript": "Used in most web development jobs",
    "React": "Most popular frontend framework",
    "Node.js": "Essential for full-stack development",
    "Git": "Required for team collaboration",
    "System Design": "Key for senior engineering roles",
    "TypeScript": "Growing industry adoption for type safety",
    "REST APIs": "Standard for web services",
    "Python": "Primary language for data science",
    "Pandas": "Essential for data manipulation",
    "SQL": "Required for data access and querying",
    "Machine Learning": "Core skill for data scientists",
    "Statistics": "Foundation for data analysis",
    "Data Visualization": "Key for presenting insights",
    "NumPy": "Essential for numerical computing",
    "Deep Learning": "Advanced ML applications",
    "Figma": "Industry standard design tool",
    "User Research": "Foundation of good UX design",
    "Wireframing": "Essential for planning designs",
    "Prototyping": "Key for testing ideas quickly",
    "Design Systems": "Important for scalable design",
    "Usability Testing": "Validates design decisions",
    "Information Architecture": "Organizes content effectively",
    "Accessibility": "Growing legal and ethical requirement",
    "AWS": "Market leader in cloud services",
    "Docker": "Essential for containerization",
    "Kubernetes": "Standard for container orchestration",
    "Linux": "Foundation for cloud and server ops",
    "CI/CD": "Core DevOps practice",
    "Terraform": "Leading infrastructure as code tool",
    "Networking": "Critical for cloud architecture",
    "Monitoring": "Essential for system reliability",
    "Network Security": "Foundation of cybersecurity",
    "Penetration Testing": "Core offensive security skill",
    "Security Tools": "Essential for daily security work",
    "Incident Response": "Critical for threat defense",
    "Cryptography": "Foundation for secure systems",
    "Compliance": "Growing regulatory requirement"
}

// Function to get AI-generated reasons
async function getAIReasons(domain, skillList) {
    try {
        const prompt = `Explain briefly why these skills are important for a beginner in ${domain}: ${skillList.join(", ")}. Return one line reason per skill in the format "SkillName: reason". Keep each reason under 10 words.`

        const response = await axios.post(
            "https://api.moonshot.cn/v1/chat/completions",
            {
                model: "moonshot-v1-8k",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.KIMI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000
            }
        )

        const content = response.data.choices[0].message.content
        const reasons = {}

        // Parse response - each line is "SkillName: reason"
        content.split("\n").forEach(line => {
            const match = line.match(/^(.+?):\s*(.+)$/)
            if (match) {
                reasons[match[1].trim()] = match[2].trim()
            }
        })

        return reasons
    } catch (err) {
        console.log("AI API unavailable, using default reasons")
        return null
    }
}

// GET /:domain - Get prioritized skills for a domain
router.get("/:domain", async (req, res) => {
    const domain = req.params.domain

    if (!skillsDB[domain]) {
        return res.status(404).json({ message: "Domain not found" })
    }

    // Calculate priority score for each skill
    const skillsWithScores = skillsDB[domain].map(skill => ({
        skill: skill.name,
        score: Number(((skill.importance * skill.frequency) / skill.difficulty).toFixed(2))
    }))

    // Sort by score descending
    skillsWithScores.sort((a, b) => b.score - a.score)

    // Get skill names for AI prompt
    const skillNames = skillsWithScores.map(s => s.skill)

    // Try to get AI-generated reasons
    const aiReasons = await getAIReasons(domain, skillNames)

    // Assign priority labels and reasons
    const result = skillsWithScores.map((skill, idx) => ({
        ...skill,
        priority: idx < 3 ? "High" : idx < 6 ? "Medium" : "Low",
        reason: aiReasons?.[skill.skill] || defaultReasons[skill.skill] || "Common industry requirement"
    }))

    res.json(result)
})

module.exports = router
