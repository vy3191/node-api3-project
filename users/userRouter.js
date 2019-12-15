const express = require('express');
const db = require("./userDb");

const router = express.Router();

router.post('/',validateUser, async (req, res) => {
   
  // do your magic!
   try {
     const body = {
        name:req.body.name
     }
     res.status(201).json(await db.insert(body))
   } catch(error) {
    res.status(500).json({msg:error});
   }
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

router.put('/:id',validateUser, validateUserId, async (req, res) => {
  // do your magic!
  try {
    const body = {
      name:req.body.name
    }    
    await db.update(req.user.id, body) ;
    const user = await db.getById(req.user.id);
    res.status(201).json(user);
  } catch(error) {
    res.status(500).json({msg:error});
  }
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
  const { name } = req.body;
  if(!req.body) res.status(400).json({ message: "missing user data" });
  if(!name) res.status(400).json({ message: "missing required name field" });
  req.name = name
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const { body } = req;
  if(body === "undefined") res.json(400).json({ message: "missing post data" });
  if(!body.text) res.json(400).json({message: "missing required text field" })
}


module.exports = router;
