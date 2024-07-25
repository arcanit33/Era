const stringSimilarity = require('string-similarity');
const unorm = require('unorm');

function normalizeString(str) {
    // Normalize the string using NFD form
    return unorm.nfd(str);
}

function areStringsSimilar(str1, str2) {
    // Normalize both strings
    const normalizedStr1 = normalizeString(str1.toLowerCase());
    const normalizedStr2 = normalizeString(str2.toLowerCase());

    // Calculate the similarity ratio
    const similarityRatio = stringSimilarity.compareTwoStrings(normalizedStr1, normalizedStr2);

    // You can adjust the threshold as needed. Here, I'm using 0.8 as an example.
    return similarityRatio
}


module.exports = {
    areStringsSimilar
}