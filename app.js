const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");
const mongoose = require("mongoose");
const _  = require("lodash");
require("dotenv").config();

const app = express();
const listItems = ["Buy Food", "Cook Food", "Eat Food"];
const workList = [];
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const itemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemSchema);

const goToStore = new Item({
  name: "Go to store",
});
const buyFood = new Item({
  name: "Buy Food",
});
const cookFood = new Item({
  name: "Cook Food",
});

const defaultItems = [goToStore, buyFood, cookFood];

const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  res.redirect("/Today");
});

app.post("/", (req, res) => {
  let newItem = req.body.listItem;
  const listName = req.body.list;
  const newListItem = new Item({
    name: newItem,
  });
  List.findOne({ name: listName }, (err, foundList) => {
    foundList.items.push(newListItem);
    foundList.save();
    console.log(err);
    res.redirect("/" + listName);
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  const list = new List({
    name: customListName,
    items: defaultItems,
  });
  List.findOne({ name: customListName }, (err, listFound) => {
    if (!err) {
      if (listFound) {
        res.render("list", {
          listTitle: listFound.name,
          newListItems: listFound.items,
        });
      } else {
        list.save();
        res.redirect(`/${customListName}`);
      }
    }
  });
});

app.get("/delete/:listName/:id", (req, res) => {
  const delItemId = req.params.id;
  const listName = req.params.listName;
  List.updateOne(
    { name: listName },
    { $pull: { items: { _id: delItemId } } },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.redirect(`/${listName}`);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4040;
}

app.listen(port, () => {
  console.log(`Server has staretd on port ${port}`);
});
