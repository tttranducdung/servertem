
module.exports = function (io,appConfig2) {
    var value = new Array();                   
    var dinhdanh = new Array();                   
    var datatype = new Array();                   
    var access = new Array();                   
    var name = new Array(); 
    var name1 = new Array(); 
 
    io.on('connection', function (socket){ 
        socket.on('data', function () {  
            value = [];dinhdanh=[];datatype=[];access=[];name=[];            
            for( i = 0 ; i < appConfig2.SimulationData.length ; i++ ){  
                for( j = 0 ; j < appConfig2.SimulationData[i].variablesList.length ; j++ ){                  
                    value.push(appConfig2.SimulationData[i].variablesList[j].value);
                    dinhdanh.push(appConfig2.SimulationData[i].variablesList[j].id);
                    datatype.push(appConfig2.SimulationData[i].variablesList[j].dataType);
                    access.push(appConfig2.SimulationData[i].variablesList[j].writable);
                    name.push(appConfig2.SimulationData[i].variablesList[j].name);                    
                };              
            };
            socket.emit('value',value);
            socket.emit('dinhdanh',dinhdanh);
            socket.emit('datatype',datatype);
            socket.emit('access',access);
            socket.emit('name',name);
      });  
      socket.on('data1', function () {  
        name1=[];            
        for( i = 0 ; i < appConfig2.SimulationData.length ; i++ ){  
            for( j = 0 ; j < appConfig2.SimulationData[i].variablesList.length ; j++ ){                  
                name1.push(appConfig2.SimulationData[i].variablesList[j].name);                    
            };              
        };   
        socket.emit('name1',name1);
  });  
    })
}
