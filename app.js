const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.use(routes);

app.listen(3000);