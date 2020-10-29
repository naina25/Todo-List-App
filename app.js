const express = require('express');
const bodyParser = require('body-parser');
const { static } = require('express');

const app = express();
let listItems = ["Buy Food", "Cook Food", "Eat Food"];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req,res) => {
    const today = new Date();
    const currentDay = today.getDay();
    let options = {
        weekday : "long",
        month : "long",
        day : "numeric"
    }
    let day = today.toLocaleDateString("en-US", options);

    res.render('list', {kindOfday:day , newListItems: listItems});
})

app.post('/', (req,res)=>{
    let item = req.body.listItem;
    listItems.push(item);
    console.log(listItems);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server has staretd on port 3000");
})