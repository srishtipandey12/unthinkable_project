import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";
const app= express()

// all configuratons and its settings
app.use(cors({
  origin: "*" ,
credentials:true
}))
//to limit on json data
//to deal with url data
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json())

// app.use(express.static("public"))
//for cookie parser
app.use(cookieParser());

// routes import
import userRouter from './routes/upload.route.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//routes declaration

app.use("/api/v1/files",userRouter)
app.use("//api/v1/files", express.static(path.join(__dirname, "/public")));

// app.get('/', (req, res) => {
//    res.send('POST request to the homepage')
// })
//http://localhost:8000/api/v1/users/register
export {app}