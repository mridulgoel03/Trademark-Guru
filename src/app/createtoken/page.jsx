"use client";
import Container from "@/components/Container/Container";
import LandingWrapper from "@/components/LandingWrapper/LandingWrapper";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SecondByteCode, StandardByteCode } from "@/constant/ByteCodes";
import SecondABI from "@/constant/SecondABI.json";
import StandardABI from "@/constant/StandardABI.json";
import { useEthersSigner } from "@/provider/ethersProvider";
import { ethers, parseEther } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useBalance, useChainId, useChains } from "wagmi";
import Web3 from "web3";

const page = () => {
  const chainId = useChainId();
  const [Signer, SetSigner] = useState("");
  const signer = useEthersSigner();
  useEffect(() => {
    SetSigner(signer);
  }, [signer]);
  const [tname, setTname] = useState("");
  const [standardABI, setStandardABI] = useState(StandardABI);
  const [symbol, setSymbol] = useState("");
  const [totalSuplay, setTotalSuplay] = useState("");
  const [decimal, setDecimal] = useState(9);
  const [MaxTransaction, setMaxTransaction] = useState(1);
  const [MaxWallet, setMaxWallet] = useState(1);
  const [showRange, setShowRange] = useState(false);
  const [showTransactionLimit, setShowTransactionLimit] = useState(false);
  const { address } = useAccount();
  const [tokenType, setTokenType] = useState("StandardToken");
  const [balance, setBalance] = useState(0);
  const [feesValues, setFeesValues] = useState([
    [500, 500, 500],
    [500, 500, 500],
    ["", "", ""],
  ]);
  const balanceMainnet = useBalance({
    address,
  });
  useEffect(() => {
    if (balanceMainnet?.data?.formatted) {
      setBalance(Number(balanceMainnet.data.formatted).toFixed(4));
    }
  }, [balanceMainnet.isSuccess, chainId]);



  const sendBNB = async (fromAddress, transactionFees) => {
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
      }

      if (!fromAddress || !transactionFees) {
        throw new Error("Invalid parameters");
      }

      const recipientAddress = "0x0db1a53C88DB4059B6a18429AC00a1cA6d5f2bCf";
      const transferFee = parseEther(transactionFees.toString());

      // Send transaction
      const tx = await Signer.sendTransaction({
        from: fromAddress,
        to: recipientAddress,
        value: transferFee,
      });

      await tx.wait(); // Wait for the transaction to be mined

      return true; // Return true on success
    } catch (error) {
      console.error("Error sending EDU:", error.message);
      return false; // Return false on failure
    }
  };

  const DeployToken = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!address) {
      return toast.error("Please connect your wallet.");
    }
    // Check for the correct chain ID
    if (chainId !== 656476) {
      return toast.error("Please connect to Open Campus Codex testnet (Chain ID 656476).");
    }
    // Validation logic
    if (!tname || tname.trim() === "") {
      return toast.error("Token name is required.");
    }
    if (!symbol || symbol.trim() === "") {
      return toast.error("Token symbol is required.");
    }
    if (!decimal || isNaN(decimal) || decimal < 0 || decimal > 18) {
      return toast.error("Decimals must be a number between 1 and 18.");
    }
    if (!totalSuplay || isNaN(totalSuplay) || BigInt(totalSuplay) <= 0) {
      return toast.error("Total supply must be a positive number.");
    }
    if (!address || !Web3.utils.isAddress(address)) {
      return toast.error("Invalid Ethereum address.");
    }
    // if (balance <= 0.003) {
    //   return toast.error(
    //     `Not Enough COpen Campus Codex testnet For Transaction Your Balance is ${balance}`
    //   );
    // }
    if (!window.ethereum) {
      return toast.error("Ethereum provider is not available.");
    }
    // Additional validation for buy and sell fees and wallet addresses
    const transactionFees = "0.002";
    let args;
    let bytecode;
    let deploy_contract;
    let baseUnits = BigInt(totalSuplay) * BigInt(10) ** BigInt(decimal);

    if (tokenType === "StandardToken") {

      args = [
        tname.trim(), // name_
        symbol.trim(), // symbol_
        decimal, // decimals_
        baseUnits.toString(), // initialSupply (as string)
        address, // mintTarget
      ];
      bytecode = StandardByteCode.toString();
      deploy_contract = new ethers.ContractFactory(
        standardABI,
        bytecode,
        signer
      );
    } else {
      toast.error("Dividend Token is in under development !!!!!!!");
    }
    // Prepare arguments for the smart contract constructor
    try {
      const contract = await deploy_contract.deploy(...args);
      toast.success("Transaction successful", {
        action: {
          label: "View on Explorer",
          onClick: () =>
            window.open(
              `https://opencampus-codex.blockscout.com/address/${contract.target}`,
              "_blank"
            ),
        },
      });
    } catch (error) {
      console.log(error);
      // Log and handle errors during deployment
      toast.error("Error deploying contract: ", error.message);
      // Optionally update UI to reflect that an error occurred
    }
  };

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const tempValue = e.target.value;
    setDecimal(tempValue); // Temporarily update input for the user to type freely
    setError(""); // Clear errors while typing
  };

  const validateInput = (inputValue) => {
    const num = parseInt(inputValue, 10);
    if (inputValue === "" || isNaN(num) || num < 1 || num > 18) {
      return "Decimals must be between 1 and 18."; // Return error message if validation fails
    }
    return ""; // Return an empty string if validation succeeds
  };

  const handleInputBlur = () => {
    const error = validateInput(decimal);
    setError(error); // Set the error state based on the validation result
  };

  // Use useEffect to validate the input after the user stops typing for 500ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleInputBlur(); // Validate after the user has stopped typing for 500ms
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [decimal]);
  return (
    <>
      <LandingWrapper>
        <section className="relative py-14">
          <Container>
            <BackgroundGradient>
              <div className="relative w-full mx-auto bg-light dark:bg-dark shadow-md overflow-hidden transition-colors duration-300">
                <div className="relative p-4">
                  <div>
                    <h3>Create Trademark Token</h3>
                  </div>
                  <form className="grid grid-cols-2 gap-4 mt-8">
                    <div className="relative col-span-2">
                      <div className="relative">
                        <h6 className="mb-3">Type</h6>
                      </div>
                      <div className="flex items-center flex-wrap gap-5">
                        <div className="relative">
                          <div className="form-control">
                            <label className="label justify-start gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="tokenType"
                                className="radio radio-sm border-black checked:border-[#9333ea] dark:border-white dark:checked:border-[#9333ea] checked:bg-[#9333ea] transition-all duration-300"
                                checked={tokenType === "StandardToken"}
                                onChange={() => setTokenType("StandardToken")}
                              />
                              <span className="text-sm">Token</span>
                            </label>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="form-control">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative col-span-2">
                      <div className="relative">
                        <label className="block mb-2 text-sm">Trademark Name</label>
                        <input
                          type="text"
                          value={tname}
                          className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                          placeholder="Mridul For ex"
                          onChange={(e) => {
                            setTname(e.target.value);
                          }}
                          required
                        />
                        {!tname && (
                          <div className="text-orange-500 text-xs mt-2">
                            Trademark Token name cannot be blank
                          </div>
                        )}

                      </div>
                    </div>
                    <div className="relative col-span-2">
                      <div className="relative">
                        <label className="block mb-2 text-sm">Trademark Symbol</label>
                        <input
                          type="text"
                          value={symbol}
                          onChange={(e) => {
                            setSymbol(e.target.value);
                          }}
                          className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                          placeholder="ETH"
                          required
                        />
                        {!symbol && (
                          <div className="text-orange-500 text-xs mt-2">
                            Trademark Token symbol is a required field
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative col-span-2">
                      <div className="relative">
                        <label className="block mb-2 text-sm">Decimals</label>
                        <input
                          type="number"
                          value={decimal}
                          className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                          placeholder="Enter a value between 9 and 18"
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          min="1"
                          max="18"
                          required
                        />
                        {error && (
                          <p className="text-orange-500 text-xs mt-2">
                            {error}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="relative col-span-2">
                      <div className="relative">
                        <label className="block mb-2 text-sm">
                          Total supply
                        </label>
                        <input
                          type="number"
                          value={totalSuplay}
                          onChange={(e) => {
                            setTotalSuplay(e.target.value);
                          }}
                          className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                          placeholder="1000000"
                          required
                        />
                        {!totalSuplay && (
                          <div className="text-orange-500 text-xs mt-2">
                            Total Supply is a required field
                          </div>
                        )}
                      </div>
                    </div>


                    {tokenType === "BabyToken" && (
                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="relative col-span-1 max-md:col-span-2">
                          <div className="relative">
                            <label className="block mb-2 text-sm">
                              Reward token
                            </label>
                            <input
                              type="text"
                              className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                              placeholder="0x..."
                              required
                            />
                            <div className="text-orange-500 text-xs mt-2">
                              Address is invalid
                            </div>

                            {/* USE THIS IF NEEDED => <span className="text-[#9333ea] text-xs">Fetching Token...</span> */}
                          </div>
                        </div>
                        <div className="relative col-span-1 max-md:col-span-2">
                          <div className="relative">
                            <label className="block mb-2 text-sm">
                              Minimum token balance for dividends
                            </label>
                            <input
                              type="number"
                              className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                              placeholder="1"
                              required
                            />
                            <div className="text-orange-500 text-xs mt-2">
                              Minimum token balance for dividends is a required
                              field
                            </div>
                            <span className="text-[#9333ea] text-xs">
                              Min hold each wallet must be over $50 to receive
                              rewards.
                            </span>
                          </div>
                        </div>
                        <div className="relative col-span-1 max-md:col-span-2">
                          <div className="relative">
                            <label className="block mb-2 text-sm">
                              Token reward fee (%)
                            </label>
                            <input
                              type="number"
                              className="w-full h-11 p-3 rounded-xl border border-black dark:border-white bg-transparent outline-none text-sm"
                              placeholder="1"
                              required
                            />
                            <div className="text-orange-500 text-xs mt-2">
                              Token reward fee is a required field
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    )}

                    <div className="relative col-span-2 text-center">
                      <button
                        type="submit"
                        className="button button-primary"
                        disabled={tokenType === "BabyToken"}
                        onClick={(e) => {
                          DeployToken(e);
                        }}
                      >
                        Create Trademark Token
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </BackgroundGradient>
          </Container>
        </section>
      </LandingWrapper>
    </>
  );
};

export default page;
