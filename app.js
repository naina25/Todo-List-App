const express = require('express');
const bodyParser = require('body-parser');
const { static } = require('express');
const date = require(__dirname + "/date.js")

const app = express();
let listItems = ["Buy Food", "Cook Food", "Eat Food"];
let workList = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req,res) => {
    let day = date();
    res.render('list', {listTitle:day , newListItems: listItems});
})

app.post('/', (req,res)=>{
    console.log(req.body);
    let item = req.body.listItem;
    // if statement for checking if the post request is for home route or for work route
    if(req.body.list === "Work"){
        workList.push(item);
        res.redirect("/work");
    }else{
        listItems.push(item);
        res.redirect("/");
    }
    
})

app.get("/work", (req,res)=>{
    res.render('list', {listTitle:"Work List" , newListItems: workList});
})

app.post("/work",(req,res)=>{
    let item = req.body.listItem;
    workList.push(item);
    res.redirect("/work");
})



app.listen(3000, () => {
    console.log("Server has staretd on port 3000");
})