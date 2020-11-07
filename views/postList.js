const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

module.exports = (posts) => html`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <a href='/posts/create'>Create</a>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => html`
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes ? post.upvotes : 0} upvotes | ${timeAgo(post.date)}
          </small>
        </div>`
      )}
    </div>
  </body>
  </html>`;
