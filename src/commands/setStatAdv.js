/** 
 * !setstatadv command for setting advantage or disadvantage on a stat of a given character.
 * Usage: !setstatadv <characterName> <statName> 
 */

const { fetchCharacterSheet } = require('./fetchSheet');
const { storeCharacterSheet } = require('./storeSheet');
const fs = require('fs');

function setStatAdv(characterName, statName) {
    // fetchCharacterSheet returns the file path
    const filePath = fetchCharacterSheet(characterName);
    
    // Read and parse the JSON file to get the actual sheet object
    const sheetData = fs.readFileSync(filePath, 'utf8');
    const sheetJSON = JSON.parse(sheetData);
    const sheet = sheetJSON.character_sheet;

    // Set the given stat to advantage, only one stat can be advantage at a time
    for (const stat in sheet.stats) {
        if (stat === statName) {
            sheet.stats[stat].key_stat = 'advantage';
        } else {
            if (sheet.stats[stat].key_stat === 'advantage') {
                sheet.stats[stat].key_stat = 'normal';
            }
        }
    }
        
    storeCharacterSheet(characterName, sheetJSON);

    return sheet.stats;
}

module.exports = {
    setStatAdv
}