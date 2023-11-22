import { readFileSync, writeFileSync, existsSync } from "fs";

interface ChainData {
  [chainId: string]: string;
}

function updateChainAndAbiData(
  filePath: string,
  chainId: number,
  address: string,
  abiFilePath: string,
  contractAbi: any
): void {
  if (!existsSync(abiFilePath)) {
    console.error(`ABI file not found: ${abiFilePath}`);
    return;
  }

  try {
    writeFileSync(abiFilePath, JSON.stringify(contractAbi, null, 2), "utf8");
    console.log("ABI updated successfully");
  } catch (error) {
    console.error("Error writing ABI file:", error);
    return;
  }

  if (!existsSync(filePath)) {
    console.error(`Chain data file not found: ${filePath}`);
    return;
  }

  const data = readFileSync(filePath, "utf8");
  let chainData: ChainData = {};

  if (data) {
    try {
      chainData = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing chain data JSON:", error);
      return;
    }
  }

  chainData[chainId] = address;

  try {
    writeFileSync(filePath, JSON.stringify(chainData, null, 2), "utf8");
    console.log("Chain data updated successfully");
  } catch (error) {
    console.error("Error writing chain data file:", error);
  }
}

export default updateChainAndAbiData;
