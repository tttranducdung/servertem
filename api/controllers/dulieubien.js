var bienopc = require('../models/varModel');
exports.create = function(param1, param2, param3, param4, param5,param6){
    var newvar = new bienopc();
    newvar.namedev = param1;
    newvar.name = param2;
    newvar.datatype = param3;
    newvar.writable = param4;
    newvar.value =param5;
    newvar.index = param6;
    newvar.save(function(err) {
        if(err){
            throw err
        }
    });
}
exports.read = function(key,callback) {
    bienopc.findOne({ index_bien: key}, function(err, doc) {
        if(err) 
            throw err;
        else
            callback(null, doc);
    });
};
exports.read_index = function(key,callback) {
    bienopc.findOne({ index: key}, function(err, doc) {
        if(err) 
            throw err;
        else
            callback(null, doc);
    });
};

exports.destroy_index = function(key) {
    exports.read_index(key, function(err, doc) {
        if(err)
            throw err;
        else {          
            doc.remove();
           
        }
    });
};
exports.update = function(key, value) { 
    exports.read_index(key, function(err, doc) {    
        if(err)
            throw err;
        else {
            if(doc !== null){
                doc.value = value;
                doc.save(function(err) {
                if(err)
                    throw (err);
            });
            }                   
        }
    });
};
exports.update_stt = function(key, value) { 
    exports.read_index(key, function(err, doc) {    
        if(err)
            throw err;
        else {
            if(doc !== null){
                doc.index = value;
                doc.save(function(err) {
                if(err)
                    throw (err);
            });
            }         
            
        }
    });
};
exports.titles = function(callback) {
    bienopc.find().exec(function(err, docs) {
        if(err)
         throw err
        else {           
            if(docs) {
                var noteList = [];
                docs.forEach(function(note) {
                    noteList.push({
                    namedev: note.namedev,
                    name: note.name,                   
                    datatype: note.datatype,
                    writable: note.writable,
                    value: note.value,
                    index: note.index
                    }); 
                });
                callback(null,noteList);
            } else { 
            }
        }
    });
}





