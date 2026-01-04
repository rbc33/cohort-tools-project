import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.model";

const router = express.Router();

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      console.log("Retrived user: ", user);
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error while retrieving user: ", error);
      next(error);
    });
});

export default router;
