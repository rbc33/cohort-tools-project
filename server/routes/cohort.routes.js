const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");

router.post("/", (req, res, next) => {
  Cohort.create(req.body)
  .then(createdCohort => {
      console.log('Cohort created ->', createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch(error => {
      console.error('Error while creating the cohort ->', error);
      next(error)
    });
})

router.get("/", (req, res, next) => {
  Cohort.find(req.query)
    .then(cohort => {
      console.log('Retrieved books ->', cohort);
 
      res.status(200).json(cohort);
    })
    .catch(error => {
      console.error('Error while retrieving cohort ->', error);
      next(error)
    });
});

router.get("/:cohortId", (req, res, next) => {
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

router.put("/:cohortId", (req, res, next) => {
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

router.delete("/:cohortId", (req, res, next) => {
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

router.put('/:cohortId', (req, res, next) => {
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
 
 
module.exports = router;
 
