const express = require("express");
const bodyParser = require("body-parser");
// Library required to parse html
const cheerio = require("cheerio");
// Library required to make HTTP calls
const request = require("request");

// Where to found routes
const classes = require("./routes/api/classes");
const fighters = require("./routes/api/fighters");

const app = express();

// Middleware required to parse body object
app.use(bodyParser.json());

// Use Routes
app.use('/api/classes', classes);
app.use('/api/fighters', fighters);

// @route   GET api/classes
// @desc    Description of the API wen going to the landing page
// @access  Public
app.get('/*', (req, res) => {
    res.json({operation: "Give description of API"});
});

// Pick whatever is in the environment variable or port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));