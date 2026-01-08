const express = require("express")
const router = express.Router()
const Student = require("../models/Student.model")

router.post("/", (req, res, next) => {
  if (req.body.image === "" || !req.body.image) {
    delete req.body.image;
  }
  
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

router.get("/", (req, res, next) => {
  // console.log("req.query", req.query["program"])
  // Student.find({program:req.query["program"]})
  Student.find(req.query)
    .then(students => {
      // console.log('Retrieved students ->', students);
 
      res.status(200).json(students);
    })
    .catch(error => {
      console.error('Error while retrieving students ->', error);
      next(error)
    });
});

router.get("/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
  .populate('cohort')
  .then(student => {
    console.log('Retrieved student ->', student);
    
    res.status(200).json(student);
  })
  .catch(error => {
    console.error('Error while retrieving student ->', error);
    next(error)
  });
});

router.get("/cohort/:cohortId", (req, res, next) => {
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

router.put("/:studentId", (req, res, next) => {
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

router.delete("/:studentId", (req, res, next) => {
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

module.exports = router