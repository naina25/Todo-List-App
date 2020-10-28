const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    const today = new Date();
    let day = "";
    const currentDay = today.getDay();

    switch (currentDay) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
        default:
            break;
    }

    res.render('list', {kindOfday:day});
})

app.listen(3000, () => {
    console.log("Server has staretd on port 3000");
})