var lichsu = require('../api/models/clientinout');
var bienopc = require('../api/models/varModel');
var useropc = require('../api/models/useropcua');
module.exports = function(app,passport){   
    app.get(['/', '/status'],isLoggedIn,function(req,res){
        res.render('pages/status')
    });
    app.get('/connect',isLoggedIn,function(req,res){
        lichsu.find(function(err,items){          
                if(err){
                    res.render('pages/connect',{historys: []});
                } else {
                    res.render('pages/connect',{historys: items});
                }          
        })
    });
    app.get('/users',isLoggedIn,function(req,res){
        useropc.find(function(err,users){
            if(err){
                res.render('pages/users',{users: []});
            } else {
                res.render('pages/users',{users: users});
            }
        })
    });
    app.get('/addressspace',isLoggedIn,function(req,res){
        bienopc.find(function(err,opcs){
            if(err) throw err;               
                    if(err){
                        res.render('pages/addressspace',{opcs:[]});
                    } else {
                        res.render('pages/addressspace',{opcs: opcs});
                    }
        }) 
    });
    app.get('/login',function(req,res){
        res.render('pages/logintp')
    })
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/')
        }
    )
    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/login')
        })
    })
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login')
}
