import express, { request, response } from 'express';
import taskRoute from './routes/tasksRouter.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoute);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`sever bat dau tren cong ${PORT}`);
    });
});