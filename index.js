import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

let posts = [{ title: 'First Post', content: 'Lorem ipsum dolor sit amet...' },
             { title: 'Second Post', content: 'Consectetur adipiscing elit...' }];
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});