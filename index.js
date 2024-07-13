import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

let posts = [];
let currentId = 1;

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});


app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post('/posts', (req, res) => {
    const { title, content} = req.body;
    const newPost = {id: currentId++, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});


app.post('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const post = posts.find(post => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found'});
    }

    post.title = title || post.title;
    post.content = content || post.content;
    res.json(post);
});

app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});