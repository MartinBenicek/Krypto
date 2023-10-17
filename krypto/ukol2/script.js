/* z Q se stane  O EN*/
/* z J se stane  O CZ*/
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
    "Ý" : "Y",
    " " : "QXW",
    "Q" : "O"
};

for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    alphabet[i] = letter;
}

alphabet.splice(alphabet.indexOf("Q"), 1);


function filtration(text){
    let filteredText = text.split("");
    for(let i = 0; i < filteredText.length; i++) {
        let character = filteredText[i];
        if (filteredText[i] === "A" || filteredText[i] === "Z" || filteredText[i] === " ") {
            continue
        } else if(alphabet.includes(filteredText[i]) === true){
            continue;
        } else if(czech_alphabet[character]){
            filteredText[i] = czech_alphabet[character];
        } else{
            filteredText[i] = " ";
        }
    }
    filteredText = filteredText.join("").replace(/ /g,'');
    return filteredText;
}


function encryptionKey(text){
    let text_array = text.split("");
    let newArray = []
    const outputSquares = document.getElementsByClassName("output-square");
    for(let i = 0; i < text_array.length; i++){
        if(newArray.includes(text_array[i]) === false){
            newArray.push(text_array[i]);
        }
    }
    for(let i = 0; i < newArray.length; i++){
        outputSquares[i].value = newArray[i];
    }
    let capture = 0;
    for(let i = 0; i < alphabet.length; i++){
        if(newArray.includes(alphabet[i]) === false){
            outputSquares[i - capture + newArray.length].value = alphabet[i];
        } else{
            capture++;
        }
    }
}


function pairLetters(text){
    let text_array = text.split("");
    let newArray = []
    let newArray2 = []
    console.log("asd" + text_array.length);
    for(let i = 0; i < text_array.length; i++){
        newArray.push(text_array[i])
        if(text_array[i] === text_array[i+1] && text_array[i] != "X"){
            newArray.push("X");
        }
        if (text_array[i] === text_array[i+1] && text_array[i] === "X"){
            newArray.push("W"); 
        }
        if((i + 1) % 2 === 1 && text_array[i+1] == null && text_array[i] != "X"){
            newArray.push("X"); 
        }
        if((i + 1) % 2 === 1 && text_array[i+1] == null && text_array[i] === "X"){
            newArray.push("W"); 
        }
        
        console.log(newArray);
    }
    for(let i = 0; i < newArray.length; i++){
        newArray2.push(newArray[i])
        if((i + 1) % 2 === 0 && newArray[i+1] != null){
            newArray2.push(" ");
        }
    }
}

function encrypt(){
    const textToEncrypt = document.getElementById("text-to-encrypt").value.toUpperCase();
    const textAsKey = document.getElementById("encryption-key").value.toUpperCase();
    let filteredKey = filtration(textAsKey)
    encryptionKey(filteredKey);
    let pairedLetters = pairLetters(textToEncrypt)
}


/*
vyplnění tabulky - nechat jak je z textu (done)
ve filtraci Q -> O? - ano
mezery a čísla taky? - ano
dešifrování uppercase čísla a mezery (jak u afinní šifry)? - je to tak
filtrovaný text? - ano
čísla do textového klíče? - na nás (ne)
*/