const db = require('../database');
const templates = require('../templates');

/** @function homepage
 * Serves the home page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveHomepage(req, res) {
  var today = new Date();
  var date = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
   
  var day= today.getDate();
  var days_array= [];
  for(i =0;i< day; day--){
    var today = new Date();

    days_array.push({date: (today.getFullYear().toString()+'-'+(today.getMonth()+1).toString()+'-'+day).toString()})
  }

  dat = templates["homepage.html"]({
    array: days_array
})
  // Get all posts in the database
  var posts = [
    {
      id: 3,
      title: 'Secured Post ',
      content: 'This post was created with Basic HTTP authentication.',
      date: 1594914840985
    },
    {
      id: 2,
      title: 'First Post',
      content: 'This is the first post created using the blog site functionality.',
      date: 1594752273252
    },
    {
      id: 1,
      title: 'Hello',
      content: 'Hello Blog!',
      date: 1594504941663
    }
  ]//db.prepare("SELECT * FROM posts ORDER BY date DESC").all();
  
  // Get the newest post 
  var post = posts[0];
  // Generate the html snippets
  var postHtml = templates['post.html'](post);
  var listHtml = templates['post-list.html']({posts: posts});
  // Set the title
  var title = post.title;
  // Generate the page html
  var html = templates['layout.html']({
    post: dat, 
    list: "", 
    title: title,
    user: req.session.user
  });
  // Serve the HTML
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;