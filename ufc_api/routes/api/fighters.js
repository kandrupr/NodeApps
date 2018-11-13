const express = require("express");
const router = express.Router();

// @route   GET api/fighters
// @desc    Send a request to the ufc website and get a list of the current champions
// @access  Public
router.get('/', (req, res) => {
    res.json({operation: "List of current champions"});
});

// @route   GET api/fighters/name
// @desc    Send a request to the ufc website and get data on a fighter given a name
// @access  Public
router.get('/:name', (req, res) => {
    res.json({operation: `Information about ` + req.params.name});
});

module.exports = router;