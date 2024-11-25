const path = require('path');
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Set view engine
app.set('view engine', 'ejs');

// form data
app.use(express.urlencoded({ extended: true }))

// method override
app.use(methodOverride('_method'));

// JSON
app.use(express.json())

app.get('/', (req, res) => {
    res.send('comments and tacos on this page')
})

app.get('/tacos', (req, res) => {
    res.send("GET some delicious ass tacos")
})

app.post('/tacos', (req, res) => {
    res.send('POST PUNK TACOS')
    const { meat, qty } = req.body;
    console.log(`You ordered ${qty} ${meat} tacos.`);
})

const comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuidv4(),
        username: 'Jamin',
        comment: 'Wow it is good to see you.'
    },
    {
        id: uuidv4(),
        username: 'guitarDude',
        comment: 'I play blooze.'
    },
    {
        id: uuidv4(),
        username: 'koreaboo',
        comment: 'I want to meet my oppa'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    console.log(req.body);
    const newComment = { ...req.body, id: uuidv4() };
    comments.push(newComment);
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => {
        return c.id == id;
    })
    console.log(comment);
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => {
        return c.id == id;
    })
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => {
        return c.id == id;
    });
    foundComment.comment = req.body.comment;
    console.log(comments);
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => {
        return c.id == id;
    })
    const index = comments.indexOf(foundComment);
    comments.splice(index, 1);
    res.redirect('/comments');
    console.log(comments);
})


app.get('*', (req, res) => {
    res.send('Error page baby!')
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})




















