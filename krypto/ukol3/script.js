let alphabet = [];
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
    "W" : "V",
    " " : "QXQ"
};

function createAlphabet(letter){
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        alphabet[i] = letter;
    }
    alphabet.splice(alphabet.indexOf(letter), 1);
    
}
createAlphabet("W");
let missingchar;
let versionchoice = false;
let matrixGrid = 5;
let cipher = ["A", "D", "F", "G", "X"];

const buttons = document.getElementsByClassName("language");
const version = document.getElementsByClassName("version");
const tableMain = document.getElementById("text-table");
buttons[0].addEventListener("click", () =>{
    if (versionchoice == false){
    createAlphabet("W");
    czech_alphabet["W"] = "V";
    delete czech_alphabet["J"];
    missingchar = "W";
    }
    buttons[1].style.backgroundColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
    buttons[0].style.backgroundColor = "rgb(" + 53 + ", " + 244 + ", " + 53 + ")";
    buttons[0].style.borderTopLeftRadius = "6px";
    buttons[0].style.borderBottomLeftRadius = "6px";
    buttons[1].style.borderTopRightRadius = "6px";
    buttons[1].style.borderBottomRightRadius = "6px";
})

buttons[1].addEventListener("click", () =>{
    if (versionchoice == false){
        createAlphabet("J");
        czech_alphabet["J"] = "I";
        delete czech_alphabet["W"];
        missingchar = "J";
    }
    buttons[0].style.backgroundColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
    buttons[1].style.backgroundColor = "rgb(" + 53 + ", " + 244 + ", " + 53 + ")";
    buttons[0].style.borderTopLeftRadius = "6px";
    buttons[0].style.borderBottomLeftRadius = "6px";
    buttons[1].style.borderTopRightRadius = "6px";
    buttons[1].style.borderBottomRightRadius = "6px";
})

version[0].addEventListener("click", () =>{
    tableMain.innerHTML = `<div class="row">
    <div class="nothing-square"></div>
    <div class="cipher-square">
        <output class="cipher-output-square">A</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">D</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">F</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">G</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">X</output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">A</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">D</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">F</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">G</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">X</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
</div>`;
    version[1].style.backgroundColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
    version[0].style.backgroundColor = "rgb(" + 53 + ", " + 244 + ", " + 53 + ")";
    version[0].style.borderTopLeftRadius = "6px";
    version[0].style.borderBottomLeftRadius = "6px";
    version[1].style.borderTopRightRadius = "6px";
    version[1].style.borderBottomRightRadius = "6px";
    versionchoice = false;
    cipher = ["A", "D", "F", "G", "X"];
    alphabet = [];
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        alphabet[i] = letter;
    }
    matrixGrid = 5;
})

version[1].addEventListener("click", () =>{
    tableMain.innerHTML = `<div class="row">
    <div class="nothing-square"></div>
    <div class="cipher-square">
        <output class="cipher-output-square">A</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">D</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">F</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">G</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">V</output>
    </div>
    <div class="cipher-square">
        <output class="cipher-output-square">X</output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">A</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">D</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">F</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">G</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">V</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
<div class="row">
    <div class="cipher-square">
        <output class="cipher-output-square">X</output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
    <div class="square">
        <output class="output-square"></output>
    </div>
</div>
</div>`;
    delete czech_alphabet["J"];
    delete czech_alphabet["W"];
    if(versionchoice == false){
        alphabet = [];
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i);
            alphabet[i] = letter;
        }
        for (let index = 0; index < 10; index++) {
            alphabet.push(index.toString());
        }
        versionchoice = true;
    }
    matrixGrid = 6;
    cipher = ["A", "D", "F", "G", "V", "X"];
    version[0].style.backgroundColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
    version[1].style.backgroundColor = "rgb(" + 53 + ", " + 244 + ", " + 53 + ")";
    version[0].style.borderTopLeftRadius = "6px";
    version[0].style.borderBottomLeftRadius = "6px";
    version[1].style.borderTopRightRadius = "6px";
    version[1].style.borderBottomRightRadius = "6px";
})

function filtration(text){
    let filteredText = text.split("");
    for(let i = 0; i < filteredText.length; i++) {
        let character = filteredText[i];
        if (filteredText[i] === "A" || filteredText[i] === "Z") {
            continue
        } else if(alphabet.includes(filteredText[i])){
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
let mainMatrix;

function shuffleAlphabet(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

function fillMatrix(text, letter){
    let deleteLetter = text.split("");
    console.log(deleteLetter);
    const outputSquares = document.getElementsByClassName("output-square");
    let counter = 0;
    for (let i = 0; i < deleteLetter.length; i++){
        outputSquares[i].value = deleteLetter[i];
        alphabet.splice(alphabet.indexOf(deleteLetter[i]), 1);
        counter += 1;
        console.log(alphabet);
    }
    if(versionchoice == false){
        createAlphabet(letter);
    } else{
        alphabet = [];
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i);
            alphabet[i] = letter;
        }
        for (let index = 0; index < 10; index++) {
            alphabet.push(index.toString());
        }
    }
    let shuffledAlphabet = shuffleAlphabet(alphabet);
    for(let i = 0; i < alphabet.length; i++){
        outputSquares[i + counter].value = shuffledAlphabet[i];
    }
    let matrix = listToMatrix(outputSquares, matrixGrid);
    return matrix;
}

function findIndexInMatrix(letter, matrix){
    let position = [];
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
            if(letter == matrix[i][j]){
                position = [i, j];
            }
        }
    }
    return position;
}

function listToMatrix(list, elementsPerSubArray, value = true) {
    let matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(value ? list[i].value : list[i]);
    }
    
    return matrix;
}

