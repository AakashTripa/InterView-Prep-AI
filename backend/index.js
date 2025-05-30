import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sessionRequests from './routes/sessionRequests.js';
// import questionRoutes from './routes/questionRoutes.js';
// import generateInterviewQuestions from './controllers/generateInterviewQuestions.js';
// import generateConceptExplanation from './controllers/generateConceptExplanation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

//routes
app.use("/api/auth",authRoutes);

app.use("/api/sessions",sessionRequests);
// app.use("/api/questions",questionRoutes);

// app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
// app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);



// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
