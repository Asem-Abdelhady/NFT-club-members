"use client";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import getCotnract from "../../../utils/getCotnract";

export default function Admin() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  async function handleCreateCollection() {
    if (contract) {
      console.log("Interface: ", contract.interface);
      const tx = await contract.createCollection(
        "Monkeys",
        "MNK",
        ethers.parseEther("0.0001").toString(),
        "https://static.ffx.io/images/$zoom_0.599%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_83/t_crop_custom/q_86%2Ce_sharpen:60%2Cf_auto/12d03704a9c36452cc671cf42f6af1db14f1c2a8"
      );

      const receipt = await tx.wait();
      console.log(receipt);
    } else {
      console.log("Contract is null");
    }
  }

  useEffect(() => {
    const fetchContract = async () => {
      const newContract = await getCotnract();
      setContract(newContract);
    };

    fetchContract();
  }, []);
  return (
    <div>
      <Button onClick={handleCreateCollection}>CreateCollection</Button>
    </div>
  );
}
