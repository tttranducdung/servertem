/* global require */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const opcua = require('node-opcua');
var ip = require("ip");
var os = require ("os");
var path = require("path");
//datatype mapping Var and OPC UA standards
const moduleTypesMap = 
{
    'Bool' : 'Boolean',
    'Real' : 'Float',
    'Double' : 'Double',
    'Byte' : 'Byte',
    'Int' : 'Int16',
    'DInt' : 'Int32',
    'LInt' : 'Int64',
    'UInt' : 'UInt16',
    'UDInt' : 'UInt32',
    'ULInt' : 'UInt64',    
    'String' : 'String',
    'Word' : 'UInt16',
    'DWord' : 'UInt32',
};
const moduleTypesCodeMap = 
{
    'Boolean' : opcua.DataType.Boolean,
    'Float' : opcua.DataType.Float,
    'Double' : opcua.DataType.Double,
    'Byte' : opcua.DataType.Byte,
    'Int16' : opcua.DataType.Int16,
    'Int32' : opcua.DataType.Int32,
    'Int64' : opcua.DataType.Int64,
    'UInt16' : opcua.DataType.UInt16,
    'UInt32' : opcua.DataType.UInt32,
    'UInt64' : opcua.DataType.UInt64,
    'String' : opcua.DataType.String
};
function opcuaAddDevice(nameDevice, DataSet, uaNodeList, addressSpace, namespace, uaNodes)
{   
    let device = namespace.addObject({
        organizedBy : addressSpace.rootFolder.objects,
        browseName : nameDevice
    });
    for( let j = 0; j < DataSet.variablesList.length ; j++){
        let variable = DataSet.variablesList[j];
        let setID = 's="' + nameDevice + '"."' + variable.name + '"';  
        DataSet.variablesList[j].id = setID;
        let myValue = variable.value;     
        if (!DataSet.variablesList[j].writable)
        {                      
        let namenode = namespace.addVariable({
            componentOf: device,
            browseName: variable.name,
            dataType: moduleTypesMap[variable.dataType],
            nodeId: setID,
            value: {
                get: function () {
                    let mydataType = moduleTypesCodeMap[moduleTypesMap[variable.dataType]];
                    return new opcua.Variant({dataType: mydataType, value: myValue });
                },
                set: function (variant) {
                    return opcua.StatusCodes.BadNotWritable;
                }
            }
        });
        uaNodes.push(namenode);
    }
    else {
        let namenode = namespace.addVariable({
            componentOf: device,
            browseName: variable.name,
            dataType: moduleTypesMap[variable.dataType],
            nodeId: setID,
            value: {
                get: function () {
                    let mydataType = moduleTypesCodeMap[moduleTypesMap[variable.dataType]];
                    return new opcua.Variant({dataType: mydataType, value: myValue });
                },
                set: function (variant) {
                   
                    if(variable.dataType !== "String"){
                        if(variable.dataType == "Bool"){
                            myValue = variant.value;
                            variable.value = myValue;  
                        } else {
                            myValue = parseFloat(variant.value);
                            variable.value = myValue;                           
                        }
                        return opcua.StatusCodes.Good;
                    } else {
                        myValue = variant.value;
                        return opcua.StatusCodes.Good;
                    }
                    return opcua.StatusCodes.Good;
                } 
            }
        });
        uaNodes.push(namenode);
    }}    
    uaNodeList.push(device);   
}
function opcuaInitializeAsync(serveropc) 
{
    return new Promise(function(res, err)
    {
        serveropc.initialize(function ()
        {
            return res();
        });			
	});
}
function opcuaStartAsync (serveropc)
{
    return new Promise(function (res, err)
    {
            serveropc.start(function () 
            {
                var endpointUrl = serveropc.endpoints[0].endpointDescriptions()[0].endpointUrl;
                console.log("The primary Server endpoint URL is", endpointUrl);
                return res();
            });
    });
}

