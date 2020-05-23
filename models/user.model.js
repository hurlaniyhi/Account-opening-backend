const mongoose = require('mongoose')

var acctSchema = new mongoose.Schema({
    email: {
        type: String
    },
    BVN: {
        type: String
    },
    DOB: {
        type: String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    passport: {
        type: String
    },
    signature: {
        type: String
    },
    idCard: {
        type: String
    },
    accountNumber: {
        type: String
    },
    password: {
        type: String
    }
    
})




mongoose.model('Account',acctSchema )