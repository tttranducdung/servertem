var configValues = require("./config.json");

module.exports = {
    getDbConnectionString: function(){
        return `mongodb+srv://${ configValues.username }:${ configValues.password }@cluster0-nqhhs.mongodb.net/test?retryWrites=true&w=majority`;
    }
}






