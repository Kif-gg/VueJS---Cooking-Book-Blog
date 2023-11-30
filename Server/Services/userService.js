const User = require("../Models/User");
const BlacklistedToken = require("../Models/BlacklistedToken");

const bcrypt = require("bcrypt");

const { validateUsername, validateEmail } = require("../Util/inputValidator");
const { createToken } = require("../Util/tokenManager");

async function register(formData) {
    try {
        let errorStack = "";
        const { username, email, password, repass } = formData;
        const existingUsername = await User.findOne({ username }).collation({ locale: "en", strength: 2 });
        const existingEmail = await User.findOne({ email }).collation({ locale: "en", strength: 2 });

        if (existingUsername) {
            errorStack += "Username already exists!\r\n";
        }
        if (existingEmail) {
            errorStack += "Email already registered!\r\n";
        }
        if (!username || username.length == 0) {
            errorStack += "Username is required!\r\n";
        } else if (username.length < 3) {
            errorStack += "Username length must be at least 3 characters!\r\n"
        } else if (username.length > 20) {
            errorStack += "Username length must not exceed 20 characters!\r\n"
        } else if (!validateUsername(username)) {
            errorStack += "Username is not valid!\r\nAllowed characters: A to Z, a to z, 0 to 9, _ (except start/end) and . (except start/end)\r\n";
        }
        if (!email) {
            errorStack += "Email is required!\r\n";
        } else if (!validateEmail(email)) {
            errorStack += "Email is not valid!\r\n"
        }
        if (!password) {
            errorStack += "Password is required!\r\n";
        } else if (password.length < 6) {
            errorStack += "Password length must be at least 6 characters!\r\n";
        } else if (password.length > 256) {
            errorStack += "Password length must not exceed 256 characters!\r\n"
        } else {
            if (password.includes(" ")) {
                errorStack += "Password must not contain whitespaces!\r\n";
            }
            if (!repass || repass != password) {
                errorStack += "Repeated password does not match the original!\r\n"
            }
        }
        if (errorStack.length > 0) {
            throw new Error(errorStack);
        }

        const user = await User.create({
            username,
            email,
            hashedPassword: await bcrypt.hash(password, 12)
        });
        return createToken(user);
    } catch (error) {
        throw error;
    }
};

async function login(formData) {
    try {
        const { username, password } = formData;
        const user = await User.findOne({ username }).collation({ locale: "en", strength: 2 });

        if (!user) {
            throw new Error("Incorrect username or password!");
        }

        if (user.blocked) {
            throw new Error("This account is blocked! Contact support via email to unblock Your account!");
        }

        const match = bcrypt.compare(password, user.hashedPassword);
        if (!match) {
            throw new Error("Incorrect username or password!");
        }

        return createToken(user);
    } catch (error) {
        throw error;
    }
};

async function logout(token) {
    await BlacklistedToken.create({ token });
};

async function changeEmail(user, formData) {
    try {
        const { oldEmail, newEmail, reEmail } = formData;
        let errorStack = "";
        if (!oldEmail) {
            errorStack += "Old email is required!\r\n";
        }
        if (user.email.toLowerCase() != oldEmail.toLowerCase()) {
            errorStack += "Old email is wrong!\r\n";
        }
        if (!newEmail) {
            errorStack += "New email is required!\r\n";
        }
        if (user.email.toLowerCase() == newEmail.toLowerCase()) {
            errorStack += "New email can't be Your old email!\r\n";
        }
        if (!validateEmail(newEmail)) {
            errorStack += "New email is not valid!\r\n";
        }
        if (!reEmail || newEmail != reEmail) {
            errorStack += "Repeated email does not match the original!\r\n";
        }
        if (errorStack.length > 0) {
            throw new Error(errorStack);
        }

        user.email = newEmail;
        return user.save();
    } catch (error) {
        throw error;
    }
};


async function changePassword(user, formData) {
    try {
        const { oldPassword, newPassword, repass } = formData;
        let errorStack = "";
        if (!oldPassword) {
            errorStack += "Old password is required!\r\n";
        }
        const match = await bcrypt.compare(oldPassword, user.hashedPassword);
        if (!match) {
            errorStack += "Old password is wrong!\r\n";
        }
        if (!newPassword) {
            errorStack += "New password is required!\r\n";
        } else if (newPassword.length < 6) {
            errorStack += "New password length must be at least 6 characters!\r\n";
        } else if (newPassword.length > 256) {
            errorStack += "New password length must not exceed 256 characters!\r\n";
        } else {
            if (newPassword.includes(" ")) {
                errorStack += "Password must not contain whitespaces!\r\n";
            }
            if (oldPassword == newPassword) {
                errorStack += "New password can't be Your old password!\r\n";
            }
            if (!repass || newPassword != repass) {
                errorStack += "Repeated password does not match the original!\r\n";
            }
        }

        if (errorStack.length > 0) {
            throw new Error(errorStack);
        }

        user.hashedPassword = await bcrypt.hash(newPassword, 12);
        return user.save();
    } catch (error) {
        throw error;
    }
};

async function deleteUser(user, formData) {
    try {
        const { username, email, password, repass } = formData;
        let errorStack = "";
        if (!username) {
            errorStack += "Username is required!\r\n";
        } else if (user.username.toLowerCase() != username.toLowerCase()) {
            errorStack += "Incorrect username\r\n";
        }
        if (!email) {
            errorStack += "Email is required!\r\n";
        } else if (user.email.toLowerCase() != email.toLowerCase()) {
            errorStack += "Incorrect email!\r\n";
        }
        const match = bcrypt.compare(password, user.hashedPassword);
        if (!password) {
            errorStack += "Password is required!\r\n";
        } else if (!match) {
            errorStack += "Incorrect password!\r\n";
        } else if (!repass || repass != password) {
            errorStack += "Repeated password does not match the original!\r\n";
        }

        if (errorStack.length > 0) {
            throw new Error(errorStack);
        }

        return User.findByIdAndDelete(user._id);
    } catch (error) {
        throw error;
    }
};


async function getUserById(id) {
    return User.findById(id);
};

module.exports = {
    register,
    login,
    logout,
    changeEmail,
    changePassword,
    deleteUser,
    getUserById
};