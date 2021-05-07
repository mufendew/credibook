require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require("./routes")
const errorHandler = require('./middleware/errHandle')
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(router)
app.use(errorHandler)




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// module.exports = app