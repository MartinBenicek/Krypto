/*
přepíání tabulky nebo 2 vedle sebe?
co zaměňovat? podle verze EN/CZ? (J -> I nebo W -> V.)
tabulka se chová jak u playfairu?
vytvořit další tabulku pod kde bude klíč se zašifrovnými dvojicemi?
ddát klíč a ruční matici i pro dešifrování?
vlastní matice bude slovo a pak random?
výpis aktuální šifrovací tabulky - co znamená?


pole pro zadání textu pro dešifrování
pro zadání šifrovací matice ručně (spolu s vyřazováním neboznázorněních zbývajících znaků pro vyplnění),
přepínač pro volbu zadání matice a náhodného generování.
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

function matrixCheckboxclick(){
    let matrixCheckbox = document.getElementsByClassName("matrix-checkbox");
    if(matrixCheckbox[0].checked === true){
        matrixCheckbox[1].checked = false;
    } else{
        matrixCheckbox[1].checked = true;
    }
}