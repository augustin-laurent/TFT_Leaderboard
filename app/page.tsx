"use client";



import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";

import { IPlayer } from "@/models/player";

import axios from "axios";
import schedulePlayerUpdate from "@/lib/scheduleUpdate";

import { DataTable } from "@/components/DataTable";
import { PlayerInput } from "@/components/PlayerInput";  
import { Header } from "@/components/Header";

import { columns } from "@/app/columns/column"; 
import { Footer } from "@/components/Footer";

export default function Home() {

  const [players, setPlayers] = useState<IPlayer[]>([]);

  const { user } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin";

  const deletePlayer = async (id: string) => {
    await axios.delete("/api/players", { data: { id } });
    setPlayers(players.filter((player) => player.id !== id));
  };

  useEffect(() => {
    async function fetchPlayers() {
      const response = await axios.get("/api/players");
      setPlayers(response.data);
    }
    fetchPlayers();
    schedulePlayerUpdate();
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col">
      <Header />
      <div className="container flex flex-col justify-center items-center flex-grow">
        <DataTable columns={columns} data={players} />
        <SignedIn>
          <PlayerInput players={players} setPlayers={setPlayers} />
        </SignedIn>
      </div>
      <Footer />
    </main>
  );
}