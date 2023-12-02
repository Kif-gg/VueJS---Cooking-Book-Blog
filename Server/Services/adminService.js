const Admin = require("../Models/Admin");
const BlacklistedToken = require("../Models/BlacklistedToken");
const Recipe = require("../Models/Recipe");
const User = require("../Models/User");

const bcrypt = require("bcrypt");

const { createToken } = require("../Util/tokenManager");
const { validateImgUrl } = require("../Util/inputValidator");
const { getSingleInstance } = require("../Models/Dashboard");
const { getTodaysRecords, getThisWeeksRecords } = require("../Util/dateFilter");

async function login(formData) {
    const { email, password, pin } = formData;
    const admin = await Admin.findOne({ email }).collation({ locale: "en", strength: 2 });

    if (!admin) {
        throw new Error("Incorrect email, password or PIN!");
    }

    const matchPassword = bcrypt.compare(password, admin.hashedPassword);
    const matchPin = bcrypt.compare(pin, admin.hashedPin);

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

    const usersCurrently = usersDashboard.totalRegistered.length - usersDashboard.totalDeleted.length;
    const usersRegisteredToday = getTodaysRecords(usersDashboard.totalRegistered).length;
    const usersRegisteredThisWeek = getThisWeeksRecords(usersDashboard.totalRegistered).length;
    const usersRegisteredOverall = usersDashboard.totalRegistered.length;

    const usersDeletedToday = getTodaysRecords(usersDashboard.totalDeleted).length;
    const usersDeletedThisWeek = getThisWeeksRecords(usersDashboard.totalDeleted).length;;
    const usersDeletedOverall = usersDashboard.totalDeleted.length;

    const recipesCurrently = recipesDashboard.totalCreated.length - recipesDashboard.totalDeleted.length;
    const recipesCreatedToday = getTodaysRecords(recipesDashboard.totalCreated).length;
    const recipesCreatedThisWeek = getThisWeeksRecords(recipesDashboard.totalCreated).length;
    const recipesCreatedOverall = recipesDashboard.totalCreated.length;

    const recipesDeletedToday = getTodaysRecords(recipesDashboard.totalDeleted).length;
    const recipesDeletedThisWeek = getThisWeeksRecords(recipesDashboard.totalDeleted).length;
    const recipesDeletedOverall = recipesDashboard.totalDeleted.length;

    const reviewsCurrently = reviewsDashboard.totalPosted.length - reviewsDashboard.totalDeleted.length;
    const reviewsPostedToday = getTodaysRecords(reviewsDashboard.totalPosted).length;
    const reviewsPostedThisWeek = getThisWeeksRecords(reviewsDashboard.totalPosted).length;
    const reviewsPostedOverall = reviewsDashboard.totalPosted.length;

    const reviewsDeletedToday = getTodaysRecords(reviewsDashboard.totalDeleted).length;
    const reviewsDeletedThisWeek = getThisWeeksRecords(reviewsDashboard.totalDeleted).length;
    const reviewsDeletedOverall = reviewsDashboard.totalDeleted.length;

    return {
        usersDashboard: {
            usersCurrently,
            usersRegisteredToday,
            usersRegisteredThisWeek,
            usersRegisteredOverall,

            usersDeletedToday,
            usersDeletedThisWeek,
            usersDeletedOverall
        },
        recipesDashboard: {
            recipesCurrently,
            recipesCreatedToday,
            recipesCreatedThisWeek,
            recipesCreatedOverall,

            recipesDeletedToday,
            recipesDeletedThisWeek,
            recipesDeletedOverall
        },
        reviewsDashboard: {
            reviewsCurrently,
            reviewsPostedToday,
            reviewsPostedThisWeek,
            reviewsPostedOverall,

            reviewsDeletedToday,
            reviewsDeletedThisWeek,
            reviewsDeletedOverall
        }
    };
};

async function createRecipe(formData) {
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
    }
    if (!instructions) {
        errorStack += "Instructions are required!\r\n";
    } else if (instructions.length < 50) {
        errorStack += "Instructions length must be at least 50 characters!\r\n";
    }

    if (errorStack.length > 0) {
        throw new Error(errorStack);
    }

    const DASHBOARD = await getSingleInstance();
    DASHBOARD.recipesDashboard.totalCreated.push(new Date(Date.now()));
    DASHBOARD.save();
    return Recipe.create({
        imgUrl,
        name,
        category,
        description,
        productsNeeded,
        instructions
    });
};

async function editRecipe(recipe, formData) {
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
    }
    if (!instructions) {
        errorStack += "Instructions are required!\r\n";
    } else if (instructions.length < 50) {
        errorStack += "Instructions length must be at least 50 characters!\r\n";
    }

    if (recipe.imgUrl == imgUrl
        && recipe.name == name
        && recipe.category == category
        && recipe.description == description
        && recipe.productsNeeded == productsNeeded
        && recipe.instructions == instructions) {
        errorStack += "You must change at least 1 field!\r\n";
    }

    if (errorStack.length > 0) {
        throw new Error(errorStack);
    }

    recipe.imgUrl = imgUrl;
    recipe.name = name;
    recipe.category = category;
    recipe.description = description;
    recipe.productsNeeded = productsNeeded;
    recipe.instructions = instructions;

    return recipe.save();
};

async function deleteRecipe(recipe) {
    const DASHBOARD = await getSingleInstance();
    DASHBOARD.recipesDashboard.totalDeleted.push(new Date(Date.now()));
    DASHBOARD.save();
    return Recipe.findByIdAndDelete(recipe._id);
};

async function editUser(user, formData) {
    const { checkboxChecked } = formData;
    user.blocked = checkboxChecked;
    return user.save();
};

async function deleteUser(user) {
    const DASHBOARD = await getSingleInstance();
    DASHBOARD.usersDashboard.totalDeleted.push(new Date(Date.now()));
    DASHBOARD.save();
    return User.findByIdAndDelete(user._id);
};

module.exports = {
    login,
    logout,
    getDashboard,
    createRecipe,
    editRecipe,
    deleteRecipe,
    editUser,
    deleteUser
};