const Admin = require("../Models/Admin");
const BlacklistedToken = require("../Models/BlacklistedToken");
const Recipe = require("../Models/Recipe");

const bcrypt = require("bcrypt");

const { createToken } = require("../Util/tokenManager");
const { validateImgUrl } = require("../Util/inputValidator");

async function login(formData) {
    try {
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
    } catch (error) {
        throw error;
    }
};

async function logout(token) {
    await BlacklistedToken.create({ token });
};

async function createRecipe(formData) {
    try {
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

        return Recipe.create({
            imgUrl,
            name,
            category,
            description,
            productsNeeded,
            instructions
        });
    } catch (error) {
        throw error;
    }
};

async function editRecipe(recipe, formData) {
    try {
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
    } catch (error) {
        throw error;
    }
};

async function deleteRecipe(recipe) {
    return Recipe.findByIdAndDelete(recipe._id);
};