import express from "express"
const app = express()

const port = process.env.PORT || 3000

app.get("/" ,(req, res) => {
    res.send("hello from typeScript")
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})