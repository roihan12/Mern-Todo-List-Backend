import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
const app = express();

const PORT = process.env.PORT || 8080;

const { MONGODB_PASSWORD, MONGODB_USERNAME, MONGODB_DBNAME } = process.env;

const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.atpaeyo.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`;
app.use(cors());
app.use(routes);


app.get('/', (req, res) => {
  res.json({ ok: "Hello World" });
});
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.info(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(` ${error}Couldn't connect to MongoDB`);
  });
