const express = require("express")
const User = require("../models/User.model")

const router = express.Router()

router.get("/:id", (req ,res, next)=>{
    const userId = req.params.id
    User.findById(userId)
    .then(user =>{
        console.log("Retrived user: ", user)
        res.status(200).json(user)
    })
    .catch(error => {
        console.error("Error while retrieving user: ", error)
        next(error)
    })
})

module.exports = router