function pairLetters(text, matrix){
    let text_array = text.split("");
    let newArray = [];
    for(let i = 0; i < text_array.length; i++){
        let locationOfLetter = findIndexInMatrix(text_array[i], matrix);
        newArray[i] = cipher[locationOfLetter[0]] + cipher[locationOfLetter[1]];
    }
    newArray = newArray.join("");
    return newArray;
}

function fillTableKey(text, key){
    let text_array = text.split("");
    let key_array = key.split("");
    let keyTable = document.getElementById("key-table");
    keyTable.innerHTML = "";
    let numberOfRows = Math.ceil(text_array.length / key.length);
    let row = document.createElement("div");
    row.classList.add("row");
    keyTable.appendChild(row);
    let mergeArrays = key_array.concat(text_array);
    let keyMatrix = listToMatrix(mergeArrays, key.length, false);
    for(let i = 0; i < key.length; i++){
        let outputKeySquare = document.createElement("output");
        outputKeySquare.classList.add("key-output-square");
        let keySquare = document.createElement("div");
        keySquare.classList.add("key-square");
        keySquare.appendChild(outputKeySquare);
        row.appendChild(keySquare);
        outputKeySquare.value = key_array[i];
    }
    for(let i = 0; i < numberOfRows; i++){
        let tmprow = document.createElement("div");
        tmprow.classList.add("row");
        keyTable.appendChild(tmprow);
        for(let j = 0; j < key.length; j++){
            let outputKeySquare = document.createElement("output");
            outputKeySquare.classList.add("output-square2");
            let keySquare = document.createElement("div");
            keySquare.classList.add("square");
            keySquare.appendChild(outputKeySquare);
            tmprow.appendChild(keySquare);
            if (keyMatrix[i+1][j] !== undefined) {
                outputKeySquare.value = keyMatrix[i+1][j];
            }
        }
    }
    return keyMatrix;
}

function transpose(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    let grid = [];
    for (let j = 0; j < cols; j++) {
      grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[j][i] = matrix[i][j];
      }
    }
    return grid;
  }

function sortMatrix(matrix){
    let tMatrix = transpose(matrix);
    let newArray = []
    const numRows = tMatrix.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < numRows - 1; i++) {
        if (tMatrix[i][0] > tMatrix[i + 1][0]) {
          const temp = tMatrix[i];
          tMatrix[i] = tMatrix[i + 1];
          tMatrix[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    tMatrix = transpose(tMatrix);
    tMatrix.shift();
    tMatrix = transpose(tMatrix);
    for (let i = 0; i < tMatrix.length; i++) {
        for (let j = 0; j < tMatrix[0].length; j++) {
          if (tMatrix[i][j] == undefined) {
            newArray.push(" ");
          } else{
            newArray.push(tMatrix[i][j]);
          }
        }
    }
    newArray = newArray.join("");
    return newArray;
}

function encrypt(){
    const textToEncrypt = document.getElementById("text-to-encrypt").value.toUpperCase();
    const textAsKey = document.getElementById("encryption-key").value.toUpperCase();
    const decKey = document.getElementById("decryption-key");
    const printEncryptedText = document.getElementById("encrypted-text");
    const textToDecrypt = document.getElementById("text-to-decrypt");
    const printfilteredText = document.getElementById("filtered-text");
    let key = "";
    let matrix = fillMatrix(key, missingchar);
    let filteredText = filtration(textToEncrypt);
    printfilteredText.value = filteredText;
    let getPairedLetters = pairLetters(filteredText, matrix);
    let keyMatrix = fillTableKey(getPairedLetters, textAsKey);
    mainMatrix = keyMatrix;
    let finalEncryption = sortMatrix(keyMatrix);
    printEncryptedText.value = finalEncryption;
    textToDecrypt.value = finalEncryption;
    decKey.value = textAsKey;
}

function getLetters(text, key){
    let newArray = [];
    let text_array = text.split("");
    let key_array = key.split("");
    let lmatrix = listToMatrix(text_array, key_array.length + 1, false);
    for (let i = 0; i < lmatrix.length; i++) {
        lmatrix[i].unshift(key_array[i]);
    }
    lmatrix = mainMatrix;
    for (let i = 1; i < lmatrix.length; i++) {
        for (let j = 0; j < lmatrix[0].length; j++) {
            newArray.push(lmatrix[i][j]);
        }
    }
    newArray = newArray.filter(Boolean);
    return newArray;
}

function decText(text){
    let newArray = [];
    let newArray2 = [];
    const outputSquares = document.getElementsByClassName("output-square");
    let matrix = listToMatrix(outputSquares, matrixGrid);
    for (let i = 0; i < text.length; i++){
        for (let j = 0; j < text.length; j++){
            if (text[i] === cipher[j]){
                newArray.push(j);
            }
        }
    }
    let coordinates = listToMatrix(newArray, 2, false);
    for(let i = 0; i < coordinates.length; i++){
        newArray2.push(matrix[coordinates[i][0]][coordinates[i][1]]);
    }
    for(let i = 0; i < newArray2.length; i++){
        if(newArray2[i] === "Q" && newArray2[i+1] === "X" && newArray2[i+2] === "Q"){
            newArray2.splice(i, 3, " ");
        }
    }
    newArray2 = newArray2.join("");
    return newArray2;
}

function decrypt(){
    const textToDecrypt = document.getElementById("text-to-decrypt").value.toUpperCase();
    const textAsKey = document.getElementById("decryption-key").value.toUpperCase();
    const printDecryptedText = document.getElementById("decrypted-text");
    let key = "";
    let decLetters = getLetters(textToDecrypt, textAsKey);
    let finalDecryption = decText(decLetters);
    printDecryptedText.value = finalDecryption;
}