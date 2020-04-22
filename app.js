

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Home page Content. the links in the top right will change the page and /compose is a hidden page has the ablility to add more entries into the page";
const aboutContent = " The about page! here is some filler text in Standard Lipsum! Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui. His in atqui epicurei vulputate, ea case expetenda vim, semper nonumes ius cu. Eu elit aeque eum, et mea velit liber iusto. Mei populo option intellegam ea. Id errem detracto omnesque mel, te nominavi efficiendi duo, tractatos corrumpit assentior vis in. Vim detracto deterruisset et, propriae atomorum suscipiantur in mei.";
const contactContent = " More Filler text!Ku dev poka lubim. Li delajt malostis gda. Dva on nams okno sluzxba. Moi na hceme nadeam, tolk skandalis bo nad, gaz iz edinju nadeam. Tenis premnog gda ne. Utro imajsx lubijsx eda vi, da hce pisal jazika studentis.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
