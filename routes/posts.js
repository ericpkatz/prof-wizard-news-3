const { client } = require("../db");
const postList = require("../views/postList");
const postDetails = require("../views/postDetails");

const app = require('express').Router();

module.exports = app;

const baseQuery = "SELECT posts.*, users.name, counting.upvotes FROM posts INNER JOIN users ON users.id = posts.userId LEFT JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) AS counting ON posts.id = counting.postId\n";

app.get("/", async (req, res, next) => {
  try {
    const data = await client.query(baseQuery);
    res.send(postList(data.rows));
  } catch (error) { next(error) }
});

app.post("/", async (req, res, next) => {
  try {
    const { name, title, content } = req.body;
    let users = (await client.query('SELECT * FROM users WHERE name = $1', [ name])).rows; 
    if(!users.length){
      users = (await client.query('INSERT INTO users(name) VALUES($1) RETURNING *', [ name ])).rows; 
    }
    const user = users[0];
    const post = (await client.query('INSERT INTO posts(userId, title, content) VALUES($1, $2, $3) RETURNING *', [user.id, title, content])).rows[0];
    res.redirect(`/posts/${post.id}`);
  }
  catch(ex){
    next(ex);
  }
});

app.get("/create", async (req, res, next) => {
  res.send(require('../views/addPost')());
});

app.get("/:id", async (req, res, next) => {
  try {
    const data = await client.query(baseQuery + "WHERE posts.id = $1", [req.params.id]);
    const post = data.rows[0];
    res.send(postDetails(post));
  } catch (error) { next(error) }
});
