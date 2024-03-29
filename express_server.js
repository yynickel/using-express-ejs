var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/u/:shortURL", (req, res) => {
  console.log("u redirecting");
  let shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.send(`Invalid URL : ${shortURL}\nPlease include "https://" in your URL`);
  }
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  let newShortURL = generateRandomString();
  let newLongURL = req.body.longURL;
  urlDatabase[newShortURL] = newLongURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${newShortURL}`);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  let templateVars = { greeting: 'Hello World!' };
  res.render("hello_world", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


function generateRandomString() {
  let result = [];
  for (let i = 0; i < 6; i++) {
    let r = Math.floor(Math.random() * 62);
    if (r < 26) {
      result.push(String.fromCharCode(65 + r));
    } else if (r < 52) {
      result.push(String.fromCharCode(r + 71));
    } else result.push(String.fromCharCode(r - 4));
  }
  return result.join("");
}