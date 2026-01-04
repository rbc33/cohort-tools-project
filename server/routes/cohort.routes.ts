import express, { Request, Response, NextFunction } from "express";
import Cohort from "../models/Cohort.model";

const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      console.log("Cohort created ->", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      next(error);
    });
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      next(error);
    });
});

router.get("/:cohortId", (req: Request, res: Response, next: NextFunction) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Retrieved cohort ->", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohort ->", error);
      next(error);
    });
});

router.put("/:cohortId", (req: Request, res: Response, next: NextFunction) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((cohort) => {
      console.log("Updated cohort ->", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Error while updating cohort ->", error);
      next(error);
    });
});

router.delete(
  "/:cohortId",
  (req: Request, res: Response, next: NextFunction) => {
    const cohortId = req.params.cohortId;
    Cohort.findByIdAndDelete(cohortId)
      .then((cohort) => {
        console.log("Deleted cohort ->", cohort);
        res.status(204).json(cohort);
      })
      .catch((error) => {
        console.error("Error while deleting cohort ->", error);
        next(error);
      });
  }
);

export default router;
