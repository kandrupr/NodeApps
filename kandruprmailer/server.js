const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// Tells us where to find the routes
const mail = require('./routes/api/mail');

// Bodyparser Middleware
app.use(bodyParser.json());

// Add cors exception to application
app.use(cors({credentials: true, origin: true}));

// Use Routes
app.use('/api/mail', mail);

// Pick whatever is in the environment variable or port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
