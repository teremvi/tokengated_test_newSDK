import { defineChain, getContract } from "thirdweb";
import { client } from "../client";
import { balanceOf as balanceOfERC721 } from "thirdweb/extensions/erc721";



export async function hasAccess(
    address: string,

) : Promise<boolean> {
    const quantityRequired =1n;

    const contract = getContract({
        client: client,
        chain: defineChain(84532),
        address: "0x877970c81E679886Fea990e2e14aFdcF7d4aB8d7"
    })

    const ownedBalance = await balanceOfERC721({
        contract: contract,
        owner: address,
    });

    return ownedBalance >= quantityRequired;
};
