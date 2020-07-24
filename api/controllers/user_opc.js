var useropcua = require('../models/useropcua');
exports.create = function(param1, param2,param3) {
    var adduser_opc = new useropcua();
    adduser_opc.user_name = param1;
    adduser_opc.user = param2;
    adduser_opc.password = param3;
    adduser_opc.save(function(err) {
        if(err){
            throw err
        }
    });
}
exports.titles = function(callback) {
    useropcua.find().exec(function(err, docs) {
        if(err)
         throw err
        else {           
            if(docs) {
                var userList = [];
                docs.forEach(function(note) {
                    userList.push({
                        user_name : note.user_name,
                        user : note.user,
                        password : note.password,
                        id: note._id
                    })
                });
                callback(null,userList);
            } else { 
            }
        }
    });
}
exports.read_user = function(key,callback) {
    useropcua.findOne({ _id: key}, function(err, doc) {
        if(err) 
            throw err;
        else
            callback(null, doc);
    });
};
exports.destroy_user = function(key) {
    exports.read_user(key, function(err, doc) {
        if(err)
            throw err;
        else {          
            doc.remove();
        }
    });
};

