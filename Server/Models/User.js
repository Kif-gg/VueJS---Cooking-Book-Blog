const { Schema, model, Types: { ObjectId } } = require("mongoose");

// Regex complexity is not high due to nature of the project!

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [true, "Username already exist!"],
        minLength: [3, "Username length must be at least three characters!"],
        maxLength: [20, "Username length can't exceed twenty characters!"],
        match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/i, "Username is not valid!\r\nAllowed characters: A to Z, a to z, 0 to 9, _ (except start/end) and . (except start/end)"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already registered!"],
        match: [/^[a-z0-9._-]{3,20}@[a-z0-9.-]{3,20}\.[a-z]{2,6}$/i, "Email is not valid!"]
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required!"]
    },
    blocked: {
        type: Boolean,
        default: false
    },
    favorites: {
        type: [ObjectId],
        ref: "Recipe",
        default: []
    },
    comments: {
        type: [ObjectId],
        ref: "Comment",
        default: []
    }
}, { timestamps: { createdAt: "createdAt" } });

userSchema.index({ username: 1 }, {
    collation: {
        locale: "en",
        strength: 2
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: "en",
        strength: 2
    }
});

const User = model("User", userSchema);

module.exports = User;