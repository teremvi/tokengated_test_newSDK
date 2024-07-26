'use client';

import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";

import { client } from "../client";
import { defineChain, getContract } from "thirdweb";
import { claimTo, balanceOf as balanceOfERC721 } from "thirdweb/extensions/erc721";
import Link from "next/link";
import LoginButton from "../components/Loginpage";

export default function NftClaim() {
    const account =useActiveAccount();
    return(
        <div>
            <div className="p-4 pb-10 min-h-[100vh] flex flex-col items-center justify-center">
                <div className="my-6">
                    <LoginButton/>
                </div>
                <TransactionButton
                transaction={() => claimTo({
                    contract: getContract({
                    client: client,
                    chain: defineChain(84532),
                    address: "0x877970c81E679886Fea990e2e14aFdcF7d4aB8d7"
                    }),
                    to: account?.address || "",
                    quantity: 1n
                })}
                onTransactionConfirmed={async() => {alert("NFT claimed!")}}
                onError={async() => {alert("error")}}
                >
                    claim NFT
                </TransactionButton>

                <Link href="/gated-content">
            <button className="mt-4 bg-zinc-100 px-4 py-2 text-black rounded-md">
              Go to gated content

            </button>
            </Link>
            <WalletBalances walletAddress={account?.address || ""}/>
            </div>
        </div>
    )
};

type WalletAddressProps = {
    walletAddress?: string;
  };

const WalletBalances: React.FC<WalletAddressProps> =({walletAddress}) => {
    const {data: CharacterBalance} = useReadContract(
      balanceOfERC721,
      {
        contract: getContract({
          client:client,
          chain: defineChain(84532),
          address:"0x877970c81E679886Fea990e2e14aFdcF7d4aB8d7"
        }),
        owner: walletAddress || ""
      }
    );
  
 
   
  
    return (
      <div className="flex flex-col gap-4 mt-3">
        <p>
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
        Wallet Balance
          </code>{" "}
        </p>
        <p>Wallet Address: {walletAddress? walletAddress : " no wallet conected"}</p>
        <p>Character: {walletAddress? CharacterBalance?.toString() : "0"}</p>
   
      </div>
    )
  }
  
  