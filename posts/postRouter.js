const express = require('express');
const postsDB = require("./postDb");
const router = express.Router({mergeParams:true});

router.get('/', async (req, res,next) => {
  // do your magic!
  try {
    res.status(200).json(await postsDB.get());
  }catch(error) {
     next(error);
  }
  
});

router.get('/:postId', validatePostId, async (req, res,next) => {
  // do your magic!
  try {
    const post  = await postsDB.getById(req.params.postId);
    res.status(200).json(post);
  }catch(error) {
     next(error);
  }
});

router.delete('/:postId',validatePostId,  async (req, res,next) => {
  // do your magic!
  try {
    const deletedPost = await postsDB.remove(postId);
    console.log(deletedPost);
    res.status(204).end();
  }catch(error) {
     next(error);
  }
});

router.put('/:postId',validatePost, validatePostId, async (req, res,next) => {
  // do your magic!
  try {
    const payload = {
       text: req.body.text,
       user_id: req.params.id
    }
     console.log(payload, req.params.id);
     await postsDB.update(req.params.postId, payload);
     res.status(200).json(await postsDB.getById(req.params.postId))
  }catch(error) {
     next(error);
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  
  postsDB.getById(req.params.postId)
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
         });
}

function validatePost(req, res, next) {  // do your magic!  
  if(!req.body) res.json(400).json({ message: "missing post data" });
  if(!req.body.text) res.json(400).json({message: "missing required text field" });
  next();
}

module.exports = router;
