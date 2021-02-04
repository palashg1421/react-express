/**
 * The User model
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        require: false
    },
    image: {
        type: String,
        required: false
    }
}, {timestamps: true});

UserSchema.pre('save', async function(next)  {
    try
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch (error)
    {
        console.log(error);
    }
});

module.exports = mongoose.model('userModel', UserSchema, 'user');