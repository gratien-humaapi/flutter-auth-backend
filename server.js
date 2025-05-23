const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const todoRoutes = require('./routes/todo');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.send('Home page')
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/users', routes);
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/todos', todoRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('Server running in ',process.env.NODE_ENV, 'mode on port',PORT))