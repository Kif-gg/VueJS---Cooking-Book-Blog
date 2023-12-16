const Admin = require("../Models/Admin");
const BlacklistedToken = require("../Models/BlacklistedToken");
const Recipe = require("../Models/Recipe");
const User = require("../Models/User");
const Review = require("../Models/Review");
const bcrypt = require("bcrypt");
const { createToken } = require("../Util/tokenManager");
const { validateImgUrl } = require("../Util/inputValidator");
const { getSingleInstance } = require("../Models/Dashboard");
const { createRegExp } = require("../Util/regexGenerator");

async function login(formData) {
    const { email, password, pin } = formData;
    if (!email || !password || !pin) {
        throw new Error("Incorrect email, password, or PIN!");
    }
    const admin = await Admin.findOne({ email }).collation({ locale: "en", strength: 2 });

    if (!admin) {
        throw new Error("Incorrect email, password or PIN!");
    }

    const matchPassword = await bcrypt.compare(password, admin.hashedPassword);
    const matchPin = await bcrypt.compare(pin, admin.hashedPin);

    if (!matchPassword || !matchPin) {
        throw new Error("Incorrect email, password or PIN!");
    }

    return createToken(admin);
};

async function logout(token) {
    await BlacklistedToken.create({ token });
};

async function getDashboard() {
    const { usersDashboard, recipesDashboard, reviewsDashboard } = await getSingleInstance();

    return {
        usersDashboard,
        recipesDashboard,
        reviewsDashboard
    };
};

async function createOrEditRecipe(formData, recipeFromEditMode) {
    const { imgUrl, name, category, description, productsNeeded, instructions } = formData;

    let errorStack = "";
    if (!imgUrl) {
        errorStack += "Image URL is required!\r\n";
    } else if (!validateImgUrl(imgUrl)) {
        errorStack += "URL is not valid!\r\n";
    }
    if (!name) {
        errorStack += "Name is required!\r\n"
    } else if (name.length < 3) {
        errorStack += "Name length must be at least 3 characters!\r\n";
    } else if (name.length > 100) {
        errorStack += "Name length must not exceed 100 characters!\r\n";
    }
    if (!category) {
        errorStack += "Category is required!\r\n";
    }
    if (!description) {
        errorStack += "Description is required!\r\n";
    } else if (description.length < 10) {
        errorStack += "Description length must be at least 10 characters!\r\n";
    } else if (description.length > 200) {
        errorStack += "Description length must not exceed 200 characters!\r\n";
    }
    if (!productsNeeded) {
        errorStack += "Products are required!\r\n";
    } else if (productsNeeded.split(", ").length <= 1) {
        errorStack += "Please separate the products just by exactly ', '!\r\n";
    }
    if (!instructions) {
        errorStack += "Instructions are required!\r\n";
    } else if (instructions.length < 50) {
        errorStack += "Instructions length must be at least 50 characters!\r\n";
    }

    if (recipeFromEditMode) {
        if (recipeFromEditMode.imgUrl == imgUrl
            && recipeFromEditMode.name == name
            && recipeFromEditMode.category == category
            && recipeFromEditMode.description == description
            && recipeFromEditMode.productsNeeded == productsNeeded
            && recipeFromEditMode.instructions == instructions) {
            errorStack += "You must change at least 1 field!\r\n";
        }
    }

    if (errorStack.length > 0) {
        throw new Error(errorStack);
    }

    if (recipeFromEditMode) {
        recipeFromEditMode.imgUrl = imgUrl;
        recipeFromEditMode.name = name;
        recipeFromEditMode.category = category;
        recipeFromEditMode.description = description;
        recipeFromEditMode.productsNeeded = productsNeeded.split(", ");
        recipeFromEditMode.instructions = instructions;
        return recipeFromEditMode.save();
    }

    return Recipe.create({
        imgUrl,
        name,
        category,
        description,
        productsNeeded: productsNeeded.split(", "),
        instructions
    });
};

async function deleteRecipe(recipe) {
    const users = await User.find({ favorites: recipe._id });
    const reviews = await Review.find({});
    for (const user of users) {
        user.favorites.splice(user.favorites.findIndex(fav => fav._id.toString() === recipe._id.toString()), 1);
        user.save();
    }
    let deletedCount = 0;
    for (const review of reviews) {
        if (recipe.reviews.find(rev => rev._id.toString() === review._id.toString())) {
            const users2 = await User.find({ reviews: review._id })
            for (const user of users2) {
                user.reviews.splice(user.reviews.findIndex(rev => rev._id.toString() === review._id.toString()));
                user.save();
            }
            await Review.findByIdAndDelete(review._id);
            deletedCount++;
        }
    }
    await Recipe.findByIdAndDelete(recipe._id);
    return deletedCount;
};

async function getAllUsers() {
    return User.find({}).sort({ username: 1 });
};

async function getUsersFiltered(formData) {
    let { search, status, criteria, direction } = formData;
    if (!search) {
        search = "";
    }
    if (status.toLowerCase() == "active") {
        status = false;
    } else if (status.toLowerCase() == "blocked") {
        status = true;
    } else {
        status = { $in: [true, false] };
    }
    if (criteria.toLowerCase() == "createdat") {
        criteria = "createdAt";
    }
    if (!criteria || (criteria.toLowerCase() != "username" && criteria.toLowerCase() != "createdat")) {
        criteria = "username";
    }
    if (!direction || direction.toLowerCase() != "descending") {
        direction = "ascending";
    }

    const searchMatch = new RegExp(createRegExp(search), "is");

    return User
        .find({ blocked: status })
        .or([{ "username": searchMatch }, { "email": searchMatch }])
        .sort({ [criteria]: direction });
};

async function editUser(user, formData) {
    const { blocked } = formData;
    user.blocked = blocked;
    return user.save();
};

async function deleteUser(user) {
    const recipes = await Recipe.find({}).populate('reviews');
    for (const recipe of recipes) {
        const index = recipe.reviews.findIndex(rev => rev.userId.toString() === user._id.toString());
        if (index >= 0) {
            recipe.reviews.splice(index, 1);
            await recipe.save();
        }
    }
    const deletedResult = await Review.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);
    return deletedResult.deletedCount;
};

module.exports = {
    login,
    logout,
    getDashboard,
    createOrEditRecipe,
    deleteRecipe,
    getAllUsers,
    getUsersFiltered,
    editUser,
    deleteUser
};