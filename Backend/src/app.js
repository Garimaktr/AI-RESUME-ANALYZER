const express=require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app=express()
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);

// app.use(cors({
//     origin: (origin, callback) => {
//         callback(null, !origin || allowedOrigins.includes(origin))
//     },
//     credentials: true
// }))
app.use(cors({
    origin: allowedOrigins,
    credentials: true
})
)

// require all the routes
const authRouter=require("./routes/auth.routes")
const interviewRouter=require("./routes/interview.routes")

// using all the routes
app.use("/api/auth", authRouter)
app.use("/api/interview",interviewRouter)

module.exports =app