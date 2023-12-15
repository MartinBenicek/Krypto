function power(x, y, p)
{

	let res = 1n;
	
	x = x % p;
	while (y > 0n)
	{
		if (y & 1n)
			res = (res*x) % p;

		y = y/2n;
		x = (x*x) % p;
	}
	return res;
}

function miillerTest(d, n)
{
  const r = BigInt(Math.floor(Math.random() * 100_000))
  const y = r*(n-2n)/100_000n
	let a = 2n + y % (n - 4n);

	let x = power(a, d, n);

	if (x == 1n || x == n-1n)
		return true;
	while (d != n-1n)
	{
		x = (x * x) % n;
		d *= 2n;

		if (x == 1n)	
			return false;
		if (x == n-1n)
			return true;
	}

	return false;
}

function isPrime( n, k=40)
{
	if (n <= 1n || n == 4n) return false;
	if (n <= 3n) return true;
	let d = BigInt(n) - 1n;
	while (d % 2n == 0n)
		d /= 2n;
	for (let i = 0; i < k; i++)
		if (!miillerTest(BigInt(d), BigInt(n)))
			return false;

	return true;
}

function gcd(a, b){
  while (BigInt(b) !== 0n) {
      const temp = BigInt(b);
      b = BigInt(a) % BigInt(b);
      a = BigInt(temp);
  }
  return a;
}

function extendedGCD(a, b) {
  if (b === BigInt(0)) {
    return { gcd: a, x: BigInt(1), y: BigInt(0) };
  } else {
    const { gcd, x, y } = extendedGCD(b, a % b);
    return { gcd, x: y, y: x - (a / b) * y };
  }
}

function modInverse(a, m) {
  const { gcd, x, y } = extendedGCD(a, m);

  if (gcd !== BigInt(1)) {
    throw new Error('Inverse does not exist');
  }

  return (x % m + m) % m;
}

function generateKeys(){
  const nKey = document.getElementById("n-key");
  const eKey = document.getElementById("e-key");
  const dKey = document.getElementById("d-key");
  let pKey, qKey, fiN;
  const lowNumber = (10**9);
  const highNumber = (10**10) - 1;
  let e = 2n;
  for(let i = 0; i < 2; i++){
    let primeNumber = Math.floor(Math.random() * (highNumber - lowNumber + 1)) + lowNumber;
    while (isPrime(primeNumber) !== true){
      primeNumber = Math.floor(Math.random() * (highNumber - lowNumber + 1)) + lowNumber;
    }
    if(i === 0){
      pKey = primeNumber;
    } else{
      qKey = primeNumber;
    }
  }
  let n = BigInt(pKey) * BigInt(qKey);
  nKey.value = n;
  fiN = BigInt(BigInt(pKey) - BigInt(1)) * BigInt(BigInt(qKey) - BigInt(1));
  let range = (fiN-1n) - BigInt(2);
  while (true) {
    e = BigInt(Math.floor(Math.random() * Number(range)) + 2);
    while (isPrime(e) !== true){
        e = BigInt(Math.floor(Math.random() * Number(range)) + 2);
    }
    let number = bigInt.gcd(e, fiN);
    if (bigInt(number) == 1n) {
        break;
    }
  }
  eKey.value = e;
  let d = modInverse(e, fiN);
  d = BigInt(d);
  dKey.value = d;
  const privateKeyContent = `RSA SOUKROMÝ_KLÍČ_V_BASE64\nn: ${n}\nd: ${d}`;
  const publicKeyContent = `RSA VEŘEJNÝ_KLÍČ_V_BASE64\nn: ${n}\ne: ${e}`;
  const privateKeyBlob = new Blob([privateKeyContent], { type: "text/plain;charset=utf-8" });
  saveAs(privateKeyBlob, "Soukromý.pri.txt");
  const publicKeyBlob = new Blob([publicKeyContent], { type: "text/plain;charset=utf-8" });
  saveAs(publicKeyBlob, "Veřejný.pub.txt");
}

function toBinary(array){
  let newArray = [];
  for (let i = 0; i < array.length; i++){
    array[i] = array[i].toString(2);
    array[i] = padTo8Bits(array[i]);
  }
  for (let i = 0; i < array.length; i += 6) {
    const group = array.slice(i, i + 6);
    newArray.push(group.join(''));
  }
  for (let i = 0; i < newArray.length; i ++){
    newArray[i] = BigInt(newArray[i]);
    newArray[i] = BigInt(parseInt(newArray[i], 2));
  }
  return newArray;
}

function padTo8Bits(binaryString) {
  while (binaryString.length < 8) {
    return binaryString.padStart(8, '0');
  }
  return binaryString;
}

function asciiDecimal(text){
  let newArray = [];
  for (let i = 0; i < text.length; i++){
    newArray.push(text.charCodeAt(i));
  }
  let bigArray = toBinary(newArray);
  return bigArray;
}
function modPow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;

    let result = 1n;
    base = base % modulus;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }

        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }

    return result;
}

function encrypt(text){
  const nKey = document.getElementById("n-key").value;
  const dKey = document.getElementById("d-key").value;
  let mKey = asciiDecimal(text);
  let encryptedText, encryptedArray = [];
  let nKeyValue = BigInt(nKey);
  let dKeyValue = BigInt(dKey);
  for(let i = 0; i < mKey.length; i ++){
    encryptedText = modPow(mKey[i], dKeyValue, nKeyValue)
    encryptedArray.push(encryptedText);
  }
  let encryptedTextToReturn = encryptedArray.join(" ");
  return encryptedTextToReturn;
}

function getArray(text){
  text = text.split(" ");
  for(let i = 0; i < text.length; i++){
    text[i] = BigInt(text[i]);
  }
  return text;
}

