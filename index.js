import express from "express";
import dotenv from "dotenv"
import cors from 'cors';

import authStudentRouter   from "./api/routes/auth.student.routes.js"
import authProfessorRouter from "./api/routes/auth.professor.routes.js"
import studentRouter       from "./api/routes/student.routes.js"
import professorRouter     from "./api/routes/professor.routes.js"
import postRouter from "./api/routes/disciplines.routes.js"
import connectDatabase from "./api/database/manageDB.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 3700;
const allowedOrigin = process.env.WEBSITE_URL;

connectDatabase();
app.use(cors({
    origin: [`${allowedOrigin}`],
    methods: ["GET", "POST","PATCH","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/students",studentRouter);
app.use("/professors",professorRouter);
app.use("/login/student",authStudentRouter);
app.use("/login/professor",authProfessorRouter);
app.use("/disciplines",postRouter);


app.listen(port,()=>console.log(`[Server Online]: {
                                               PORT:${port}
                                                  }
                              `));
