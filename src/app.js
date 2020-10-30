const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const newPost = require('./endpoints/new-post');
const createPost = require('./endpoints/create-post');
const showPost = require('./endpoints/show-post');
const loadBody = require('./middleware/load-body');
const loadSession = require('./middleware/load-session');
const authorsOnly = require('./middleware/authors-only');
const serveError = require('./serve-error');
const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user');
const newSession = require('./endpoints/new-session');
const createUser = require('./endpoints/create-user');
const createSession = require('./endpoints/create-session');
const destroySession = require('./endpoints/destroy-session');
const serveFeed = require('./endpoints/serve-feed.js');
const servePicOfDay = require('./endpoints/post.js')

/** @module app 
 * The express application for our site
 */
var app = express();

app.use(loadSession);

app.get('/', serveHomepage);
 app.get('/rss', serveFeed);
app.get('/posts/new', authorsOnly, newPost);
app.post('/posts', authorsOnly, loadBody, createPost);
app.get('/posts/:id', showPost);
app.get('/picofday', servePicOfDay)
app.get('/signup', newUser);
app.post("/signup", loadBody, createUser);
app.get('/signin', newSession);
app.post("/signin", loadBody, createSession);
app.get("/signout", destroySession);

app.use(express.static('public'));

module.exports = app;