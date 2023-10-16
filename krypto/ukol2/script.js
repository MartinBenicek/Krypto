/* z Q se stane  O */
const alphabet = [];
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
    "Ý" : "Y"
};

for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    alphabet[i] = letter;
}

function encryptionKey(text){
    let text_array = text.split("");
    let newArray = []
    const outputSquares = document.getElementsByClassName("output-square");
    for(let i = 0; i < text_array.length; i++){
        if(newArray.includes(text_array[i]) === false){
            newArray.push(text_array[i])
        }
    }
    for(let i = 0; i < alphabet.length - 1; i++){
        if (i < newArray.length){
            outputSquares[i].value = newArray[i];
        } else{
            outputSquares[i].value = alphabet[i];
        }
    }
}

function pairLetters(text){
    let text_array = text.split("");
    let newArray = []
    let newArray2 = []
    for(let i = 0; i < text_array.length; i++){
        newArray.push(text_array[i])
        if(text_array[i] === text_array[i+1]){
            newArray.push("X");
        }
        if((i + 1) % 2 === 1 && text_array[i+1] == null){
            newArray.push("X"); 
        }
    }
    for(let i = 0; i < newArray.length; i++){
        newArray2.push(newArray[i])
        if((i + 1) % 2 === 0 && newArray[i+1] != null){
            newArray2.push(" ");
        }
    }
    console.log(newArray);
    console.log(newArray2);
}

function encrypt(){
    const textToEncrypt = document.getElementById("text-to-encrypt").value.toUpperCase();
    const textAsKey = document.getElementById("encryption-key").value.toUpperCase();
    encryptionKey(textAsKey);
    let pairedLetters = pairLetters(textToEncrypt)
}