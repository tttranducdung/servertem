var lichsu = require('../models/clientinout');
exports.create = function(param1, param2, param3, param4, param5, param6) {
    var newhistory = new lichsu();
    newhistory.timestamps = param1;
    newhistory.eventtype = param2;
    newhistory.sessionname = param3;
    newhistory.sessionid = param4;
    newhistory.clientidentity =param5;
    newhistory.security = param6;
    newhistory.save(function(err) {
        if(err){
            throw err
        }
    });
}

