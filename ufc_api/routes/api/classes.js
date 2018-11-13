const express = require("express");
const router = express.Router();

// @route   GET api/classes
// @desc    Send a request to the ufc website and get a list of the current weight classes
// @access  Public
router.get('/', (req, res) => {
    res.json({operation: "List of current weight classes"});
});

// @route   GET api/classes/class
// @desc    Send a request to the ufc website and get a list of top fighters in a weight class given a class
// @access  Public
router.get('/:class', (req, res) => {
    res.json({operation: "Top fighters of " + req.params.class});
});

module.exports = router;