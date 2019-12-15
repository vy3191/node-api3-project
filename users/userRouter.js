const express = require('express');
const db = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  db.getById(id)
    .then( (user) => {
       if(user) {
          req.user = user;
          next()
       } else {
         res.status(404).json({ message: "invalid user id" });
       }
    }).catch(err => {
       res.status(500).json({msg:`Something went wrong`})
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const { id , name } = req.body;
  if(!id && !name ) res.status(400).json({ message: "missing user data" });
  if(!name) res.status(400).json({ message: "missing required name field" });
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const { body } = req;
  if(body === "undefined") res.json(400).json({ message: "missing post data" });
  if(!body.text) res.json(400).json({message: "missing required text field" })
}

module.exports = router;
