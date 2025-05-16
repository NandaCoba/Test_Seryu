import express from "express"
import cors from "cors"
import routes from "./src/routes/routes"

const app = express()
const port= process.env.APP_PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/v1",routes)

app.listen(port,() => {
    console.log("Save Palestine 🍉")
    console.log(`Server is listening on http://localhost:${port}/`)
})



