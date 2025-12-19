const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = 5005;
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
.connect('mongodb://127.0.0.1:27017/cohort-tool-api')
.then(async x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
.catch(err => console.error('Error connecting to mongo', err));



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then(cohort => {
      console.log('Retrieved books ->', cohort);
 
      res.status(200).json(cohort);
    })
    .catch(error => {
      console.error('Error while retrieving cohort ->', error);
      res.status(500).json({ error: 'Failed to retrieve cohort' });
    });
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .then(students => {
      console.log('Retrieved students ->', students);
 
      res.status(200).json(students);
    })
    .catch(error => {
      console.error('Error while retrieving students ->', error);
      res.status(500).json({ error: 'Failed to retrieve students' });
    });
});



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});