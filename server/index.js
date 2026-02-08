const express = require("express")
const cors = require("cors")

const quizRoutes = require("./routes/quizRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/quiz", quizRoutes)

app.listen(5000, () => console.log("Server running on 5000"))
