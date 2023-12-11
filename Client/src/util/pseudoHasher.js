export function hash(str) {
    let hashedStr = '';
    for (let i = 0; i < str.length; i++) {
        if (i % 2 == 0) {
            hashedStr += str.charAt(i) + String.fromCharCode((str.charCodeAt(i) + 6));
            hashedStr = btoa(hashedStr);
        } else {
            hashedStr += str.charAt(i) + String.fromCharCode((str.charCodeAt(i) - 9));
            hashedStr = btoa(hashedStr);
        }
    }
    return btoa(hashedStr);
};

export function verifyString(str, hashedStr) {
    return hash(str) === hashedStr;
};