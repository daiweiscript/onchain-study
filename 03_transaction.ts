import { ethers } from "ethers";
import { throttle } from "lodash";
const provider = new ethers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/cc17aa2bc5354dca9a2cf84b5cfab7e9"
);

let network = provider.getNetwork();
network.then((res) =>
  console.log(
    `[${new Date().toLocaleTimeString()}] 连接到 chain ID ${res.chainId}`
  )
);
const iface = new ethers.Interface([
  "function transfer(address, uint) public returns (bool)",
]);
let j = 0;
provider.on(
  "pending",
  throttle(async (txHash: string) => {
    // if (txHash && j <= 100) {
    //   // 获取tx详情

    //   // console.log(
    //   //   `\n[${new Date().toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`
    //   // );
    //   setTimeout(async () => {
    //     console.log(txHash);
    //     console.log(await provider.getTransaction(txHash));
    //   }, 5000);
    //   j++;
    // }
    console.log(txHash);
    if (txHash) {
      // 获取tx详情
      setTimeout(async () => {
        let tx = await provider.getTransaction(txHash);
        console.log(tx);
        if (tx) {
          // filter pendingTx.data
          if (
            tx.data.indexOf(iface.getFunction("transfer")?.selector || "") !==
            -1
          ) {
            // 打印txHash
            console.log(
              `\n[${new Date().toLocaleTimeString()}] 监听Pending交易: ${txHash} \r`
            );

            // 打印解码的交易详情
            let parsedTx = iface.parseTransaction(tx);
            console.log("pending交易详情解码：");
            console.log(parsedTx);
            // Input data解码
            console.log("Input Data解码：");
            console.log(parsedTx?.args);
          }
        }
      }, 5000);
    }
  }, 1000)
);
