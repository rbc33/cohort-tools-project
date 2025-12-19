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

app.post("/api/cohorts", (req, res, next) => {
  Cohort.create(req.body)
  .then(createdCohort => {
      console.log('Cohort created ->', createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch(error => {
      console.error('Error while creating the cohort ->', error);
      next(error)
    });
}
)

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then(cohort => {
      console.log('Retrieved books ->', cohort);
 
      res.status(200).json(cohort);
    })
    .catch(error => {
      console.error('Error while retrieving cohort ->', error);
      next(error)
    });
});

app.get("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then(cohort => {
      console.log('Retrieved cohort ->', cohort);
 
      res.status(200).json(cohort);
    })
    .catch(error => {
      console.error('Error while retrieving cohort ->', error);
      next(error)
    });
});

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, req.body, {new:true})
    .then(cohort => {
      console.log('Retrieved cohort ->', cohort);
 
      res.status(200).json(cohort);
    })
    .catch(error => {
      console.error('Error while retrieving cohort ->', error);
      next(error)
    });
});

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndDelete(cohortId)
    .then(cohort => {
      console.log('Deleted cohort ->', cohort);
 
      res.status(204).json(cohort);
    })
    .catch(error => {
      console.error('Error while deleting cohort ->', error);
      next(error)
    });
});

app.put('/api/cohorts/:cohortId', (req, res, next) => {
  const cohortId = req.params.cohortId;
 
  Book.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then(updatedCohor => {
      console.log('Updated book ->', updatedCohor);
 
      res.status(204).json(updatedCohor);
    })
    .catch(error => {
      console.error('Error while updating the cohor ->', error);
      next(error)
    });
});

app.post("/api/students", (req, res, next) => {
  Student.create(req.body)
    .then(students => {
      console.log('Created students ->', students);
 
      res.status(200).json(students);
    })
    .catch(error => {
      console.error('Error while creating students ->', error);
      next(error)
    });
});

app.get("/api/students", (req, res, next) => {
  Student.find({})
    .then(students => {
      console.log('Retrieved students ->', students);
 
      res.status(200).json(students);
    })
    .catch(error => {
      console.error('Error while retrieving students ->', error);
      next(error)
    });
});

app.get("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
  .then(student => {
    console.log('Retrieved student ->', student);
    
    res.status(200).json(student);
  })
  .catch(error => {
    console.error('Error while retrieving student ->', error);
    next(error)
  });
});

app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId
  Student.find({cohort: cohortId})
  .then(students => {
    console.log('Retrieved students ->', students);
    
    res.status(200).json(students);
  })
  .catch(error => {
    console.error('Error while retrieving students ->', error);
    next(error)
  });
});

app.put("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, {new: true})
    .then(student => {
      console.log('Updated student ->', student);
 
      res.status(200).json(student);
    })
    .catch(error => {
      console.error('Error while updating student ->', error);
      next(error)
    });
});

app.delete("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)
    .then(student => {
      console.log('Deleted student ->', student);
 
      res.status(200).json(student);
    })
    .catch(error => {
      console.error('Error while deleting student ->', error);
      next(error)
    });
});


// ERROR HANDLING MIDDLEWARE - Must be after all routes
app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});