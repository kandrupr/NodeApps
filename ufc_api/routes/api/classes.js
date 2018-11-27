const express = require("express");
const request = require("request");
const cheerio = require('cheerio')
const lowerCase = require('lower-case');

const router = express.Router();
const wClass = require('../../weightClasses/wClasses');

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
            var param = wClass[lowerCase(req.params.class)];
            var top = [];
            if(param !== undefined) {
                const $ = cheerio.load(body);
                const main = "#block-mainpagecontent div div:nth-child(2) div div div div.view-content div.view-grouping:nth-child(" + param +") "
                const champion = $(main + 'div.info h5').text().trimRight().trimLeft();
                top.push(champion);
                for(let i = 1; i < 16; i++) {
                    let fighterEntry = main + "div.view-grouping-content table tbody tr:nth-child(" + i +") ";
                    let name = $(fighterEntry + 'td.views-field-title div div div a').text();
                    if(name.trim() != "") {
                        top.push(name);
                    }
                }           
                res.json({"division": top});

                //console.log(division);
            } else {
                res.json({classes: "Error"});
            }
        } else {
            res.json({classes: "Error"});
        }
    });
});

module.exports = router;