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
    "Ž" : "Z",
    " " : "QXW",
    "Ý" : "Y",
    "?" : " ",
    "!" : " ",
    "(" : " ",
    ")" : " ",
    "'" : " ",
    "." : " ",
    "," : " ",
    "-" : " ",
    "/" : " ",
    ":" : " ",
    ">" : " ",
    "<" : " ",
    "§" : " ",
    "_" : " ",
    "*" : " ",
    "$" : " ",
    "ß" : " ",
    "÷" : " ",
    "×" : " ",
    "0" : "XXXX",
    "1" : "XXXQ",
    "2" : "XXQQ",
    "3" : "XQQQ",
    "4" : "QQQQ",
    "5" : "XQQX",
    "6" : "QQQW",
    "7" : "QQWW",
    "8" : "QWWW",
    "9" : "WWWW"
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
    filteredText = filteredText.join("").replace(/ /g,'');
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
    const textToEncrypt = document.getElementById("to-encrypt").value.toUpperCase();
    const keys = document.getElementsByClassName("key");
    document.getElementsByClassName("warning")[0].style.display = "none";
    document.getElementsByClassName("filtr")[0].value = "";
    document.getElementsByClassName("output")[0].value = "";
    if(gcd(parseInt(keys[0].value), 26) != 1){
        document.getElementsByClassName("warning")[0].style.display = "block";
        return;
    }
    let filteredText = filtration(textToEncrypt);
    document.getElementsByClassName("filtr")[0].value = filteredText;
    let textIndex = convert(filteredText);
    let newArray = [];
    for (let i = 0; i < textIndex.length; i++) {
        newArray.push((parseInt(keys[0].value) * textIndex[i] + parseInt(keys[1].value)) % 26);
        if((i + 1) % 5 === 0){
            newArray.push(" ");
        }
    }
    let finalEncryption = newArray.map(value => getLetter(alphabet, value));
    document.getElementsByClassName("output")[0].value = finalEncryption.join("");
}

function modInverse(a, modulo){
    for(let i = 1; i < modulo; i++)
        if (((a % modulo) * (i % modulo)) % modulo == 1)
            return i;
}

function decryptSpace(arraySpaces){
    for(let i = 0; i < arraySpaces.length; i++){
        if(arraySpaces[i] === "Q" && arraySpaces[i+1] === "X" && arraySpaces[i+2] === "W"){
            arraySpaces.splice(i, 3, " ");
        }
    }
    return arraySpaces;
}

function gcd(a, b){
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function decryptNumbers(arrayNumbers){
    for(let i = 0; i < arrayNumbers.length; i++){
        if(arrayNumbers[i] === "X" && arrayNumbers[i+1] === "X" && arrayNumbers[i+2] === "X" && arrayNumbers[i+3] === "X"){
            arrayNumbers.splice(i, 4, "0");
        } else if(arrayNumbers[i] === "X" && arrayNumbers[i+1] === "X" && arrayNumbers[i+2] === "X" && arrayNumbers[i+3] === "Q"){
            arrayNumbers.splice(i, 4, "1");
        } else if(arrayNumbers[i] === "X" && arrayNumbers[i+1] === "X" && arrayNumbers[i+2] === "Q" && arrayNumbers[i+3] === "Q"){
            arrayNumbers.splice(i, 4, "2");
        } else if(arrayNumbers[i] === "X" && arrayNumbers[i+1] === "Q" && arrayNumbers[i+2] === "Q" && arrayNumbers[i+3] === "Q"){
            arrayNumbers.splice(i, 4, "3");
        } else if(arrayNumbers[i] === "Q" && arrayNumbers[i+1] === "Q" && arrayNumbers[i+2] === "Q" && arrayNumbers[i+3] === "Q"){
            arrayNumbers.splice(i, 4, "4");
        } else if(arrayNumbers[i] === "X" && arrayNumbers[i+1] === "Q" && arrayNumbers[i+2] === "Q" && arrayNumbers[i+3] === "X"){
            arrayNumbers.splice(i, 4, "5");
        } else if(arrayNumbers[i] === "Q" && arrayNumbers[i+1] === "Q" && arrayNumbers[i+2] === "Q" && arrayNumbers[i+3] === "W"){
            arrayNumbers.splice(i, 4, "6");
        } else if(arrayNumbers[i] === "Q" && arrayNumbers[i+1] === "Q" && arrayNumbers[i+2] === "W" && arrayNumbers[i+3] === "W"){
            arrayNumbers.splice(i, 4, "7");
        } else if(arrayNumbers[i] === "Q" && arrayNumbers[i+1] === "W" && arrayNumbers[i+2] === "W" && arrayNumbers[i+3] === "W"){
            arrayNumbers.splice(i, 4, "8");
        } else if(arrayNumbers[i] === "W" && arrayNumbers[i+1] === "W" && arrayNumbers[i+2] === "W" && arrayNumbers[i+3] === "W"){
            arrayNumbers.splice(i, 4, "9");
        }
    }
    return arrayNumbers;
}


function decrypt(){
    const textToDecrypt = document.getElementById("to-decrypt").value.toUpperCase();
    const keys = document.getElementsByClassName("key");
    document.getElementsByClassName("warning")[1].style.display = "none";
    document.getElementsByClassName("filtr")[1].value = "";
    document.getElementsByClassName("output")[1].value = "";
    if(gcd(parseInt(keys[2].value), 26) != 1){
        document.getElementsByClassName("warning")[1].style.display = "block";
        return;
    }
    let deleteSpace = textToDecrypt.split(" ");
    deleteSpace = deleteSpace.join("");
    let filteredText = filtration(deleteSpace);
    document.getElementsByClassName("filtr")[1].value = filteredText;
    let textIndex = convert(filteredText);
    let newArray = [];
    let inverseAkey = modInverse(keys[2].value, 26);
    console.log(textIndex);
    for (let i = 0; i < textIndex.length; i++) {
        let decryptedLetter = ((textIndex[i] - parseInt(keys[3].value)) * inverseAkey)% 26;
        if (decryptedLetter < 0){
            decryptedLetter += 26;
        }
        newArray[i] = decryptedLetter;
    }
    console.log(newArray);
    let finalDecryption = newArray.map(value => getLetter(alphabet, value));
    console.log(finalDecryption);
    let removeSpace = decryptSpace(finalDecryption);
    let decryptNumber = decryptNumbers(removeSpace);
    document.getElementsByClassName("output")[1].value = decryptNumber.join("");
}