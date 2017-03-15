var express = require('express');
var model = require('../models/eventos.js');

const router = express.Router();

var isValid = (req) => {
    const control = ['title', 'location', 'start_date', 'description'];
    let validator = true;

    control.forEach((arg) => {     
        if (validator && !req.body[arg]) validator = false
    });

    return validator;
};

/**
 * Eventos Router
 */
router.route('/')

    .get((req, res) => {        
        model.all((err, eventos) => {
            if(err) throw err;
            res.json(eventos);
        });
    })

    .post((req, res, next) => {
        var evento = req.body;

        if(!isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }

        if (!evento.end_date) evento.end_date = evento.start_date;            

        model.insert(evento, (err, evento) => {
            if(err) throw err;
            res.json(evento);
        });

    });

router.route('/:id')

    .get((req, res) => {                
        model.filter(req.params.id, (err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
    })

    .delete((req, res) => {
        model.remove(req.params.id, (err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
    })

    .put((req, res, next) => {
        var evento = req.body;
        
        if(!isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }
        
        model.update(req.params.id, evento, (err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
                
    });
    

module.exports = router;