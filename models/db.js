const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ridwan:ridwan526@ridwanlock-uqlxu.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    // mongodb+srv://ridwan:ridwan526@ridwanlock-uqlxu.mongodb.net/test?retryWrites=true&w=majority
    if(!err){
        console.log('mongodb successfully connected')
    }
    else{
        console.log("error in DB connection")
    }
})

require('./user.model.js')