"use client";

import { useEffect, useState } from "react";
import { SignedIn } from "@clerk/nextjs";

import { IPlayer } from "@/models/player";

import axios from "axios";
import schedulePlayerUpdate from "@/lib/scheduleUpdate";

import { DataTable } from "@/components/DataTable";
import { PlayerInput } from "@/components/PlayerInput";
import { Header } from "@/components/Header";

import { Columns } from "@/app/columns/column";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  async function fetchPlayers() {
    const response = await axios.get("/api/players");
    setPlayers(response.data);
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col">
      <Header />
      <div className="container flex flex-col justify-center items-center flex-grow">
        <DataTable columns={Columns()} data={players} />
        <SignedIn>
          <PlayerInput
            players={players}
            setPlayers={setPlayers}
            fetchPlayers={fetchPlayers}
          />
        </SignedIn>
      </div>
      <Footer />
    </main>
  );
}
