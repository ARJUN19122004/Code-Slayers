const express = require("express")
const router = express.Router()

// simple static DB (hackathon perfect)
const companies = {
    web: [
        {
            name: "Google",
            type: "MNC",
            skills: ["React", "System Design", "DSA"]
        },
        {
            name: "Razorpay",
            type: "Startup",
            skills: ["Node.js", "APIs", "Databases"]
        },
        {
            name: "Zoho",
            type: "Product Company",
            skills: ["JavaScript", "Backend"]
        }
    ],

    data: [
        {
            name: "Flipkart",
            type: "MNC",
            skills: ["Python", "ML", "SQL"]
        },
        {
            name: "Fractal Analytics",
            type: "Analytics Company",
            skills: ["Statistics", "Pandas", "ML"]
        }
    ],

    ux: [
        {
            name: "Swiggy",
            type: "Startup",
            skills: ["Figma", "User Research", "Prototyping"]
        },
        {
            name: "Adobe",
            type: "MNC",
            skills: ["Design Systems", "UX Research"]
        }
    ],

    cloud: [
        {
            name: "Amazon",
            type: "Cloud Provider",
            skills: ["AWS", "DevOps", "Docker"]
        },
        {
            name: "Infosys",
            type: "Service Company",
            skills: ["Azure", "CI/CD"]
        }
    ],

    cybersecurity: [
        {
            name: "",
            type: "Automotive Security",
            skills: ["Embedded Security", "C++", "Networking"]
        },
        {
            name: "",
            type: "Space Research",
            skills: ["Systems Security", "Linux", "Protocols"]
        }
    ]
}


// GET /companies/:domain
router.get("/:domain", (req, res) => {
    const domain = req.params.domain

    if (!companies[domain]) {
        return res.status(404).json({ message: "No companies found" })
    }

    res.json(companies[domain])
})

module.exports = router
