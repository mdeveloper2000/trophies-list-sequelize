const express = require("express")
const path = require("path")
const { router } = require("./routes/routes")

const app = express()
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("assets"))
app.use("/css", express.static(path.join(__dirname, "node_modules/bulma/css")))
app.use("/font", express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")))
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`)
})