const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    const today = new Date();
    let day = "";
    if(today.getDay() === 0 || today.getDay() === 6){
        day = "Weekend";
    }
    else{
        day = "Weekday";
    }
    res.render('list', {kindOfday:day});
})

app.listen(3000, () => {
    console.log("Server has staretd on port 3000");
})