function toDecimal(array){
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].toString(2);
    while (array[i].length % 8 !== 0){
      array[i] = "0" + array[i];
    }
}
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j += 8 ){
      newArray.push(array[i].slice(j, j + 8));
    }
  }
  return newArray;
}

function backToText(array){
  for (let i = 0; i < array.length; i++){
    array[i] = parseInt(array[i], 2);
  }
  for (let i = 0; i < array.length; i++){
    array[i] = String.fromCharCode(array[i]);
  }
  array = array.join("");
  return array;
}

function decrypt(text, eKey, nKey){
  let backToNumbers, decryptedArray = [];
  let nKeyValue = BigInt(nKey);
  let eKeyValue = BigInt(eKey);
  let getArrays = getArray(text);
  for(let i = 0; i < getArrays.length; i++){
    backToNumbers = modPow(getArrays[i], eKeyValue, nKeyValue);
    decryptedArray.push(backToNumbers);
  }
  let decodedBinary = toDecimal(decryptedArray);
  let finalDecryption = backToText(decodedBinary);
  let decryptedTextToReturn = finalDecryption;
  return decryptedTextToReturn;
}

const fileInputGlobal = document.getElementById("fileInput");
const chooseSignature = document.getElementById("choose-signature");
let fileGlobal;

fileInputGlobal.addEventListener("change", function() {
    const fileNameDisplay = document.getElementById("file-name-display");
    const fileTypeDisplay = document.getElementById("file-type-display");
    fileGlobal = fileInput.files[0].name;
    let fileName = fileGlobal.split(".").shift();
    let fileType = fileGlobal.split(".").pop();
    fileNameDisplay.textContent = fileName;
    fileTypeDisplay.textContent = fileType;
});

function zipCreate(){
    if(fileGlobal == undefined){
        const fileNameDisplay = document.getElementById("file-name-display");
        fileNameDisplay.textContent = "Nebyl vybrán žádný soubor";
        return;
    }
    const n = document.getElementById("n-key");
    const d = document.getElementById("d-key");
    let e = document.getElementById("e-key");
    let encryptedHash;
    e.type = "number";
    d.type = "number";
    n.type = "number";
    if(n.value == ""){
      n.type = "text";
      n.value = "n není vygenerováno";
      return;
    } else if(e.value == ""){
      e.type = "text";
      e.value = "d není vygenerováno";
      return;
    } else if(d.value == ""){
      d.type = "text";
      d.value = "d není vygenerováno";
      return
    }
    let filesInput = document.getElementById("fileInput");
    let files = filesInput.files;
    let zip = new JSZip();
    let fr = new FileReader();
    fr.onload = function (event) {
      let message = event.target.result;
      let HashedMessage = keccak512(message);
      encryptedHash = "RSA_SHA3-512 PODPIS_V_BASE64 " + encrypt(HashedMessage);
  
      let file = files[0];

      zip.file("PlainText.msg.txt", file);
  
      zip.file("EncryptedText.sign.txt", encryptedHash);
  
      zip.generateAsync({ type: "blob" }).then(function(content) {
          saveAs(content, "files.zip");
      });
  };
  
  fr.readAsBinaryString(files[0]);
}

chooseSignature.addEventListener("change", function(){
  const eInput = document.getElementById("e");
  const nInput = document.getElementById("n");
  const dInput = document.getElementById("d");
  const zEncryptInput = document.getElementById("zip-encrypt");
  const zPlainInput = document.getElementById("zip-plain");
  let newZipArray = [], newTxtArray = [];
  const files = chooseSignature.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].name.endsWith(".zip")) {
      newZipArray.push(files[i]);
    } else if (files[i].name.endsWith(".txt")) {
      newTxtArray.push(files[i]);
    }
  }
  newTxtArray.forEach(file => {
    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        const lines = content.split('\n');

        lines.forEach(line => {
            if (line.startsWith('n:')) {
                nInput.value = line.split(': ')[1].trim();
            } else if (line.startsWith('e:')) {
                eInput.value = line.split(': ')[1].trim();
            } else if (line.startsWith('d:')) {
                dInput.value = line.split(': ')[1].trim();
            }
        });
    };
    reader.readAsText(file);
  });

  newZipArray.forEach(zipFile => {
  const zip = new JSZip();
  zip.loadAsync(zipFile).then(contents => {
    contents.forEach((relativePath, file) => {
      if (file.name.includes('.msg')) {
        file.async('string').then(text => {
          zPlainInput.value = text;
        });
      } else if (file.name.includes('.sign')) {
        file.async('string').then(text => {
          const line = text.trim();
          const regex = /RSA_SHA3-512 PODPIS_V_BASE64\s*(.*)/;
          const matches = line.match(regex);
          if (matches && matches.length > 1) {
            zEncryptInput.value = matches[1];
          }
        });
      }
    });
  });
});
});

function verify(){
  const eInput = document.getElementById("e");
  const nInput = document.getElementById("n");
  const dInput = document.getElementById("d");
  const zEncryptInput = document.getElementById("zip-encrypt");
  const zPlainInput = document.getElementById("zip-plain");
  const approved = document.getElementById("approved");
  const denied = document.getElementById("denied");
  let n = nInput.value;
  let e = eInput.value;
  let d = dInput.value;
  let plainText = zPlainInput.value;
  let numbers = zEncryptInput.value;
  let decryptedHash = decrypt(numbers, e, n);
  let textHash = keccak512(plainText);
  if (decryptedHash == textHash){
    approved.style.display = "block";
    denied.style.display = "none";
  } else{
    approved.style.display = "none";
    denied.style.display = "block";
  }
}
