const db = require('../database');
const templates = require('../templates');
    const process = require('process');
/** @function serveFeed()
 * Serves the RSS feed xml with the blog's current articles 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function serveFeed(req, res) {
      var url = `https://${process.env.CODIO_HOSTNAME}-3000.codio`;

    var posts = db.prepare('SELECT * FROM posts ORDER BY date DESC').all();
  posts.forEach(function(post){
    post.link = `https://${process.env.CODIO_HOSTNAME}-3000.codio.io/posts/${post.id}`;
  });
    var xml = templates["feed.xml"]({
    url: url,
    posts: posts
  });
    res.setHeader("Content-Type", "text/xml");
  res.setHeader("Content-Length", xml.length);
  res.end(xml);
}

module.exports = serveFeed;