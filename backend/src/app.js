import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";
const app= express()

app.use(cors({
  origin: "*" ,
credentials:true
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json())


app.use(cookieParser());


import userRouter from './routes/upload.route.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/v1/files",userRouter)
app.use("//api/v1/files", express.static(path.join(__dirname, "/public")));


export {app}