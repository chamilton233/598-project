const templates = require('../templates');

/** @function newPost 
 * Serves the form for creating a new post 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newPost(req, res) {
  var date = req.params.date;
  var form = templates["new-place.html"]();
  var html = templates["layout.html"]({
    post: form, 
    list: "", 
    title: "New Post",
    user: req.session.user
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newPost;