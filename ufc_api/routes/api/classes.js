const express = require("express");
const request = require("request");
const cheerio = require('cheerio')

const router = express.Router();

// @route   GET api/classes
// @desc    Send a request to the ufc website and get a list of the current weight classes
// @access  Public
router.get('/', (req, res) => {
    //res.json({operation: "List of current weight classes"});
    request('https://www.ufc.com/athletes/all?filters%5B0%5D=status%3A23', function (error, response, body) {
        if((response && response.statusCode) === 200) {
            const $ = cheerio.load(body);
            const weightclasses = $('#block-mainpagecontent div:nth-child(1) div.block-facet--links:nth-child(2) div.facets-widget-links ul li.facet-item').text();
            const arr = weightclasses.trimRight().split('\n');
            res.json({classes: [
                {"Mens": arr.slice(0,arr.length-4)}
                ,{"Womens": arr.slice(arr.length-4,arr.length)
                }]
            });
        } else {
            res.json({classes: "Error"});
        }
    });
});

// @route   GET api/classes/class
// @desc    Send a request to the ufc website and get a list of top fighters in a weight class given a class
// @access  Public
router.get('/:class', (req, res) => {
    //res.json({operation: "Top fighters of " + req.params.class});
    request('https://www.ufc.com/rankings', function (error, response, body) {
        if((response && response.statusCode) === 200) {
            const $ = cheerio.load(body);
            const fighters = $('#block-mainpagecontent div div:nth-child(2) div div div div.view-content').text();
            console.log(fighters);
            res.json({});
        } else {
            res.json({classes: "Error"});
        }
    });
});

module.exports = router;