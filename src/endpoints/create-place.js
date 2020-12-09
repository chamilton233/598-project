const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');

function createPost(req, res) {
  var content = req.body.city;
    
  // Validate the input
  if( !content) return serveError(req, res, 422, "Empty place encountered");
  
  // Sanitize the content
  content = sanitizeHTML(content);
  
  // Publish the post to the database
  
  // Redirect to the read page for the post
  res.redirect( `http://localhost:3000/weather/${content}`).end();
}

module.exports = createPost;