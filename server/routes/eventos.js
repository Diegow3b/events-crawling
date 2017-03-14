var express = require('express');
var mongojs = require('mongojs');

const router = express.Router();
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['users']);

var isValid = (req) => {
    const control = ['title', 'location', 'start_date', 'description'];
    let validator = true;

    control.forEach((arg) => {     
        if (validator && !req.body[arg]) validator = false
    });

    return validator;
};

router.route('/eventos')
    .get((req, res) => {        
        db.eventos.find((err, eventos) => {
            if(err) throw err;
            res.json(eventos);            
        });
    });

router.route('/evento/:id')
    .get((req, res) => {        
        db.eventos.findOne({ _id: mongojs.ObjectId(req.params.id) },(err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
    })
    .delete((req, res) => {
        db.eventos.remove({ _id: mongojs.ObjectId(req.params.id) },(err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
    })
    .put((req, res, next) => {
        var evento = req.body;
        
        if(!isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }
        
        db.eventos.update({ _id: mongojs.ObjectId(req.params.id) }, 
            evento, {}, (err, evento) => {
                if(err) throw err;
                res.json(evento);
        });
                
    });

router.route('/evento')
    .post((req, res, next) => {
        var evento = req.body;

        if(!isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }

        if (!evento.end_date) evento.end_date = evento.start_date;
        
        db.eventos.update({ _id: mongojs.ObjectId(req.params.id) }, 
            evento, {}, (err, evento) => {
                if(err) throw err;
                res.json(evento);
        });
    });

module.exports = router;