require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = 5005;
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")
const { errorHandler, notFoundHandler } = require('./middleware/error-handling');
 

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


const { isAuthenticated } = require("./middleware/jwt.middleware");

const authRouter = require("./routes/auth.routes");       
app.use("/auth", authRouter);

const cohortRouter = require("./routes/cohort.routes");       
app.use("/api/cohorts", cohortRouter);                            
 
const studentRouter = require("./routes/student.routes");       
app.use("/api/students", studentRouter);  

const userRouter = require("./routes/user.routes");       
app.use("/api/users", userRouter);  


 


// ERROR HANDLING MIDDLEWARE - Must be after all routes
app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`\nServer listening on http://localhost:${PORT}\n`);
});