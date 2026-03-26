import express from 'express'
import 'dotenv/config'
import './db.js'
import usersRoutes from './UsersRoutes.js'
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/api/users/', usersRoutes)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT)
})

