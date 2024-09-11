import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
const app = express();
import url from "url";
import dotenv from 'dotenv/config'

const PORT = process.env.PORT ||  3000;



//routes
import PersonRouter from './routes/person.router.js';
import MenuRouter from './routes/menu.router.js';

//bodyParser Middleware
app.use(bodyParser.json());

app.use('/person',PersonRouter);
app.use('/menu',MenuRouter);

app.get("/", (req, res) => {
  res.json("welcome to nodejs server and mongodb connection ");
});







//server
app.listen(PORT, () => {
  console.log("Node js server is running on port 3000");
});
