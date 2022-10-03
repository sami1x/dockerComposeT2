import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(bodyParser.text());
app.use(bodyParser.json());

mongoose.connect(`${process.env['MONGO_URL']}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} , );

const schema = {
  text: String,
};

const Task = mongoose.model("tasks", schema);

app.get("/", function (req, res) {
  res.sendFile("./public/index.html");
});

app.get("/getTasks", function (req, res) {
  
  const getTasks = async () => {
    let myTasks = [];
    const result = await Task.find();
    result.forEach((e) => {
      myTasks.push(e.text);
    });
    res.json(JSON.stringify(myTasks.reverse()));

  };

  getTasks();
});

app.post("/", function (req, res) {
  res.sendStatus(200);
  let toAdd = req.body;
  var myObj = JSON.parse(toAdd);

  const task = new Task({
    text: myObj.text,
  });
  task.save(function (err) {
    if (err) {
      console.log("/error");
    } else {
      console.log("/task added...");
    }
  });
});

app.post("/toRemove", function (req, res) {
  res.sendStatus(200);

  const getTasks = async () => {
    var myObj = JSON.parse(req.body);
    const result = await Task.deleteOne({ text: myObj.text});
  };
  getTasks();
});

app.listen(3000, () => {
  console.log("server running...");
});
