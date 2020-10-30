const templates = require('../templates');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const serveError = require('../serve-error');

function servePicOfDay(req, res){
    var req = new XMLHttpRequest();
    var url = "https://api.nasa.gov/planetary/apod?api_key=";
    var api_key = "4XtYW7wQbKY9kNUsHYBrXiLx9OXo0Uk8Ak4rjtXR";
    var date = "&date=2020-10-29";
    var pic;
    req.open("GET", url + api_key+ date);
    req.send();
    try{
    req.addEventListener("load", function(){
        console.log(req.readyState);
        if(req.status == 200 && req.readyState == 4){
          var response = JSON.parse(req.responseText);
            pic = templates["pic-of-day.html"]({
              title: response.title,
              date: response.date,
              hdurl: response.hdurl,
              explanation: response.explanation
          })


      }
    })
    }catch(err){
        serveError(req, res, 422, err);        
    } 
    
    var html = templates['layout.html']({
        post: pic, 
        list: "", 
        title: "???",
        user: ""
      });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
}

module.exports =servePicOfDay;