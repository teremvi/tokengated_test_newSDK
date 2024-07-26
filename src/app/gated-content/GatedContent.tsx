'use client';

import LoginButton from "../components/Loginpage";




export const GatedContent = () => {
    return (
        <div className="p-4 pb-10 min-h-[100vh] flex flex-col items-center
        justify-center">
            <LoginButton/>
            <p className="mt-4">You have access to the content</p>
        </div>
    )
}