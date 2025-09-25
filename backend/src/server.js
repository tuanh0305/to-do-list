// server.js
import express from 'express'
import taskRoute from './routes/tasksRouter.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }))
}

app.use('/api/tasks', taskRoute)

if (process.env.NODE_ENV === 'production') {
    const distDir = path.join(__dirname, '..', '..', 'frontend', 'dist')
    app.use(express.static(distDir))

    // ✅ catch-all an toàn (KHÔNG phải chuỗi): không còn '*'
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(distDir, 'index.html'))
    })
}

// (tuỳ chọn) 404 cho request không rơi vào SPA
app.use((req, res) => res.status(404).json({ message: 'Not found' }))

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server chạy trên cổng ${PORT}`)
    })
})
