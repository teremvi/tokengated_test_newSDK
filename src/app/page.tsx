'use client';

import Image from "next/image";
import {  useActiveAccount, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/Token-gating-brings-more-utility-to-NFTs.jpg";
import { client } from "./client";

import Link from "next/link";
import { defineChain, getContract, toEther } from "thirdweb";
import { balanceOf as balanceOfERC721 } from "thirdweb/extensions/erc721";

import LoginButton from "./components/Loginpage";



export default function Home() {
  const account = useActiveAccount();
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20 ">
      <LoginButton/>
     
        </div>
         
         {account && (
          <div className="flex flex-col gap-4 justify-center mb-20">
            <p>Para tener acceso al contenido tienes que comprarlo</p>
            <WalletBalances walletAddress={account?.address || ""}/>
            <div className="flex justify-center mb-20 ">
            <p>Buy this content (Needed NFT ERC721)</p>
            <Link href="/gated-content">
           
            <button className="bg-zinc-100 px-4 mx-4 py-2 text-black rounded-md">
              Entrar al contenido

            </button>
            
            </Link>
            
            </div>
          
            <div className="grid divide-x"> </div>
      

     

          </div>
         )

         }

        
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className=""
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-2xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>

      <p className="text-zinc-300 text-base">
       Token Gated{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          APP
        </code>{" "}
   
      </p>
    </header>
  );
}


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
    
      <p  className={CharacterBalance? "text-green-400" : "text-red-400"} >NFT: {walletAddress? `${CharacterBalance?.toString()}  (${CharacterBalance?"Tienes acceso al contenido" : "NO tienes acceso al contenido"})`  : "0"}</p>
 
    </div>
  )
};




 


