"use client";

import { useEffect, useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import axios from "axios";

import { IPlayer } from "@/models/player";

import { Columns } from "@/app/columns/column";

import { DataTable } from "@/components/DataTable";
import { PlayerInput } from "@/components/PlayerInput";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UpdateButton } from "@/components/UpdateButton";


export default function Home() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchPlayers() {
    setLoading(true);
    const response = await axios.get("/api/players");
    setPlayers(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col">
      <Header />
      <div className="container flex flex-col justify-center items-center flex-grow">
        <DataTable columns={Columns(fetchPlayers)} data={players} loading={loading} />
        <SignedIn>
          <UpdateButton />
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
