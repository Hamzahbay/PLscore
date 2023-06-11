const mongoose = require('mongoose')

//MONGO ATLAS URI (ONLINE DB)
const atlasURI = 'mongodb://hamzah123:PLSCORE123@cluster0-shard-00-00.ubbbh.mongodb.net:27017,cluster0-shard-00-01.ubbbh.mongodb.net:27017,cluster0-shard-00-02.ubbbh.mongodb.net:27017/plscore_db?ssl=true&replicaSet=atlas-9de5nt-shard-0&authSource=admin&retryWrites=true&w=majority'
// const atlasURI = 'mongodb+srv://hamzah123:6UL5FjEXLyLlGeXr@cluster0.ubbbh.mongodb.net/plscore_db?retryWrites=true&w=majority'

//MONGO COMPASS URI (LOCAL DB)
const compassURI = 'mongodb://localhost/plscore-db'

//CONNECT TO DB FUNCTION
const dbConnection = URI => {
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB Connection Succeed')).catch(err => console.log(err))
}

//CALL FUNCTION CONNECTION
dbConnection(compassURI)