function escapeSpecialChars(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createRegExp(query) {
    const modifiedQuery = query
        .split(" ")
        .filter(q => q != "")
        .map(escapeSpecialChars)
        .join(")(?=.*");
    return `^(?=.*${modifiedQuery}).*$`;

}

module.exports = {
    createRegExp
}
