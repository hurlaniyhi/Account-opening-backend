const mongoose = require('mongoose')

var acctSchema = new mongoose.Schema({
    Email: {
        type: String
    },
    Bvn: {
        type: String
    },
    Dob: {
        type: String
    },
    FirstName: {
        type: String
    },
    MiddleName: {
        type: String
    },
    LastName: {
        type: String
    },
    PhoneNumber: {
        type: Number
    },
    Address: {
        type: String
    },
    Gender: {
        type: String
    },
    Passport: {
        type: String
    },
    Signature: {
        type: String
    },
    IdCard: {
        type: String
    },
    AccountNumber: {
        type: String
    },
    Password: {
        type: String
    }
    
})




mongoose.model('Account',acctSchema )