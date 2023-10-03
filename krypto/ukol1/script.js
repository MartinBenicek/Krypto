const alphabet = {};
const czech_alphabet = {
    "Á" : "A",
    "Č" : "C",
    "Ď" : "D",
    "É" : "E",
    "Ě" : "E",
    "Í" : "I",
    "Ň" : "N",
    "Ó" : "O",
    "Ř" : "R",
    "Š" : "S",
    "Ť" : "T",
    "Ú" : "U",
    "Ů" : "U",
    "Ž" : "Z"
};

for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    alphabet[letter] = i;
}

function filtration(text){
    let filteredText = text.split("");
    for(let i = 0; i < filteredText.length; i++) {
        let character = filteredText[i];
        if (czech_alphabet[character]) {
            filteredText[i] = czech_alphabet[character];
        }
    }
    filteredText = filteredText.join("");
    return filteredText;
}

function convert(text){
    let text_array = text.split("");
    for(let i = 0; i < text_array.length; i++){
        text_array[i] = alphabet[text_array[i]];
    }
    return text_array;
}

function getLetter(dict, number){
    for(const letter in dict){
        if (dict[letter] === number) {
            return letter;
        }
    }
    return " ";
}

function encrypt(){
    let textToEncrypt = document.getElementById("to-encrypt").value.toUpperCase();
    let keys = document.getElementsByClassName("key");
    let filteredText = filtration(textToEncrypt);
    let textIndex = convert(filteredText);
    let newArray = [];
    for (let i = 0; i < textIndex.length; i++) {
        newArray.push((parseInt(keys[0].value) * textIndex[i] + parseInt(keys[1].value)) % 26);
        if((i + 1) % 5 === 0){
            newArray.push(" ");
        }
    }
    console.log(newArray);
    let finalEncryption = newArray.map(value => getLetter(alphabet, value));
    console.log(finalEncryption)
    document.getElementById("vystup").value = finalEncryption.join("");
}

/* vstup do encryptu
odstranit ?
zpatky bez diakrit 
qxw pro mezeru
potom zašifrovat qwx
*/