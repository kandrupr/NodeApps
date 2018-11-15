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
            const list = $('#block-mainpagecontent div:nth-child(1) div.block-facet--links:nth-child(2) div.facets-widget-links ul li.facet-item').text();
            const arr = list.trimRight().split('\n');
            res.json({classes: [
                {"Men's": arr.slice(0,arr.length-4)}
                ,{"Women's": arr.slice(arr.length-4,arr.length)
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
    res.json({operation: "Top fighters of " + req.params.class});
});

module.exports = router;