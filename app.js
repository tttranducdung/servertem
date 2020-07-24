/* global require */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var setupUser_auto = require('./api/controllers/setupUser_auto');
var lichsu1 = require('./api/controllers/lichsutruycap');
var bienopc = require('./api/controllers/dulieubien');
var user_opc = require('./api/controllers/user_opc');
var fs = require('fs-extra');
var fs_read = require('fs');
const pki = require('node-forge').pki;
var appConfig2 = require('./configlistvariables/appconfig.json');
var communicationsServerAndClient = require('./api/communications/serverandweb');
var OPCUAServer = require('./opcuaserver/OPCUA_SERVER');
var app = express();
var port = process.env.PORT || 8080
var server = app.listen(port);
// require socket.io and connect to server
var io = require('socket.io')(server)
//#region connect to mongoDB 
var config = require('./config');  
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true ,})
    .then(      
        function (res) {             
            console.log("Connected to Database Successfully.")
        }
    )
    .catch(function () {
        console.log("Conntection to database failed.");
    })
//#region list_function    
function addjson(param1,param2){
    fs.readFile('./configlistvariables/appconfig.json', 'utf8', function readFileCallback(err, data){
    
        if (err){
        
            console.log(err);
        
        } else {
        
        obj = JSON.parse(data); //now it an object
        
        obj.serverConfig.userList.push({           
                    "name_user": "user_" + param1,
					"user" : param1,
					"password" : param2
        }); //add some data
        
        json = JSON.stringify(obj); //convert it back to json
        
        fs.writeFile('./configlistvariables/appconfig.json', json, 'utf8', function(err){
            if (err) throw err;
        }); // write it back    
    }});
}  
function changejson(param){
    fs.readFile('./configlistvariables/appconfig.json', 'utf8', function readFileCallback(err, data){
    
        if (err){        
            console.log(err);       
        } else {
        
        obj = JSON.parse(data); //now it an object
        
        obj.serverConfig.allowAnonymous = param;  //add some data
        
        json = JSON.stringify(obj); //convert it back to json
        
        fs.writeFile('./configlistvariables/appconfig.json', json, 'utf8', function(err){
            if (err) throw err;
        }); // write it back    
    }});
}   
function restart_server(param){
    var param_change  = parseInt(param)
    fs.readFile('./configlistvariables/appconfig.json', 'utf8', function readFileCallback(err, data){
    
        if (err){        
            console.log(err);       
        } else {
        
        obj = JSON.parse(data); //now it an object
        
        obj.serverConfig.restart = param_change;  //add some data
        
        json = JSON.stringify(obj); //convert it back to json
        
        fs.writeFile('./configlistvariables/appconfig.json', json, 'utf8', function(err){
            if (err) throw err;
        }); // write it back    
    }});
}  
function changejson_port(param){
    fs.readFile('./configlistvariables/appconfig.json', 'utf8', function readFileCallback(err, data){
    
        if (err){        
            console.log(err);       
        } else {
        
        obj = JSON.parse(data); //now it an object
        
        obj.serverConfig.port = param;  //add some data
        
        json = JSON.stringify(obj); //convert it back to json
        
        fs.writeFile('./configlistvariables/appconfig.json', json, 'utf8', function(err){
            if (err) throw err;
        }); // write it back    
    }});
}  
function deletejson(param){
    fs.readFile('./configlistvariables/appconfig.json', 'utf8', function readFileCallback(err, data){
    
        if (err){        
            console.log(err);       
        } else {
        
        obj = JSON.parse(data); //now it an object
        for( i = 0; i < obj.serverConfig.userList.length ; i ++){
            if (obj.serverConfig.userList[i] !== null){
                if(obj.serverConfig.userList[i].name_user == param){
                    delete obj.serverConfig.userList[i];  //add some data
                }
            }          
        }        
        json = JSON.stringify(obj); //convert it back to json
        
        fs.writeFile('./configlistvariables/appconfig.json', json, 'utf8', function(err){
            if (err) throw err;
        }); // write it back    
    }});
}   
function movefile_trust(name_cer){
    name = name_cer.toString();
    fs.move(`./certs/trusted/${name}`, `./certs/rejected/${name}`, err => {
        if (err) return console.log(err);
        console.log("success!")
    });
}
function movefile_reject(name_cer){    
    var name = name_cer.toString();

    fs.move(`./certs/rejected/${name}`, `./certs/trusted/${name}`, err => {
        if (err) return console.log(err);
        console.log("success!")
    });
}
function read_file_trust(name,socket){
    fs_read.readFile(`./certs/trusted/${name}`, function (err, data) {
        if (err) {
            return console.error(err);
        }

        show_info_cer(data.toString(),socket)
        
        
     });
}
function read_file_reject(name,socket){
    fs_read.readFile(`./certs/rejected/${name}`, function (err, data) {
        if (err) {
            return console.error(err);
        }       
        show_info_cer(data.toString(),socket)
     });
}
function show_info_cer(certPem,socket){
    let cert = pki.certificateFromPem(certPem);    
    let mang_info_cer = new Array();
    mang_info_cer.push(cert.validity.notBefore.toString());
    mang_info_cer.push(cert.validity.notAfter.toString());
    var extensions = cert.extensions;
    extensions.forEach(function(item){
        if(item.altNames !== undefined ){
            mang_info_cer.push(JSON.stringify(item.altNames))
        }
    })
    mang_info_cer.push(cert.serialNumber.toString());  
    let subject = cert.subject.attributes
    .map(attr => [attr.shortName, attr.value].join('='))
    .join(', ');
    mang_info_cer.push(subject);
    let issuer = cert.issuer.attributes
    .map(attr => [attr.shortName, attr.value].join('='))
    .join(', ');
    mang_info_cer.push(issuer);    
    socket.emit('noidung_reject',mang_info_cer)
}
//#endregion
// setupUser_auto();      
//#region Middleware
app.use('/assets', express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

app.set('view engine', 'ejs')

app.use(session({
    secret: 'xxxxxxxxxxxxx',
    resave: false,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('./api/config/passport')(passport)
//#endregion Middleware
////////////////////////////////////////////////////////////////////////////////////////////////
var routes = require('./routes/routes');
routes(app,passport);
communicationsServerAndClient(io,appConfig2);   
var x = OPCUAServer.startAsync(appConfig2);
function user_delete(docs){
        return new Promise(function(res){           
                docs.forEach(function(item){
                    user_opc.destroy_user(item.id)
                })            
            return res()
        }
    )

}
async function khoitao_user(docs){
    await user_delete(docs)
    return;
}
user_opc.titles(
    function(err,docs){
        if(err) throw err        
        khoitao_user(docs)
        .then(function(){
            for( i = 0 ; i < appConfig2.serverConfig.userList.length ; i++ ){
                if(appConfig2.serverConfig.userList[i] !== null){
                    user_opc.create(appConfig2.serverConfig.userList[i].name_user,appConfig2.serverConfig.userList[i].user,appConfig2.serverConfig.userList[i].password);
                }
            }
        })
    }
)
var name_cer_before = new Array();
var name_cer_rejected_before = new Array();
fs.readdir(`./certs/trusted/`, (err, files) => {
    if (err) throw err;
    name_cer_before = files;
});
fs.readdir(`./certs/rejected/`, (err, files) => {
    if (err) throw err;
    name_cer_rejected_before = files;
});
x.then(function(data){   
	data.serveropc.on("create_session", function(session){   
        fs.readdir(`./certs/trusted/`, (err, files) => {
            if (err) throw err;
            name_cer_before = files;
            io.sockets.emit('name_cer_trusted',files);             
            io.sockets.emit('cer_trust_before',files);
        });
        fs.readdir(`./certs/rejected/`, (err, files) => {
            if (err) throw err;
            name_cer_rejected_before = files;
            io.sockets.emit('name_cer_rejected',files);           
            io.sockets.emit('cer_reject_before',files);      
        });         
        console.log("Session actived");  
        var date = new Date();
        mang1=[];
        mang1.push(date.toLocaleString());
        mang1.push("Session actived");
        mang1.push(session.sessionName.toString());
        mang1.push(session.nodeId.value);
        mang1.push(session.clientDescription.applicationName.text.toString());
        mang1.push(session.channel.securityPolicy);
        lichsu1.create(date.toLocaleString(),"Session actived",session.sessionName.toString(),session.nodeId.value,session.clientDescription.applicationName.text.toString(),session.channel.securityPolicy);       
        io.sockets.emit("clientin",mang1);   
    });
    data.serveropc.on("session_closed", function(session, reason) { 
        var date1 = new Date();       
        mang2=[];
        mang2.push(date1.toLocaleString());
        mang2.push("Session closed");
        mang2.push(session.sessionName.toString());
        mang2.push(session.nodeId.value);       
        mang2.push(session.clientDescription.applicationName.text.toString());
        mang2.push("");
        lichsu1.create(date1.toLocaleString(),"Session closed",session.sessionName.toString(),session.nodeId.value,session.clientDescription.applicationName.text.toString(),"");
        io.sockets.emit("clientout",mang2);
    }); 
        var biendem1 = 125;
        var tam = 125;
        var bienduyet = new Array();  
        bienopc.titles(
            function(err,docs){
                if (err) throw err;                                     
                docs.forEach(function(note) {          
                    bienduyet.push(note.name);
                    bienopc.update_stt(note.index, biendem1.toString());
                    biendem1++;
                    var value;
                    if(note.datatype.toString() == "Bool"){
                        if(note.value.toString() == "true"){
                            value = true;
                        } else {
                            value = false;
                        }
                    }
                    if(note.datatype.toString() == "Double"){
                        value = parseFloat(note.value)
                    }
                    if(note.datatype.toString() == "Int"){
                        value = parseFloat(note.value)
                    }
                    if(note.datatype.toString() == "String"){
                        value = note.value.toString()
                    }
                    data.addbien(note.namedev,note.name,note.datatype,note.writable,value,data.uaNodeList,data.uaNodes);                
                });
            }
        );  
    var new_user = new Array();
    var deleted_user = new Array();
    var array_user_test = new Array();                
    for( i = 0 ; i < appConfig2.serverConfig.userList.length ; i++ ){
        if(appConfig2.serverConfig.userList[i] !== null){
            array_user_test.push(appConfig2.serverConfig.userList[i].name_user)
        }
    }
    setInterval(function(){
        io.sockets.emit('thongtin_server',[true, data.serveropc.endpoints[0].port, data.endpointUrl,appConfig2.serverConfig.allowAnonymous])     
    }
    ,100);  
    io.on('connection',function(socket){ 
        socket.on('khoidonglai',()=>{
            if(appConfig2.serverConfig.restart == 0){
                restart_server('1')
            } else {
                restart_server('0')
            }
        })
        socket.on('user',function(){
            socket.emit('new_user',new_user);
            socket.emit('deleted_user',deleted_user);
        })
        socket.on('dulieu_user_opc',function(data){           
            function test(){
                for( i = 0 ; i < array_user_test.length ; i++ ){
                    if(array_user_test[i] == ("user_" + data.name_user.toString())) {
                        socket.emit('trung_add_user');
                        return true;
                    }}                 
                return false;   
            }
            if(test() == false) {
                    addjson(data.name_user,data.pass_user);
                    new_user.push("user_" + data.name_user);
                    array_user_test.push("user_" + data.name_user)
                    socket.emit('new_user',new_user);
            }                       
        });
        socket.on('delete_user_opc',function(data){
            for( i = 0 ; i < array_user_test.length ; i++ ){
                if(array_user_test[i] == data.name_user.toString()) {
                    deletejson(data.name_user);
                    deleted_user.push(data.name_user);
                    array_user_test.splice(i, 1);
                    socket.emit('deleted_user',deleted_user);
                } else {
                    socket.emit('delete_user_not_valid')
                }
            }            
        });
        socket.on('change_mode',function(data){
            changejson(data.mode)
        });
        socket.on('change_port',function(data){
            changejson_port(parseInt(data.port_number))
        });
        socket.on('move_trusted',function(data){
            movefile_trust(data);                       
        });
        socket.on('move_rejected',function(data){ 
            movefile_reject(data);                 
        });
        socket.on('open_file_trust',function(data){ 
            read_file_trust(data,socket)                
        });
        socket.on('open_file_reject',function(data){ 
            read_file_reject(data,socket)              
        });
        fs.readdir(`./certs/trusted/`, (err, files) => {
            if (err) throw err;
            socket.emit('name_cer_trusted',files);  
        });
        fs.readdir(`./certs/rejected/`, (err, files) => {
            if (err) throw err;
            socket.emit('name_cer_rejected',files);
        });
        socket.emit('cer_trust_before',name_cer_before);
        socket.emit('cer_reject_before',name_cer_rejected_before);
        
        socket.on('click',function(){
            io.sockets.emit('sessioncurrent',data.serveropc.currentSessionCount);
            io.sockets.emit('thongtin_server',[true, data.serveropc.endpoints[0].port, data.endpointUrl,appConfig2.serverConfig.allowAnonymous]);
        });
        setInterval(()=>{
            socket.emit('update',data.arrayvalue); 
        },1000)
        socket.on('update_to_database',function(){                                
                    for( j = 0 ; j < data.arrayvalue.length - 125 ; j++){                            
                        bienopc.update( j + 125 , data.arrayvalue[ j + 125 ]);  
                    }                                    
        });
        socket.on('dulieubien',function(data1){ 
            var m = 1;
            for( i = 0; i < bienduyet.length;i++){                
                if(data1.name == bienduyet[i]){
                    m = m + 1                    
                } else {
                    m = m;
                }
            };
            if(m !== 1){
                socket.emit('cannotadd');
            } else {                               
                socket.emit('adding');
                bienduyet.push(data1.name);
                if( data1.datatype == "Bool") {
                    bienopc.create(data1.namedev,data1.name,data1.datatype,data1.writable,"false",biendem1);
                } else {
                    bienopc.create(data1.namedev,data1.name,data1.datatype,data1.writable,data1.value,biendem1);
                }        
                biendem1++;                
                data.addbien(data1.namedev,data1.name,data1.datatype,data1.writable,data1.value,data.uaNodeList,data.uaNodes);     
            }                                                                                       
        }); 
        socket.on('xoabien',function(data2){ 
            biendem1 = biendem1 - 1;   
            bienopc.titles(
                function(err,docs){
                    if (err) throw err;        
                    tam1 = tam;                             
                    docs.forEach(function(note) { 
                        if(note.index !== data2){
                            bienopc.update_stt(note.index, tam1.toString());
                            tam1++; 
                        }                                         
                    });
                }
            );                     
            bienopc.read_index(data2, function(err, doc) {
                if(err)
                    throw err;
                else {          
                    for( var i = 0; i < bienduyet.length - 1; i++)
                    { 
                        if (bienduyet[i] === doc.name){
                            bienduyet.splice(i, 1); 
                        }
                    }    
                }
            });
            bienopc.destroy_index(data2);
            data.deletebien(data2);  
        });        
    });    
})





