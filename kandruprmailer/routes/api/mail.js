const express = require('express');
const mailer = require('nodemailer');
const router = express.Router();

// Authentication object {user, pass}
var auth = require('../../config/keys.js');

// Nodemailer object
const transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: auth
});

// @route   POST api/mail
// @desc    Send email and return a response
// @access  Public
router.post('/', (req, res) => {
    // Build Email Object
    var mailOptions = {
        from: req.body.email,
        to: 'kandrupr.github@gmail.com',
        subject: req.body.subject,
        text: 'Message from ' + req.body.name + " at " + req.body.email + "\n\n" + req.body.message
    };

    // Send Email and return a response
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.json({operation: false});
        } else {
            res.json({operation: true});
        }
    });
});

module.exports = router;