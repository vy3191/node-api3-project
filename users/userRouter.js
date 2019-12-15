const express = require('express');
const db = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', async (req, res) => {
  // do your magic!
  
});

router.get('/', async (req, res) => {
  // do your magic!
      try {
        const users = await db.get();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({msg: error})
    }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId,  async (req, res) => {
  // do your magic!
    try {
       const posts = await db.getUserPosts(req.user.id)
       res.status(200).json(posts)
    } catch(error) {
       res.status(500).json({msg:error});
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // do your magic!
   try {
     console.log(req.user)
     const deletedUserDetails = await db.remove(req.params.id);
     console.log('user', deletedUserDetails)
     res.status(201).json(deletedUserDetails);
     
   } catch(error) {
     res.status(500).json({msg:error});
   }
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
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
