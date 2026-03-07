// Text Indexer utility for rule search
const fs = require('fs');
const path = require('path');


function indexJsonDictionaries(jsonDir) {
    const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
    const dictionaryIndex = {};
    for (const file of files) {
        const filePath = path.join(jsonDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (content.dictionary && Array.isArray(content.dictionary)) {
            dictionaryIndex[file] = content.dictionary;
        }
    }
    return dictionaryIndex;
}


function searchDictionary(dictionaryIndex, keyword, maxResults = 10) {
    const results = [];
    for (const [file, dictionary] of Object.entries(dictionaryIndex)) {
        for (const entry of dictionary) {
            if (entry.word && entry.word.toLowerCase().includes(keyword.toLowerCase())) {
                results.push({ file, word: entry.word, definition: entry.definition });
                if (results.length >= maxResults) break;
            }
        }
    }
    return results;
}

module.exports = { indexJsonDictionaries, searchDictionary };
module.exports = { indexJsonDictionaries, searchDictionary };
