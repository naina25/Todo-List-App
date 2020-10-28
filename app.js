const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let listItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

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
    let newLI = document.
    let item = req.body.listItem;
    listItems.push(item);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server has staretd on port 3000");
})