import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="flex items-center justify-center w-full p-4">
            <div className="flex-grow text-center">
                <h1 className="text-2xl font-bold">TFT Leaderboard</h1>
            </div>
            <div className="ml-auto">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </header>
    )
}