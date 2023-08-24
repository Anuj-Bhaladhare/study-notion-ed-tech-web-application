const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async() => {
        
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            UseNewUnifideTopology: true,
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
