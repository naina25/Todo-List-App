const express = require('express');
const bodyParser = require('body-parser');
const { static } = require('express');
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");

const app = express();
const listItems = ["Buy Food", "Cook Food", "Eat Food"];
const workList = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/todolistDb', {useNewUrlParser: true, useUnifiedTopology: true });
const itemSchema = new mongoose.Schema({
  name: String
})
const Item = mongoose.model("Item", itemSchema);

const goToStore = new Item({
  name: "Go to store"
})
const buyFood = new Item({
  name: "Buy Food"
})
const cookFood = new Item({
  name: "Cook Food"
})

const defaultItems = [goToStore, buyFood, cookFood];

app.get("/", function(req, res) {
    Item.find((err, results)=> {
        if(err){
        console.log(err);
        }
        else{
            if(results.length === 0){
                Item.insertMany(defaultItems, err => {
                    if(err){
                      console.log(err);
                    }else{
                      console.log("items are successfully added to the database");
                    }
                  })
                res.redirect("/");
            }
            else{
                const day = date.getDate();
                res.render("list", {listTitle: day, newListItems: results});
            }
            
        }
    })
});

app.post('/', (req,res)=>{
    let newItem = req.body.listItem;
    const newListItem = new Item({
        name: newItem
      })
    newListItem.save();
    res.redirect("/");
})

app.get("/work", (req,res)=>{
    res.render('list', {listTitle:"Work List" , newListItems: workList});
})

app.post("/work",(req,res)=>{
    let item = req.body.listItem;
    workList.push(item);
    res.redirect("/work");
})
app.listen(4000, () => {
    console.log("Server has staretd on port 4000");
})