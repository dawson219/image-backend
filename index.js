import express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({limit: "20mb"}))

app.get("/", (req,res)=>{
    res.send("Hello API is running")
})

app.use("/api/unsplash", routes)

const startServer = async () => {
    app.listen(8080, ()=>{
        console.log("App is running on PORT 8080")
    })
}

startServer();