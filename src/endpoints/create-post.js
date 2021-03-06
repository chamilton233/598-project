const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createPost(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var date = req.params.date;
    
  // Validate the input
  if(!title || !content) return serveError(req, res, 422, "Empty User or content encountered");
  
  // Sanitize the content
  content = sanitizeHTML(content);
  
  // Publish the post to the database
  var info = db.prepare(`INSERT INTO Content (Date, User, Words) VALUES (?,?,?)`).run(date,title, content);
  
  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
  
  // Redirect to the read page for the post
  res.redirect( `http://localhost:3000/picofday/${date}`).end();
}

module.exports = createPost;