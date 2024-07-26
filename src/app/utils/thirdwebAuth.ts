import { createAuth } from "thirdweb/auth";
import { client } from "../client";
import { privateKeyToAccount } from "thirdweb/wallets";

const privateKey = process.env.THIRDWEB_PRIVATE_KEY || "";

if(!privateKey){
    throw new Error("thirdweb_privatekey is required");
}

export const thirdwebAuth = createAuth({
    domain: process.env.NEX_PUBLIC_THIRDWEB_DOMAIN || "",
    adminAccount: privateKeyToAccount({
        client:client,
        privateKey: privateKey,
    })
})