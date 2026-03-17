import express from 'express'
import 'dotenv/config'
import './db.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT)
})

