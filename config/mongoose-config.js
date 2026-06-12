const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/stach")
.then(
    console.log("connected to the DB")
)
.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connect