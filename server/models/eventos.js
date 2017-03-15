var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['eventos']);
var slugify = require('slugify');

/**
 * ADD new evento from database
 */
exports.insert = (evento, callback) => {
    evento.slug = slugify(evento.title);
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
 * Get one evento from database : FILTER - TITLE
 */
exports.filterByTitle = (title, callback) => {    
    db.eventos.findOne({ title: title },(err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};

/**
 * Get one evento from database : FILTER - SLUG
 */
exports.filterBySlug = (slug, callback) => {    
    db.eventos.findOne({ slug: slug },(err, evento) => {
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
 * Remove one object from database 
 */
exports.removeByTitle = (title, callback) => {    
    db.eventos.remove({ title: title },(err, evento) => {
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