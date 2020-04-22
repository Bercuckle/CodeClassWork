
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

let day = date();
let workItems = [];
const app = express();
app.set('view engine', 'ejs');

var items = ["buy Food", "cook food", "eat food"];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){


  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
        items.push(item);
        res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list",{ listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});



// if(today.getDay() == 0) {
// day = "Sunday";
// res.render("list", {kindOfDay: day});
// } else  if(today.getDay() == 1){
//   day = "Monday";
// res.render("list", {kindOfDay: day});
// } else  if(today.getDay() == 2){
//   day = "Tuesday";
// res.render("list", {kindOfDay: day});
// } else  if(today.getDay() == 3){
//   day = "Wednesday";
// res.render("list", {kindOfDay: day});
// } else  if(today.getDay() == 4){
//   day = "Thursday";
// res.render("list", {kindOfDay: day});
// } else  if(today.getDay() == 5){
//   day = "Friday";
// res.render("list", {kindOfDay: day});
// } else  if(today.getDay() == 6){
//   day = "Saturday";
// res.render("list", {kindOfDay: day});
// } else {
//   day = "AHHHHHHHHHHHHHHHHHHHHHH";
//   res.render("list", {kindOfDay: day});
// }
// });

app.listen(3000, function(){
  console.log("server started on port 3000")
});
