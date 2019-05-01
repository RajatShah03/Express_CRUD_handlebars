const express = require('express'); // importing express
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express(); // creating an instance of express

// INIT logger mw
app.use(logger);

// handlebars { view templates } mw
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body parser { built-in express } mw
app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // handle url encoded data

// Homepage
app.get('/', (req, res) => res.render('index', {
  title: 'Members App',
  members
}));

/* Set static folder to show on web page */
app.use(express.static(path.join(__dirname, 'public'))); 
// all the html files can be seen on the web page ex: /about.html
// even the css stylesheets

/* Simple REST API { w hardcoded data } */
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000; // creating a "port" variable to run the server at.
// looks for the environment variable called PORT

app.listen(PORT, () => console.log(`Server started at port ${PORT}`)); // listening to a port