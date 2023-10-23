/* z Q se stane  O EN*/
/* z Q se stane  K CZ*/
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
    "Q" : "O"
};
const numbers = {
    "0" : "XXXX",
    "1" : "XXXQ",
    "2" : "XXQQ",
    "3" : "XQQQ",
    "4" : "QQQQ",
    "5" : "XQQX",
    "6" : "QQQW",
    "7" : "QQWW",
    "8" : "QWWW",
    "9" : "WWWW",
    " " : "QXW",
}

for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    alphabet[i] = letter;
}
alphabet.splice(alphabet.indexOf("Q"), 1);

const buttons = document.getElementsByClassName("language");
buttons[0].addEventListener("click", () =>{
    czech_alphabet["Q"] = "O";
    delete czech_alphabet["J"];
    buttons[1].style.backgroundColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
    buttons[0].style.backgroundColor = "rgb(" + 176 + ", " + 250 + ", " + 3 + ")";
    buttons[0].style.borderTopLeftRadius = "6px";
    buttons[0].style.borderBottomLeftRadius = "6px";
    buttons[1].style.borderTopRightRadius = "6px";
    buttons[1].style.borderBottomRightRadius = "6px";
})

buttons[1].addEventListener("click", () =>{
    czech_alphabet["J"] = "I";
    delete czech_alphabet["Q"];
    buttons[0].style.backgroundColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
    buttons[1].style.backgroundColor = "rgb(" + 176 + ", " + 250 + ", " + 3 + ")";
    buttons[0].style.borderTopLeftRadius = "6px";
    buttons[0].style.borderBottomLeftRadius = "6px";
    buttons[1].style.borderTopRightRadius = "6px";
    buttons[1].style.borderBottomRightRadius = "6px";
})

function numbersTransform(text){
    let n = text.split("");
    for(let i = 0; i < n.length; i++) {
        let character = n[i];
        if (numbers[character]){
            n[i] = numbers[character];
        }
    }
    n = n.join("");
    return n;
}

function filtrationforKey(text){
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

function filtration(text, cond){
    if (cond === "true"){
        text = numbersTransform(text);
    }
    let filteredText = text.split("");
    for(let i = 0; i < filteredText.length; i++) {
        let character = filteredText[i];
        let pass = false;
        for (let i = 0; i < 26; i++) {
            let letter = String.fromCharCode(65 + i);
            if (letter === character) {
                pass = true;
                break
            }
        }
        if (czech_alphabet[character]) {
            filteredText[i] = czech_alphabet[character];
        } else if(pass == true){
            continue;
        } else if (character === "ß"){
            filteredText[i] = " ";
        } else{
            filteredText[i] = " ";
        }
    }
    filteredText = filteredText.join("").replace(/ /g,'');
    console.log(filteredText);
    return filteredText;
}

function listToMatrix(list, elementsPerSubArray) {
    let matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i].value);
    }

    return matrix;
}

function Table(text){
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
    let matrix = listToMatrix(outputSquares, 5)

    return matrix;
}


function pairLetters(text, cond){
    let text_array = text.split("");
    let newArray = []
    let newArray2 = []
    if(cond === "true"){
        let counter = 0;
        for(let i = 0; i < text_array.length; i++){
            newArray.push(text_array[i])
            if(text_array[i] === text_array[i+1] && text_array[i] != "X"){
                newArray.push("X");
                counter += 1;
            }
            if (text_array[i] === text_array[i+1] && text_array[i] === "X"){
                newArray.push("W");
                counter += 1;
            }
            if((i + 1 + counter) % 2 === 1 && text_array[i+1] == null && text_array[i] != "X"){
                newArray.push("X"); 
            }
            if((i + 1 + counter) % 2 === 1 && text_array[i+1] == null && text_array[i] === "X"){
                newArray.push("W"); 
            }
        }
    }
    else{
        for(let i = 0; i < text_array.length; i++){
            newArray.push(text_array[i]);
        }
    }
    for(let i = 0; i < newArray.length; i++){
        newArray2.push(newArray[i])
        if((i + 1) % 2 === 0 && newArray[i+1] != null){
            newArray2.push(" ");
        }
    }
    return newArray2;
}

