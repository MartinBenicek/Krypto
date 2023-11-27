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

function modInverse(a, m) {
  let m0 = m;
  let x0 = 0n;
  let x1 = 1n;

  if (m === 1n) return 0n;

  while (a > 1n) {
      let q = a / m;
      let t = m;

      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
  }

  if (x1 < 0n) x1 += m0;

  return x1;
}

function generateKeys(){
  const pKey = document.getElementById("p-key");
  const qKey = document.getElementById("q-key");
  const nKey = document.getElementById("n-key");
  const finKey = document.getElementById("fin-key");
  const eKey = document.getElementById("e-key");
  const dKey = document.getElementById("d-key");
  const lowNumber = 10**9 - 1;
  const highNumber = 10**10 - 1;
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
  let range = fiN - BigInt(2);
  while (!(BigInt(1) < e < fiN && gcd(fiN, BigInt(e)) === 1n)){
    e = BigInt(Math.floor(Math.random() * Number(range)) + 2);
    while (isPrime(e) !== true){
      e = BigInt(Math.floor(Math.random() * Number(range)) + 2);
    }
  }
  eKey.value = e;
  let d = modInverse(e, fiN);
  dKey.value = d;
}

function toBinary(array){
  const integerOutput = document.getElementsByClassName("integer-output");
  let newArray = [];
  for (let i = 0; i < array.length; i++){
    array[i] = array[i].toString(2);
    array[i] = padTo8Bits(array[i]);
  }
  for (let i = 0; i < array.length; i += 8) {
    const group = array.slice(i, i + 8);
    newArray.push(group.join(''));
  }
  for (let i = 0; i < newArray.length; i ++){
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

function addmod(x, y, n)
{
    // Precondition: x<n, y<n
    // If it will overflow, use alternative calculation
    if (x + y <= x) x = x - (n - y) % n;
    else x = (x + y) % n;
    return x;
}

function sqrmod(a, n)
{
    var b;
    var sum = 0n;

    // Make sure original number is less than n
    a = a % n;

    // Use double and add algorithm to calculate a*a mod n
    for (b = a; b != 0n; b >>= 1n) {
        if (b & 1n) {
            sum = addmod(sum, a, n);
        }
        a = addmod(a, a, n);
    }
    return sum;
}

function powFun(base, ex, mo) {
    var r;
    if(ex === 0n) 
        return 1n;
    else if(ex % 2n === 0n) {
        r = powFun(base, ex/2n, mo) % mo ;
        // return (r * r) % mo;
        return sqrmod(r, mo);
    }else 
        return (base * powFun(base, ex - 1n, mo)) % mo;
}

function encrypt(){
  const textToEncrypt = document.getElementById("text-to-encrypt").value;
  const printEncryptedText = document.getElementById("encrypted-text");
  const textToDecrypt = document.getElementById("text-to-decrypt");
  const nKey = document.getElementById("n-key");
  const eKey = document.getElementById("e-key");
  let mKey = asciiDecimal(textToEncrypt);
  let encryptedText, encryptedArray = [];
  /*
  if (nKey.value === ""){
    console.log("a");
  }
  */
  let nKeyValue = BigInt(parseInt(nKey.value, 10));
  let eKeyValue = BigInt(parseInt(eKey.value, 10));
  for(let i = 0; i < mKey.length; i ++){
    encryptedText = powFun(mKey[i], eKeyValue, nKeyValue);
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

function decrypt(){
  const textToDecrypt = document.getElementById("text-to-decrypt").value;
  const printDecryptedText = document.getElementById("decrypted-text");
  const integerOutput = document.getElementsByClassName("integer-output");
  const nKey = document.getElementById("n-key");
  const eKey = document.getElementById("e-key");
  const dKey = document.getElementById("d-key");
  let backToNumbers, decryptedArray = [];
  let nKeyValue = BigInt(parseInt(nKey.value, 10));
  let eKeyValue = BigInt(parseInt(eKey.value, 10));
  let dKeyValue = BigInt(parseInt(dKey.value, 10));
  let getArrays = getArray(textToDecrypt);
  console.log(getArrays);
  for(let i = 0; i < getArrays.length; i++){
    backToNumbers = powFun(getArrays[i], dKeyValue, nKeyValue);
    console.log(backToNumbers);
    decryptedArray.push(backToNumbers);
  }
  integerOutput[1].value = decryptedArray;
}