//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
// //GET HTTP method to /bucketlist
// router.get('/',(req,res) => {
//     res.send("GET");
// });

//POST HTTP method to /bucketlist

// router.post('/', (req,res,next) => {
//     res.send("POST");
// });

// //DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
// router.delete('/:id', (req,res,next)=> {
//     res.send("DELETE");

// });

const user = require('../models/user');

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    user.getAll((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();

    }
    });
});

router.post('/', (req,res,next) => {
    let newUser = new user({
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        grade: req.body.grade,
        sec: req.body.sec,
        status: req.body.status
    });
    user.register(newUser,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new user. Error: ${err}\n${newUser}`});

        }
        else
            res.json({success:true, message: "Added successfully."});

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.

router.delete('/:id', (req,res,next)=> {
  //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
  //Call the model method deleteListById
    user.delete(id,(err,u) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
        }
        else if(u) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    })
});
module.exports = router;