function findIndexInMatrix(letter, matrix){
    let position = [];
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
            if(letter === matrix[i][j]){
                position = [i, j];
            }
        }
    }
    return position;
}

function changeLetters(arr, matrix, operator){
    newArray = []
    newArray2 = []
    for(let i = 0; i < arr.length; i += 3){
        let letter1 = findIndexInMatrix(arr[i], matrix)
        let letter2 = findIndexInMatrix(arr[i+1], matrix)
        if(letter1[0] === letter2[0]){
            if (operator === "+"){
                newArray.push(matrix[letter1[0]][(letter1[1] + 1) % 5])
                newArray.push(matrix[letter2[0]][(letter2[1] + 1) % 5])
            } else{
                newArray.push(matrix[letter1[0]][(letter1[1] + 5 - 1) % 5]);
                newArray.push(matrix[letter2[0]][(letter2[1] + 5 - 1) % 5]);
            }
        } else if(letter1[1] === letter2[1]){
            if (operator === "+"){
                newArray.push(matrix[(letter1[0] + 1) % 5][letter1[1]]);
                newArray.push(matrix[(letter2[0] + 1) % 5][letter2[1]]);
            } else{
                newArray.push(matrix[(letter1[0] + 5 - 1) % 5][letter1[1]]);
                newArray.push(matrix[(letter2[0] + 5 - 1) % 5][letter2[1]]);
            }
        } else{
                newArray.push(matrix[letter1[0]][letter2[1]])
                newArray.push(matrix[letter2[0]][letter1[1]])
        }
    }
    for (let i = 0; i < newArray.length; i++) {
        newArray2.push(newArray[i]);
        if((i + 1) % 5 === 0){
            newArray2.push(" ");
        }
    }
    return newArray2;
}

function encrypt(){
    const textToEncrypt = document.getElementById("text-to-encrypt").value.toUpperCase();
    const textAsKey = document.getElementById("encryption-key").value.toUpperCase();
    const filteredText = document.getElementsByClassName("filtered-text");
    const printEncryptedText = document.getElementById("encrypted-text");
    let filteredKey = filtrationforKey(textAsKey);
    let filteredEnText = filtration(textToEncrypt, "true");
    let matrix = Table(filteredKey);
    let pairedLetters = pairLetters(filteredEnText, "true");
    filteredText[0].value = pairedLetters.join("");
    let encryptedText = changeLetters(pairedLetters, matrix, "+");
    printEncryptedText.value = encryptedText.join("");
}

function decrypt(){
    const textToDecrypt = document.getElementById("text-to-decrypt").value.toUpperCase();
    const textAsKey = document.getElementById("decryption-key").value.toUpperCase();
    const filteredText = document.getElementsByClassName("filtered-text");
    const printDecryptedText = document.getElementById("decrypted-text");
    let filteredKey = filtrationforKey(textAsKey);
    let filteredDeText = filtration(textToDecrypt, "false");
    let matrix = Table(filteredKey);
    let pairedLetters = pairLetters(filteredDeText, "false");
    filteredText[1].value = pairedLetters.join("");
    let decryptedText = changeLetters(pairedLetters, matrix, "-");
    printDecryptedText.value = decryptedText.join("");
}


/*
vyplnění tabulky - nechat jak je z textu (done)
ve filtraci Q -> O? - ano (upravit)
mezery a čísla taky? - ano (dodělat)
dešifrování uppercase čísla a mezery (jak u afinní šifry)? - je to tak (dodělat)
filtrovaný text? - ano (napůl)
čísla do textového klíče? - na nás -> ne
*/