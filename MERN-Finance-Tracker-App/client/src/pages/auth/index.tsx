

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, SignUpButton } from '@clerk/clerk-react';

export const Auth = () => {
    return (
        <div className='m-12'>
            {/* if signed out */}

            <SignedOut>
                <div className='bg-amber-600 p-4 rounded-lg'>
                    <SignUpButton mode='modal' />
                    <SignInButton mode='modal' />
                </div>
            </SignedOut>



            {/* after it signed in display the user */}

            <SignedIn>
                <div className='bg-green-600 flex justify-end'>
                    <UserButton />
                </div>
            </SignedIn >


        </div >
    );
}
