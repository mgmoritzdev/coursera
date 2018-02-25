const express = require('express');
const morgan = require('morgan');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const port = 3000;
const host = 'localhost';

const app = new express();

app.use(morgan('dev'));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(`${__dirname}/public`));

app.listen(port);
