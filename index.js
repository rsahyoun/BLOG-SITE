import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let currentId = 1;

// Home page to view all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Render home.ejs
app.get("/home", (req, res) => {
    res.render("home.ejs");
});

// Render about.ejs
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

// Render create.ejs
app.get('/create', (req, res) => {
    res.render('create');
});

// Create a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: currentId++, title, content };
    posts.push(newPost);
    res.redirect('/');
});

// Render edit.ejs
app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('edit', { post });
});

// Update a post using a POST request
app.post('/update/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    res.redirect('/');
});

// Delete a post
app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
