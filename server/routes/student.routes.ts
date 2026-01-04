import express, { Request, Response, NextFunction } from "express";
import Student from "../models/Student.model";

const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.body.image === "" || !req.body.image) {
    delete req.body.image;
  }

  Student.create(req.body)
    .then((students) => {
      console.log("Created students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while creating students ->", error);
      next(error);
    });
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      next(error);
    });
});

router.get("/:studentId", (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      next(error);
    });
});

router.get(
  "/cohort/:cohortId",
  (req: Request, res: Response, next: NextFunction) => {
    const cohortId = req.params.cohortId;
    Student.find({ cohort: cohortId })
      .then((students) => {
        console.log("Retrieved students ->", students);
        res.status(200).json(students);
      })
      .catch((error) => {
        console.error("Error while retrieving students ->", error);
        next(error);
      });
  }
);

router.put("/:studentId", (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((student) => {
      console.log("Updated student ->", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.error("Error while updating student ->", error);
      next(error);
    });
});

router.delete(
  "/:studentId",
  (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.studentId;
    Student.findByIdAndDelete(studentId)
      .then((student) => {
        console.log("Deleted student ->", student);
        res.status(200).json(student);
      })
      .catch((error) => {
        console.error("Error while deleting student ->", error);
        next(error);
      });
  }
);

export default router;
