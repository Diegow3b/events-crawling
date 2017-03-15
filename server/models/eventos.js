var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['eventos']);

/**
 * ADD new evento from database
 */
exports.insert = (evento, callback) => {
    db.eventos.save(evento, (err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};

/**
 * Obtain all eventos from database
 */
exports.all = (callback) => {
    db.eventos.find((err, eventos) => {
        if (err) 
            return callback(err);
        return callback(null, eventos);
    });
};

/**
 * Get one evento from database
 */
exports.filter = (id, callback) => {    
    db.eventos.findOne({ _id: mongojs.ObjectId(id) },(err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};

/**
 * Remove one object from database 
 */
exports.remove = (id, callback) => {    
    db.eventos.remove({ _id: mongojs.ObjectId(id) },(err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};


/**
 * Update one object from database
 */
exports.update = (id, evento, callback) => {    
    db.eventos.update({ _id: mongojs.ObjectId(id) }, evento, {},(err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};