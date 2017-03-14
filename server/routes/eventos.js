var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['eventos']);

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
    .put((req, res) => {
        var evento = req.body;
        var updEvento = {};

        if(evento.isDone){
            updEvento.isDone = evento.isDone;
        }

        if(evento.title){
            updEvento.title = evento.title;
        }

        if(!updEvento){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        }else{
            db.eventos.update({ _id: mongojs.ObjectId(req.params.id) },
                            updEvento, {}, (err, evento) => {
                if(err) throw err;
                res.json(evento);
            });
        }        
    });

router.route('/evento')
    .post((req, res) => {
        var evento = req.body;
        if(!evento.title || !(evento.isDone + '')){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        }else{
            db.eventos.save(evento, (err, evento) => {
                if(err) throw err;
                res.json(evento);
            });
        }
    });

module.exports = router;