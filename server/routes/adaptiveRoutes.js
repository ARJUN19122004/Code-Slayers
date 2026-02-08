const express = require("express")
const axios = require("axios")
const router = express.Router()

// Mock test questions database
const testQuestions = [
    // Arrays
    {
        topic: "Arrays",
        question: "What is time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1
    },
    {
        topic: "Arrays",
        question: "Which sorting algorithm has best average case O(n log n)?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
        answer: 2
    },
    // Linked List
    {
        topic: "Linked List",
        question: "What is the time complexity to insert at the beginning of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0
    },
    {
        topic: "Linked List",
        question: "Which pointer is used to detect a cycle in linked list?",
        options: ["Single pointer", "Two pointers (slow/fast)", "Three pointers", "No pointer needed"],
        answer: 1
    },
    // Trees
    {
        topic: "Trees",
        question: "What is the maximum number of nodes at level L in a binary tree?",
        options: ["L", "2L", "2^L", "2^(L+1)"],
        answer: 2
    },
    {
        topic: "Trees",
        question: "Which traversal visits nodes in sorted order for BST?",
        options: ["Preorder", "Inorder", "Postorder", "Level order"],
        answer: 1
    },
    // Graphs
    {
        topic: "Graphs",
        question: "Which algorithm is used to find shortest path in unweighted graph?",
        options: ["DFS", "BFS", "Dijkstra", "Floyd-Warshall"],
        answer: 1
    },
    {
        topic: "Graphs",
        question: "What is the time complexity of DFS for adjacency list?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
        answer: 2
    },
    // Dynamic Programming
    {
        topic: "Dynamic Programming",
        question: "Which approach does DP use to solve problems?",
        options: ["Divide and conquer", "Optimal substructure + overlapping subproblems", "Greedy choice", "Backtracking"],
        answer: 1
    },
    {
        topic: "Dynamic Programming",
        question: "What is the time complexity of 0/1 Knapsack using DP?",
        options: ["O(n)", "O(W)", "O(n × W)", "O(2^n)"],
        answer: 2
    }
]

// GET /test - Return mock test questions
router.get("/test", (req, res) => {
    res.json(testQuestions)
})

// POST /submit - Calculate topic-wise scores
router.post("/submit", (req, res) => {
    const { answers } = req.body

    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ message: "Invalid answers format" })
    }

    // Group by topic and calculate scores
    const topicStats = {}

    answers.forEach(({ topic, correct }) => {
        if (!topicStats[topic]) {
            topicStats[topic] = { total: 0, correct: 0 }
        }
        topicStats[topic].total++
        if (correct) topicStats[topic].correct++
    })

    // Calculate percentage per topic
    const topicScores = {}
    for (const topic in topicStats) {
        const { total, correct } = topicStats[topic]
        topicScores[topic] = Math.round((correct / total) * 100)
    }

    res.json({ topicScores })
})

// Fallback: Generate rule-based plan
function generateRuleBasedPlan(topicScores) {
    const plan = []
    let week = 1

    const sortedTopics = Object.entries(topicScores)
        .sort((a, b) => a[1] - b[1])

    sortedTopics.forEach(([topic, score]) => {
        if (score < 40) {
            plan.push({ week: week++, task: `${topic} fundamentals and basics` })
            plan.push({ week: week++, task: `${topic} practice problems` })
        } else if (score <= 70) {
            plan.push({ week: week++, task: `${topic} revision and advanced concepts` })
        }
    })

    return plan
}

// AI-powered plan generation
async function generateAIPlan(weakTopics) {
    try {
        const prompt = `Create beginner-friendly weekly learning tasks for these weak topics: ${weakTopics.join(", ")}. Return JSON list of {week, task}. Keep concise. Return only valid JSON array.`

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
                timeout: 15000
            }
        )

        const content = response.data.choices[0].message.content

        // Extract JSON from response
        const jsonMatch = content.match(/\[.*\]/s)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return null
    } catch (err) {
        console.log("AI plan generation failed:")
        console.log("  Error:", err.message)
        if (err.response) {
            console.log("  Status:", err.response.status)
            console.log("  Data:", JSON.stringify(err.response.data))
        }
        return null
    }
}

// POST /plan - Generate adaptive roadmap
router.post("/plan", async (req, res) => {
    const { topicScores } = req.body

    if (!topicScores || typeof topicScores !== "object") {
        return res.status(400).json({ message: "Invalid topicScores format" })
    }

    // Get weak topics (score <= 70)
    const weakTopics = Object.entries(topicScores)
        .filter(([_, score]) => score <= 70)
        .sort((a, b) => a[1] - b[1])
        .map(([topic]) => topic)

    if (weakTopics.length === 0) {
        return res.json({ roadmap: [], message: "All topics mastered!" })
    }

    // Try AI-generated plan first
    const aiPlan = await generateAIPlan(weakTopics)

    if (aiPlan && aiPlan.length > 0) {
        res.json({ roadmap: aiPlan, source: "ai" })
    } else {
        // Fallback to rule-based
        const roadmap = generateRuleBasedPlan(topicScores)
        res.json({ roadmap, source: "rule-based" })
    }
})

module.exports = router
