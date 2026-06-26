const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            const isValid = validator.isEmail(value)
            if (!isValid) {
                throw new Error("Not a valid email id.")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Not a strong password");
            }
        }
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid.")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo url is inValid.")
            }
        }
    },
    about: {
        type: String,
        default: "This is a default discription."
    },
    skills: {
        type: [String],
        default: ["JS"]
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "megha@3940", {
        expiresIn: "1d"
    });

    return token;
}

userSchema.methods.verifyPassword = async function (passwordInput) {
    const user = this;
    const passwordHash = user.password;

    const isValid = await bcrypt.compare(passwordInput, passwordHash);

    return isValid;
}

const User = mongoose.model("User", userSchema);

module.exports = { User };