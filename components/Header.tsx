
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

import { Button } from "@/components/ui/button";

import Image from "next/image";

export function Header() {
    return (
        <header className="flex flex-col items-center w-screen bg-neutral-100 bg-opacity-90">
            <div>
                <Image src="/character.png" alt="tft_logo" width={100} height={100} />
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="flex-grow text-center">
                    <h1 className="text-4xl font-bold text-blue-900">TFT Leaderboard</h1>
                </div>
                <div className="ml-auto justify-center">
                    <SignedIn>
                        <div className="p-4">
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="p-4">
                            <SignInButton>
                                <Button>Sign In</Button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}