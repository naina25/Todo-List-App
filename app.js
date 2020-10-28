const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get("/", (req,res) => {
    
})

app.listen("3000", () => {
    console.log("SErver has staretd on port 3000");
})