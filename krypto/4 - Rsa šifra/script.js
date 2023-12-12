/*
od 10^9 - 1 po 10^10 - 1
po 8 znacích bloky
mezera ascii 32
*/
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
  const pKey = document.getElementById("p-key");
  const qKey = document.getElementById("q-key");
  const nKey = document.getElementById("n-key");
  const finKey = document.getElementById("fin-key");
  const eKey = document.getElementById("e-key");
  const dKey = document.getElementById("d-key");
  const lowNumber = (10**9);
  const highNumber = (10**10) - 1;
  let e = 2n;
  for(let i = 0; i < 2; i++){
    let primeNumber = Math.floor(Math.random() * (highNumber - lowNumber + 1)) + lowNumber;
    while (isPrime(primeNumber) !== true){
      primeNumber = Math.floor(Math.random() * (highNumber - lowNumber + 1)) + lowNumber;
    }
    if(i === 0){
      pKey.value = primeNumber;
    } else{
      qKey.value = primeNumber;
    }
  }
  let n = BigInt(pKey.value) * BigInt(qKey.value);
  nKey.value = n;
  let fiN = BigInt(BigInt(pKey.value) - BigInt(1)) * BigInt(BigInt(qKey.value) - BigInt(1));
  finKey.value = fiN;
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
}

function toBinary(array){
  const integerOutput = document.getElementsByClassName("integer-output");
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
  integerOutput[0].value = newArray.join(" ");
  
  return newArray;
}

function padTo8Bits(binaryString) {
  if (binaryString.length < 8) {
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

function encrypt(){
  const textToEncrypt = document.getElementById("text-to-encrypt").value;
  const printEncryptedText = document.getElementById("encrypted-text");
  const textToDecrypt = document.getElementById("text-to-decrypt");
  const nKey = document.getElementById("n-key").value;
  const eKey = document.getElementById("e-key").value;
  let mKey = asciiDecimal(textToEncrypt);
  let encryptedText, encryptedArray = [];
  let nKeyValue = BigInt(nKey);
  let eKeyValue = BigInt(eKey);
  for(let i = 0; i < mKey.length; i ++){
    encryptedText = modPow(mKey[i], eKeyValue, nKeyValue)
    encryptedArray.push(encryptedText);
  }
  printEncryptedText.value = encryptedArray.join(" ");
  textToDecrypt.value = encryptedArray.join(" ");
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
      array[i] = "0" + array[i];
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

function decrypt(){
  const textToDecrypt = document.getElementById("text-to-decrypt").value;
  const printDecryptedText = document.getElementById("decrypted-text");
  const integerOutput = document.getElementsByClassName("integer-output");
  const nKey = document.getElementById("n-key").value;
  const dKey = document.getElementById("d-key").value;
  let backToNumbers, decryptedArray = [];
  let nKeyValue = BigInt(nKey);
  let dKeyValue = BigInt(dKey);
  let getArrays = getArray(textToDecrypt);
  for(let i = 0; i < getArrays.length; i++){
    backToNumbers = modPow(getArrays[i], dKeyValue, nKeyValue);
    decryptedArray.push(backToNumbers);
  }
  integerOutput[1].value = decryptedArray.join(" ");
  let decodedBinary = toDecimal(decryptedArray);
  let finalDecryption = backToText(decodedBinary);
  printDecryptedText.value = finalDecryption;
}