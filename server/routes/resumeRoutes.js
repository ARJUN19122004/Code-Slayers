const express = require("express")
const multer = require("multer")
const pdfParse = require("pdf-parse")

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

// simple keyword list (edit later)
const keywords = [
    "react",
    "node",
    "mongodb",
    "sql",
    "api",
    "javascript",
    "python",
    "aws",
    "docker",
    "git"
]

router.post("/analyze", upload.single("resume"), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const data = await pdfParse(req.file.buffer)
        const text = data.text.toLowerCase()

        let score = 0
        const found = []
        const missing = []

        // keyword scoring
        keywords.forEach(k => {
            if (text.includes(k)) {
                score += 5
                found.push(k)
            } else {
                missing.push(k)
            }
        })

        // formatting checks
        const suggestions = []

        if (!text.includes("project")) suggestions.push("Add Projects section")
        if (!text.includes("experience")) suggestions.push("Add Experience section")
        if (!text.includes("%") && !text.match(/\d+/))
            suggestions.push("Add numbers/metrics to achievements")
        if (text.length < 300)
            suggestions.push("Resume too short — add more details")

        // cap score
        score = Math.min(score, 100)

        res.json({
            score,
            found,
            missing: missing.slice(0, 5),
            suggestions
        })

    } catch (err) {
        console.error("Resume parse error:", err)
        res.status(500).json({ message: "Error parsing resume" })
    }
})

module.exports = router
