const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async() => {
        
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifideTopology: true,
        })
        .then( () => {
            console.log("Database connect successfulll...!");
        })
        .catch( (error) => {
             console.log("database not connect ");
             console.error(error)
             process.exit(1)
        })
    }
