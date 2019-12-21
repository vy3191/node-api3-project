const express = require('express');
const postsDB = require("./postDb");
const router = express.Router();

router.get('/', async (req, res) => {
  // do your magic!
  try {

  }catch(error) {
     next(error);
  }
  
});

router.get('/:id', async (req, res) => {
  // do your magic!
  try {

  }catch(error) {
     next(error);
  }
});

router.delete('/:id', async (req, res) => {
  // do your magic!
  try {

  }catch(error) {
     next(error);
  }
});

router.put('/:id', async (req, res) => {
  // do your magic!
  try {

  }catch(error) {
     next(error);
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  
  postsDB.getById(req.params.id)
         .then( post => {
            if(post) {
              req.post = post;
              next()
            } else {
              res.status(404).json({msg: `Post with ID ${req.params.id} not found`});
            }
         })
         .catch(err => {
            res.status(500).json({msg: `Something went wrong with server`});
         })

}

module.exports = router;
