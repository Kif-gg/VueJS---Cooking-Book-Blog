export function validateUsername(username) {
    const pattern = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/i;
    let errorStack = "";
    if (!username) {
        errorStack = "Username is required!";
    } else if (username.length < 3) {
        errorStack = "Username length must be at least 3 characters!";
    } else if (username.length > 20) {
        errorStack = "Username length must not exceed 20 characters!";
    } else if (!pattern.test(username)) {
        errorStack = "Username is not valid! Allowed characters: A to Z, a to z, 0 to 9, _ (except start/end) and . (except start/end)";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateEmail(email) {
    const pattern = /^[a-z0-9._-]{3,20}@[a-z0-9.-]{3,20}\.[a-z]{2,6}$/i;
    let errorStack = "";
    if (!email) {
        errorStack = "Email is required!";
    } else if (!pattern.test(email)) {
        errorStack = "Email is not valid!"
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validatePassword(password) {
    let errorStack = "";
    if (!password) {
        errorStack += "Password is required!";
    } else if (password.length < 6) {
        errorStack += "Password length must be at least 6 characters!";
    } else if (password.length > 256) {
        errorStack += "Password length must not exceed 256 characters!"
    } else {
        if (password.includes(" ")) {
            errorStack += "Password must not contain whitespaces!";
        }
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
}

export function validateImgUrl(imgUrl) {
    const pattern = /^https?:\/\/(?:www\.)?[\w-]{3,30}\.[a-z]{2,10}(?:[\w\W]{1,300})?$/i;
    let errorStack = "";
    if (!imgUrl) {
        errorStack = "Image URL is required!";
    } else if (!pattern.test(imgUrl)) {
        errorStack = "URL is not valid!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateName(name) {
    let errorStack = "";
    if (!name) {
        errorStack = "Name is required!"
    } else if (name.length < 3) {
        errorStack = "Name length must be at least 3 characters!";
    } else if (name.length > 100) {
        errorStack = "Name length must not exceed 100 characters!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateCategory(category) {
    let errorStack = "";
    if (!category) {
        errorStack = "Category is required!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateDescription(description) {
    let errorStack = "";
    if (!description) {
        errorStack = "Description is required!";
    } else if (description.length < 10) {
        errorStack = "Description length must be at least 10 characters!";
    } else if (description.length > 200) {
        errorStack = "Description length must not exceed 200 characters!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateProducts(products) {
    let errorStack = "";
    if (!products) {
        errorStack = "Products are required!";
    } else if (products.split(", ").length <= 1) {
        errorStack = "Please separate the products just by exactly ', '!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateCooking(instructions) {
    let errorStack = "";
    if (!instructions) {
        errorStack = "Instructions are required!";
    } else if (instructions.length < 50) {
        errorStack = "Instructions length must be at least 50 characters!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
};

export function validateComment(comment) {
    let errorStack = "";
    if (!comment) {
        errorStack = "Comment is required before posting review!";
    } else if (comment.length < 3) {
        errorStack = "Comment length must be at least 3 characters!";
    } else if (comment.length > 300) {
        errorStack = "Comment length must not exceed 300 characters!";
    }
    if (errorStack.length > 0) {
        return errorStack;
    }
    return true;
}