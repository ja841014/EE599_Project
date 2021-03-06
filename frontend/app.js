const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require('fs');
// in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
// //make everything under public folder avaliable to the outside world
 app.use(express.static("public"));
//start app
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));


// app.get('/', function(req, res){
//   res.sendFile(__dirname + "/public/index.html");
//   });


app.post("/",(req, res) => {
  try {
    if(req.files) {
      console.log(req.files);
      let file = req.files.file; // file is file_name which we define in the index.html
      let filename = file.name;
      console.log(filename);
      //mv() => move()
      file.mv('./uploads/'+ filename, function(err) {
        if(err) {
          console.log("err occured")
          res.send(err);
        }
        else {
          console.log("File Upload");
          res.send("sucessful");
        }
      });
    }
    else {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    }
  }
  catch(err) {
    res.status(500).send(err);
  }
});


