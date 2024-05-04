const { randomBytes } = require("crypto");
const secp256k1 = require("secp256k1");
const { keccak256, toUtf8String } = require("ethers");

const getPriArr = (privateKey) => {
  const byteLength = privateKey.length / 2;
  const uint8Array = new Uint8Array(byteLength);
  for (let i = 0; i < byteLength; i++) {
    const byteString = privateKey.substr(i * 2, 2);
    const byteValue = parseInt(byteString, 16);
    uint8Array[i] = byteValue;
  }
  return uint8Array;
};

function arrayToString(privateArr) {
  return Array.from(privateArr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
const priArr = getPriArr(
  "f8f8a2f43c8376ccb0871305060d7b27b0554d2cc72bccf41b2705608452f315"
);
// console.log(priArr);
const pubArr = secp256k1.publicKeyCreate(priArr, false).slice(1);
const pubKey = arrayToString(pubArr);
console.log("pubKey", pubKey);

console.log("address:", keccak256("0x" + pubKey));
