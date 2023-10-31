/*
přepíání tabulky nebo 2 vedle sebe? ne
co zaměňovat? podle verze EN/CZ? (J -> I nebo W -> V.) ano
tabulka se chová jak u playfairu? ano
vytvořit další tabulku pod kde bude klíč se zašifrovnými dvojicemi? ano
dát klíč a ruční matici i pro dešifrování? nechat
vlastní matice bude slovo a pak random? ano
výpis aktuální šifrovací tabulky - co znamená (jak playfair)? druhá tabulka
heslo v ručně zadané matici minimální počat znaků? -
5x5 MUSÍ být bez čísel? ano
zobrazit text po filtraci? ano
tip na/jak udělat mezeru? afinní/playfair


pole pro zadání textu pro dešifrování
výpis zašifrovaného textu (mezeru dlesloupců),
výpis aktuální šifrovací tabulky,
tlačítko pro volbu šifrování dešifrování v rámci stejného GUI,
přepínač pro volbu verze ADFGX (CZ/EN verze u 5x5) a ADFGVX šifry,

*/

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
    "J" : "I"
};


for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    alphabet[i] = letter;
}
alphabet.splice(alphabet.indexOf("J"), 1);

const matrixCheckbox = document.getElementsByClassName("matrix-checkbox");
const matrixCheckboxChoice = document.getElementById("matrix-key");

matrixCheckbox[0].addEventListener("click", () =>{
    matrixCheckbox[1].checked = false;
    matrixCheckbox[0].checked = true;
    matrixCheckboxChoice.disabled = true;
})
matrixCheckbox[1].addEventListener("click", () =>{
    matrixCheckbox[0].checked = false;
    matrixCheckbox[1].checked = true;
    matrixCheckboxChoice.disabled = false;
})

function getMatrixChoice(){
    let getNumber;
    for (let i = 0; i < matrixCheckbox.length; i++){
        if (matrixCheckbox[i].checked === true){
            getNumber = i;    
        }
    }
    return getNumber;
}

function shuffleAlphabet(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

function fillMatrix(){
    const outputSquares = document.getElementsByClassName("output-square");
    let shuffledAlphabet = shuffleAlphabet(alphabet);
    for(let i = 0; i < alphabet.length; i++){
        outputSquares[i].value = shuffledAlphabet[i];
    }
    let matrix = listToMatrix(outputSquares, 5)

    return matrix;
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

function encrypt(){
    const textToEncrypt = document.getElementById("text-to-encrypt").value.toUpperCase();
    const textAsKey = document.getElementById("encryption-key").value.toUpperCase();
    const printEncryptedText = document.getElementById("encrypted-text");
    const matrixChoice = getMatrixChoice();
    if(matrixChoice === 1){
        console.log("hi");
    }
    let matrix = fillMatrix();
}