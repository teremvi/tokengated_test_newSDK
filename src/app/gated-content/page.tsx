import { cookies } from "next/headers";
import { thirdwebAuth } from "../utils/thirdwebAuth";
import { hasAccess } from "../actions/conditions";
import Link from "next/link";

export default async function GatedPage() {
    const jwt = cookies().get('jwt');

    if (!jwt?.value) {
        return <MustLogin/>
    }

    const authResult = await thirdwebAuth.verifyJWT({
        jwt: jwt.value,
    });

    if(!authResult.valid) {
        return  <MustLogin/>

    }

    const address = authResult.parsedJWT.sub;

    if(!address) {
        throw new Error("No address found")

    }

    const _hasAccess = await hasAccess(address);

    if(!_hasAccess) {
        return <NotAllowed/>
    }
    return <div className="flex flex-col min-h-[100vh] items-center justify-center p-4 text-center">
         <span className="inline-block -skew-x-6 text-green-500"> CONGRATULATION!!!! </span>
        <p>access granted, buyed with nft</p>
    <Link href="/">
    <button
    className="mt-4 bg-zinc-100 px-4 py-2 text-black rounded-md"
    >HOME</button>
    </Link></div> 

    
} 

const MustLogin = () => {
    return (
        <div className="flex flex-col min-h-[100vh] items-center justify-center p-4 text-center">
            <p>not logged in</p>
            <Link href="/">
            <button
            className="mt-4 bg-zinc-100 px-4 py-2 text-black rounded-md"
            >Go to Login</button>
            </Link>
        </div>
    )
};

const NotAllowed =() => {
    return (
        <div className="flex flex-col min-h-[100vh] items-center justify-center p-4 text-center">
             
            <p>You do not own NFT required</p>
            <Link href="/">
            <button
            className="mt-4 bg-zinc-100 px-4 py-2 text-black rounded-md"
            >HOME</button>
            </Link>

            <Link href="/nft-claim">
            <button
            className="mt-4 bg-zinc-100 px-4 py-2 text-black rounded-md"
            >Claim NFT</button>
            </Link>
        </div>
    )
}