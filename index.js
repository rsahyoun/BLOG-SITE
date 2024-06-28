import express from "express";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', (req, res) => {
    // Fetch posts from your database (dummy data for now)
    const posts = [
        { title: 'First Post', content: 'Lorem ipsum dolor sit amet...' },
        { title: 'Second Post', content: 'Consectetur adipiscing elit...' }
        // Add more posts as needed
    ];

    res.render('index', { posts });
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
  });

app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

app.post("/submit", (req, res) => {
    const numLetters = req.body["fName"].length + req.body["lName"].length;
    res.render("index.ejs", {numberOfLetters: numLetters});
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});