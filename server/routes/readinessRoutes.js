const express = require("express")
const router = express.Router()

// simple readiness calculator
router.post("/", (req, res) => {
    const { resumeScore, skillScore, projects } = req.body

    const projectScore = Math.min(projects * 20, 100)

    const finalScore = Math.round(
        resumeScore * 0.4 +
        skillScore * 0.4 +
        projectScore * 0.2
    )

    let level = "Beginner"

    if (finalScore > 70) level = "Interview Ready"
    else if (finalScore > 40) level = "Intermediate"

    res.json({
        finalScore,
        level,
        breakdown: {
            resumeScore,
            skillScore,
            projectScore
        }
    })
})

module.exports = router
