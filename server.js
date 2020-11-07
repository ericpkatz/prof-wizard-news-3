const express = require("express");
const morgan = require("morgan");
const { client, syncAndSeed } = require("./db");

const app = express();
app.use(express.urlencoded({ extended: false}));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res, next) => {
  res.redirect('/posts');
});

app.use('/posts', require('./routes/posts'));



const init = async()=> {
  await client.connect();
  await syncAndSeed();
  const PORT = process.env.PORT || 1337;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();

