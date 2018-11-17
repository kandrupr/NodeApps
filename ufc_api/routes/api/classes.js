const express = require("express");
const request = require("request");
const cheerio = require('cheerio')

const router = express.Router();

const wClass = {
    "flyweight": 2,
    "bantamweight": 3,
    "featherweight": 4,
    "lightweight": 5,
    "welterweight": 6,
    "middleweight": 7,
    "lightheavyweight": 8,
    "heavyweight": 9
};

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
            var param = wClass[req.params.class];
            var top = [];
            if(param !== undefined) {
                const $ = cheerio.load(body);
                const main = "#block-mainpagecontent div div:nth-child(2) div div div div.view-content div.view-grouping:nth-child(" + param +") "
                const champion = $(main + 'div.info h5').text();
                top.push({
                    "Champion": champion,
                });            
                res.json({"division": top});
                console.log(top);
            } else {
                res.json({classes: "Error"});
            }
        } else {
            res.json({classes: "Error"});
        }
    });
});

module.exports = router;