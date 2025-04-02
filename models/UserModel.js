const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    username:{type: String, required: true,minLength:2},
    passwordHash: { type: int,required:true,minLength:6 },
    role: {
        type: String,
        enum: ['admin', 'developer', 'support'],
        required: true
    },
}, { timestamps: true });
module.exports = mongoose.model("User",UserModel)