require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const quizRoutes = require("./routes/quizRoutes")
const roadmapRoutes = require("./routes/roadmapRoutes")
const resumeRoutes = require("./routes/resumeRoutes")
const readinessRoutes = require("./routes/readinessRoutes")
const companyRoutes = require("./routes/companyRoutes")
const skillRoutes = require("./routes/skillRoutes")
const adaptiveRoutes = require("./routes/adaptiveRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/quiz", quizRoutes)
app.use("/roadmap", roadmapRoutes)
app.use("/resume", resumeRoutes)
app.use("/readiness", readinessRoutes)
app.use("/companies", companyRoutes)
app.use("/skills", skillRoutes)
app.use("/adaptive", adaptiveRoutes)
app.use("/auth", authRoutes)

connectDB()

app.listen(5000, () => console.log("Server running on 5000"))


