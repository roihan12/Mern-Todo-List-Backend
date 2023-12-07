import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const PORT = 3000;


const {
  MONGODB_PASSWORD,
  MONGODB_USERNAME ,
  MONGODB_DBNAME 
} =  process.env;


app.use(cors)

const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.atpaeyo.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/about", (req: Request, res: Response) => {
  res.send("This is the about page");
});

mongoose.set("strictQuery", false);
mongoose.connect(uri)
  .then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.info(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((error)=>{
    console.log(` ${error}Couldn't connect to MongoDB`);
  })

