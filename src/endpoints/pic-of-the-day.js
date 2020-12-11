const templates = require('../templates');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const serveError = require('../serve-error');
const db = require('../database');
/** @function servePicOfDay 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function servePicOfDay(req, res){
    var date = req.params.date;
    var req = new XMLHttpRequest();
    var url = "https://api.nasa.gov/planetary/apod?api_key=";
    var api_key = "4XtYW7wQbKY9kNUsHYBrXiLx9OXo0Uk8Ak4rjtXR";
    /*db.exec("DROP TABLE IF EXISTS Content");
    db.exec("CREATE TABLE IF NOT EXISTS Content ( Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Date TEXT NOT NULL, User TEXT NOT NULL, Words TEXT )");
    const insert =db.prepare(`INSERT INTO Content (Date, User, Words) VALUES (?,?,?)`);
    insert.run(date, "name1", "suff");
    const insert2 =db.prepare(`INSERT INTO Content (Date, User, Words) VALUES (?,?,?)`);
    insert2.run(date, "name1", "content is fun");*/
    var post = db.prepare("SELECT * FROM Content WHERE Date = ?").all(date);
    var pic;
    var reqdate = "&date="+date;
    req.open("GET", url + api_key+ reqdate);
    req.send();
    try{
    req.addEventListener("load", function(){
        if(req.status == 200 && req.readyState == 4){      
          var response = JSON.parse(req.responseText);
            pic = templates["pic-of-day.html"]({
              title: response.title,
              date: response.date,
              hdurl: response.hdurl,
              explanation: response.explanation
          });
          comments = templates["comments.html"]({
            array: post,
            date: date
        });
        all = pic + comments;
          var html = templates['layout.html']({
            title: "Pic-of-Day-"+date,
            post: all, 
            list: "", 
            user: ""
          });
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Length", html.length);
        res.end(html);

      }
    })
    }catch(err){
        serveError(req, res, 422, err);        
    } 
    

}

module.exports =servePicOfDay;