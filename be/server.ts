import express from "express"
import { authRoute } from "./routes/auth"
import { userRoute } from "./routes/user"
const passport = require("passport")
require("./Strategy/accessToken")
const app = express()


app.use(express.json())
const port = process.env.PORT || 3000

app.get("/" ,(req, res) => {
    res.send("hello from typeScript")
})
app.use("/auth", authRoute)
app.use("/users",passport.authenticate('jwt', { session: false }), userRoute)
// app.use("/users", userRoute)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})