function validateUsername(username) {
    const pattern = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/i;
    return pattern.test(username);
}

function validateEmail(email) {
    const pattern = /^[a-z0-9._-]{3,20}@[a-z0-9.-]{3,20}\.[a-z]{2,6}$/i;
    return pattern.test(email);
}

module.exports = {
    validateUsername,
    validateEmail
};