var User = require('../models/userModel');
module.exports = function(){
    var listUser = [
        {
            email: 'ttranducdung@gmail.com',
            password: 'dung1998'
        },{
            email: 'quangdanh@gmail.com',
            password: 'danh1998'
        }
    ]
    User.create(listUser, function (err, result) {    
        res.send(results);    
    })
}