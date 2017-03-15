var express = require('express');
var mongojs = require('mongojs');
var encrypt = require('../controllers/users')

const router = express.Router();
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['users']);

var isValid = (req) => {
    const control = ['username', 'password', 'email'];
    let validator = true;

    control.forEach((arg) => {     
        if (validator && !req.body[arg]) validator = false
    });

    return validator;
};

/**
 * Users Router
 */

router.route('/')
    .get((req, res) => {        
        db.users.find((err, users) => {
            if(err) throw err;
            users.forEach((user)=>{
                delete user.password;
            });            
            res.json(users);            
        });
    })
    .post((req, res, next) => {
        var user = req.body;

        if(!isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }

        if (!user.end_date) user.end_date = user.start_date;

        encrypt.cryptPassword(user.password, (err, password) => {
            if(err) throw err;
            user.password = password;
        });
        
        db.users.save(user, function(err, user){
            if(err) throw err;
            res.json(user);
        });
    });

router.route('/:id')
    .get((req, res) => {        
        db.users.findOne({ _id: mongojs.ObjectId(req.params.id) },(err, user) => {
            if(err) throw err;
            users.forEach((user)=>{
                delete user.password;
            });
            res.json(user);
        });
    })
    .delete((req, res) => {
        db.users.remove({ _id: mongojs.ObjectId(req.params.id) },(err, user) => {
            if(err) throw err;
            res.json(user);
        });
    })
    .put((req, res, next) => {
        var user = req.body;
        
        if(!isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }
        
        db.users.update({ _id: mongojs.ObjectId(req.params.id) }, 
            user, {}, (err, user) => {
                if(err) throw err;
                res.json(user);
        });
                
    });

module.exports = router;