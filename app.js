const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/static', express.static('public')); // Path in domain for access to images/media used in the site
app.set('view engine', 'pug');
app.use(routes);

app.listen(3000); // Application is accesible on port 3000
