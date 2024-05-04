import { ethers, randomBytes } from "ethers";
const mnemonic = ethers.Mnemonic.entropyToPhrase(randomBytes(32));
// console.log(mnemonic);

// 创建钱包
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, "", `m/44'/784'/0'/0`);
console.log(hdNode);

// 根据index派生钱包
let wallets: ethers.Wallet[] = [];
for (let i = 100; i < 200; i++) {
  let hdNodeNew = hdNode.derivePath(i.toString());
  let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
  console.log(`第${i + 1}个钱包地址： ${walletNew.address}`);
  wallets.push(walletNew);
}

// const pwd = "123456";
// const saveWallet = async (hdNode: ethers.HDNodeWallet) => {
//   const json = await hdNode.encrypt(pwd);
//   console.log("钱包的加密json：");
//   console.log(json);
//   return json;
// };

// const loadWallet = async (json: string, pwd: string) => {
//   const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
//   console.log("\n4. 从加密json读取钱包：");
//   console.log(wallet2);
// };

// const test = async () => {
//   const json = await saveWallet(hdNode);
//   await loadWallet(json, pwd);
// };

// test();
