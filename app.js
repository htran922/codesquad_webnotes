// Helen Tran
// Webnotes App
// May 18, 2019

// bring express into our program
const express = require('express');
// call function from express
const app = express();
// add port variable
const PORT = process.env.PORT || 3000;
// make express use the bodyParser on all requests which will transform
// the 'body' or contents, of the request (which is a string) into an
// object which we can then reference with req.body in our code
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// add get route which passes a string into our browser
// app.get('/', (req, res) => res.send('Web Notes'))

// add static middleware and point it to the views folder
// express.static('views') is a special Express method that creates "middleware" 
// that will serve all the files in the folder you specify (in this case 'views')
// in effect, anything we put in the views folder is now available on our website
// app.use('/', express.static('views'));

// using server side templates to make our list of notes dynamic: 
// this means that if the user adds more notes to a list stored somewhere
// on our server (like a database), our page would change dynamically
// to show those notes
const myNotes = [
    'http is a protocol',
    'http requests have a url, method, header, and body',
    'I like tomatoes',
    'My name is Helen'
];
// tells Express to use the notes.ejs file with our myNotes array to
// render an HTML file dynamically and send it as our root ('/') page
app.get('/', (req, res) => {
    res.render('notes.ejs', {notes: myNotes});
})

// add css folder as static file
app.use('/css', express.static('css'));

// receives a post request and adds the note to our list of notes and responds
app.post('/notes', (req, res) => {
    myNotes.push(req.body.note);
    res.redirect('/');
})

// activate listening port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
