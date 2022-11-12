import express from 'express'
import { PORT } from './src/config.js'
import cors from 'cors'

import appRoutes from './src/routers/app.routers.js'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT)
console.log(`Server running on ${PORT}`)

app.post('/api/login', (req, res) => {
    const { us_user, us_password } = req.body
})

app.use(appRoutes)
app.use((req, res, next) => {
    res.status(404).json({ message: '404 not found' })
})
