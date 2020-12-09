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
    place = req.params.place;
    var today = new Date();
    var date = today.getFullYear()+'-'+today.getMonth()+1+'-'+today.getDate();
    var req = new XMLHttpRequest();
    var req2 = new XMLHttpRequest();
    var url = "https://api.nasa.gov/insight_weather/?api_key=";
    var api_key = "4XtYW7wQbKY9kNUsHYBrXiLx9OXo0Uk8Ak4rjtXR";
    var end = "&feedtype=json&ver=1.0";
    req.open("GET", url + api_key+ end);
    req.send();
    try{
    req.addEventListener("load", function(){
        if(req.status == 200 && req.readyState == 4){      
          var response = JSON.parse(req.responseText);
            day = response.sol_keys;
            result =day[5];
            some = response[result]
           pic = templates["mars-weather.html"]({
           
              date: day,
              Pre: some.PRE,
              season: some.Season
          });
          weatherur ="http://api.openweathermap.org/data/2.5/weather?q="
          weatherend ="&appid=234202b6d89aa2d6c5079d66f9d88eb3"
          if(typeof place !== 'undefined' )
          {
          req2.open("GET", weatherur + place+ weatherend);
          req2.send();
          try{
            req2.addEventListener("load", function(){
                if(req2.status == 200 && req2.readyState == 4){      
                  var response = JSON.parse(req2.responseText);
                  here = templates["place-weather.html"]({
                        place: place,
                       date: date,
                       current: (response.main.temp-273).toFixed(2),
                       low: (response.main.temp_min-273).toFixed(2),
                       max:(response.main.temp_max-273).toFixed(2),
                        pressure:response.main.pressure
                   });
                   console.log(here)
                  var html = templates['layout.html']({
                    title: "Weather stuff",
                    post: here, 
                    list: pic, 
                    user: ""
                  });
                res.setHeader("Content-Type", "text/html");
                res.setHeader("Content-Length", html.length);
                res.end(html);
        
              }
            })
            }catch(err){
                console.log("error space")
                serveError(req, res, 422, err);        
            }
        }else
        {
            pickAPlace = templates["undefined-place.html"]();
            var html = templates['layout.html']({
                title: "Weather stuff",
                post: pickAPlace, 
                list: pic, 
                user: ""
              });
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Content-Length", html.length);
            res.end(html);
        } 
      }
    })
    }catch(err){
        serveError(req, res, 422, err);        
    } 
}

module.exports =servePicOfDay;