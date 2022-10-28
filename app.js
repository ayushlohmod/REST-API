//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articalSchema = {
  title: String,
  content: String
};
const Artical = mongoose.model("Articel", articalSchema);

/////////////////////////Request Targeting all Articals////////////////////////
app.route("/articels")

.get(function (req , res){
  Artical.find(function (err, foundArticals){
    console.log("Artical sends");
    if(!err){
      res.send(foundArticals);
    }else{
      res.send(err);
    }

  });
})

.post(function(req, res){

  console.log ()
  console.log ()

  const newArtical = new Artical({

    title: req.body.title,
    content: req.body.content
  });
  newArtical.save(function(err){
    if(!err){
      res.send("Successfully added a new artical");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req, res){
  Artical.deleteMany(function(err){
    if(!err){
      res.send("Successfullt deleted all Artical");
    }else{
      res.send(err);
    }
  });
});
/////////////////////////Request Targeting A Specific Articals////////////////////////


app.route("/articels/:articelTitle")

.get(function(req, res){

  Artical.findOne({title: req.params.articelTitle}, function(err, foundArtical){

    if(foundArtical){
      res.send(foundArtical);
    }else{
      res.send("No Artical Found");
    }
  });
})
.put(function(req, res){

  Artical.bulkWrite(
    {title: req.params.articelTitle },
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated");
      }
    }
  );
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});