module.exports.startAsync = async (function (appConfig2)
{
    let moduleData = {};

    //Read hostname and IPAddress
    var hostname = os.hostname();
    var ipAddress = ip.address();
    //Set some Options
    let options = {};
    options.port = appConfig2.serverConfig.port;
    // options.resourcePath = "/ua/node-opcua";
    options.alternateHostname = ipAddress;
    options.buildInfo = 
    {
        productName: hostname,
        buildNumber: "1",
        buildDate: new Date(2019,1,1)
    };    
    options.serverInfo = 
    {
        applicationUri : "urn:"+ hostname + ":ua/node-opcua",
        productUri : "node-opcua",
        applicationName : {text: "node-opcua", locale:"en"},
        gatewayServerUri : null,
        discoveryProfileUri : null,
        discoveryUrls : []
    };
    options.serverCertificateManager = new opcua.OPCUACertificateManager({ 
        automaticallyAcceptUnknownCertificate: true,
        rootFolder: path.join(__dirname, "../certs")
    });
    options.allowAnonymous = appConfig2.serverConfig.allowAnonymous;
    if (!options.allowAnonymous)
     {
         let usrManager = {};
         usrManager.isValidUser = function(userName, password)
         {
             
             //for each user in users list
             for (let i = 0; i < appConfig2.serverConfig.userList.length; i++) 
             { 
                if(appConfig2.serverConfig.userList[i] !== null){
                    let uName = appConfig2.serverConfig.userList[i].user;
                    let uPass = appConfig2.serverConfig.userList[i].password;                
                    if ((userName === uName) && (password === uPass))
                    {                                  
                       return true;
                    }
                }
             }
             return false;
         };
         options.userManager = usrManager;
     }
    
     // Build server object
    moduleData.serveropc = new opcua.OPCUAServer(options);
    // Initalize the server
    try
    {
        await (opcuaInitializeAsync(moduleData.serveropc));
    }
    catch (e)
    {
        console.log("OPCUA Server initialization failed : " + e);
    }

    // Build address space
    const addressSpace = moduleData.serveropc.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();    
    moduleData.uaNodeList = [];
    moduleData.uaNodes = [];
    moduleData.arrayvalue = [];
    
    //for each device add one folder and its variables
    for (let i = 0; i < appConfig2.SimulationData.length; i++)
    {       
        let nameDevice = appConfig2.SimulationData[i].deviceName;
        opcuaAddDevice(nameDevice, appConfig2.SimulationData[i], moduleData.uaNodeList, addressSpace, namespace, moduleData.uaNodes);        
    }
    let device = namespace.addObject({
        organizedBy: addressSpace.rootFolder.objects,
        browseName: "DATA_SIMULATION"
    });    
    // moduleData.addbien = function (namedev,name,datatype,writable,value,uaNodeList,uaNodes){
    //     let setID = 's="' + namedev + '"."' + name + '"';                            
    //     if(datatype == "Bool"){
        
    //         let namenode = namespace.addVariable({       
    //             componentOf: device,            
    //             browseName: name,            
    //             dataType:  moduleTypesMap[datatype],    
    //             nodeId: setID,
    //             value: {
    //                 get: function () {
    //                     let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
    //                     return new opcua.Variant({dataType: mydataType, value: value });
    //                 },
    //                 set: function (variant) {
    //                     value = variant.value;                       
    //                     return opcua.StatusCodes.Good;
    //                 }
    //             }
    //         });
    //         uaNodes.push(namenode);
    //     } else {
    //     if (writable=="false"){ 
    //        let namenode =  namespace.addVariable({
    //             componentOf: device,
    //             browseName: name,                
    //             dataType:  moduleTypesMap[datatype],
    //             nodeId: setID,
    //             value: {
    //                 get: function () {
    //                     let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
    //                     return new opcua.Variant({dataType: mydataType, value: value });
    //                 },
    //                 set: function (variant) {
    //                     return opcua.StatusCodes.BadNotWritable;
    //                 }
    //             }
    //         });
    //         uaNodes.push(namenode);
    //     } else { 
    //         let namenode = namespace.addVariable({       
    //             componentOf: device,            
    //             browseName: name,            
    //             dataType:  moduleTypesMap[datatype],    
    //             nodeId: setID,
    //             value: {
    //                 get: function () {
    //                     let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
    //                     return new opcua.Variant({dataType: mydataType, value: value });
    //                 },
    //                 set: function (variant) {
    //                     value = parseFloat(variant.value);
    //                     return opcua.StatusCodes.Good;
    //                 }
    //             }
    //         });
    //         uaNodes.push(namenode);            
    //     }

    // }
    //     uaNodeList.push(device);
    // };
    moduleData.addbien = function (namedev,name,datatype,writable,value,uaNodeList,uaNodes){
        let setID = 's="' + namedev + '"."' + name + '"';  
        if(datatype == "String"){
            if(writable.toString() == "false"){
                let namenode = namespace.addVariable({       
                    componentOf: device,            
                    browseName: name,            
                    dataType:  moduleTypesMap[datatype],    
                    nodeId: setID,
                    value: {
                        get: function () {
                            let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];;
                            return new opcua.Variant({dataType: mydataType, value: value });
                        },
                        set: function (variant) {
                            return opcua.StatusCodes.BadNotWritable;
                        }
                    }
                });
                uaNodes.push(namenode);
            } else {
                let namenode = namespace.addVariable({       
                    componentOf: device,            
                    browseName: name,            
                    dataType:  moduleTypesMap[datatype],    
                    nodeId: setID,
                    value: {
                        get: function () {
                            let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
                            return new opcua.Variant({dataType: mydataType, value: value });
                        },
                        set: function (variant) {
                            value = variant.value;                       
                            return opcua.StatusCodes.Good;
                        }
                    }
                });
                uaNodes.push(namenode);
    
            }
        }                          
        if(datatype == "Bool"){
            if(writable.toString() == "false"){
                let namenode = namespace.addVariable({       
                    componentOf: device,            
                    browseName: name,            
                    dataType:  moduleTypesMap[datatype],    
                    nodeId: setID,
                    value: {
                        get: function () {
                            let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
                            return new opcua.Variant({dataType: mydataType, value: value });
                        },
                        set: function (variant) {
                            return opcua.StatusCodes.BadNotWritable;
                        }
                    }
                });
                uaNodes.push(namenode);
            } else {
                let namenode = namespace.addVariable({       
                    componentOf: device,            
                    browseName: name,            
                    dataType:  moduleTypesMap[datatype],    
                    nodeId: setID,
                    value: {
                        get: function () {
                            let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
                            return new opcua.Variant({dataType: mydataType, value: value });
                        },
                        set: function (variant) {
                            value = variant.value;                       
                            return opcua.StatusCodes.Good;
                        }
                    }
                });
                uaNodes.push(namenode);
            }
        }
        if(datatype == "Double") {
            if (writable.toString() == "false"){
                let namenode =  namespace.addVariable({
                        componentOf: device,
                        browseName: name,                
                        dataType:  moduleTypesMap[datatype],
                        nodeId: setID,
                        value: {
                            get: function () {
                                let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
                                return new opcua.Variant({dataType: mydataType, value: value});
                            },
                            set: function (variant) {
                                return opcua.StatusCodes.BadNotWritable;
                            }
                        }
                    });
                    uaNodes.push(namenode);
                } else {
                let namenode = namespace.addVariable({       
                    componentOf: device,            
                    browseName: name,            
                    dataType:  moduleTypesMap[datatype],    
                    nodeId: setID,
                    value: {
                        get: function () {
                            let mydataType = moduleTypesCodeMap[moduleTypesMap[datatype]];
                            return new opcua.Variant({dataType: mydataType, value: value });
                        },
                        set: function (variant) {
                            value = parseFloat(variant.value);
                            return opcua.StatusCodes.Good;
                        }
                    }
                });
                uaNodes.push(namenode);  
                }
        }
        uaNodeList.push(device);
    };
    
    moduleData.deletebien = function(so) {        
            namespace.deleteNode(moduleData.uaNodes[so]);      
            moduleData.uaNodes.splice(so,1);             
    }
    moduleData.deleteobject = function(so) {
        namespace.deleteNode(moduleData.uaNodeList[so]);       
    }
    // Start the server
    try
    {
        await (opcuaStartAsync(moduleData.serveropc));
    }
    catch (e)
    {
        console.log("OPCUA Server start failed : " + e);
    }

    console.log("OPCUA Server started.");    
    //store some values from server and make the magic..
    moduleData.connected = true;
    let port = moduleData.serveropc.endpoints[0].port;
    moduleData.endpointUrl = moduleData.serveropc.endpoints[0].endpointDescriptions()[0].endpointUrl; 
    console.log("OPCUA Server is now listening on port", port,"(press CTRL+C to stop Server).");
    setInterval(function(){
        moduleData.arrayvalue = [];
        moduleData.uaNodes.forEach(function(item){
            moduleData.arrayvalue.push(item._dataValue.value.value);
        })
    },2000);
    return moduleData;
});



// console.log(moduleData.serveropc)
//////////////
// moduleData.dungserver = function(){
//     moduleData.serveropc.shutdown();
// };