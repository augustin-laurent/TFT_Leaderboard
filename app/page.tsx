"use client";

import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";

import { IPlayer } from "@/models/player";

import { Columns } from "@/app/columns/column";

import { DataTable } from "@/components/DataTable";
import { PlayerInput } from "@/components/PlayerInput";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UpdateButton } from "@/components/UpdateButton";

export const fetchCache = "force-no-store";

export default function Home() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      const response = await fetch("/api/players");
      const data = await response.json();
      setPlayers(data);
      setLoading(false);
    }

    fetchPlayers();
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col">
      <Header />
      <div className="container flex flex-col justify-center items-center flex-grow">
        <DataTable columns={Columns(() => {}, user)} data={players} loading={loading} />
        <SignedIn>
          <UpdateButton fetchPlayers={() => {}}/>
          <PlayerInput
            players={players}
            setPlayers={setPlayers}
            fetchPlayers={() => {}}
          />
        </SignedIn>
      </div>
      <Footer />
    </main>
  );
}
