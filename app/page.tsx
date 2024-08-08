"use client";

import { Header } from "@/components/Header";

import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";

import { IPlayer } from "@/models/player";

import axios from "axios";
import schedulePlayerUpdate from "@/lib/scheduleUpdate";

export default function Home() {

  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [newPlayer, setNewPlayer] = useState<Partial<IPlayer>>({});
  const { user } = useUser();

  useEffect(() => {
    async function fetchPlayers() {
      const response = await axios.get("/api/players");
      setPlayers(response.data);
    }
    fetchPlayers();
    schedulePlayerUpdate();
  }, []);

  const addPlayer = async () => {
    const response = await axios.post("/api/players", newPlayer);
    setPlayers([...players, response.data]);
    setNewPlayer({});
  };

  const deletePlayer = async (id: string) => {
    await axios.delete("/api/players", { data: { id } });
    setPlayers(players.filter((player) => player.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Riot Name</th>
            <th className="py-2">LP</th>
            <th className="py-2">Wins</th>
            <th className="py-2">Losses</th>
            <th className="py-2">Winrate</th>
            <th className="py-2">Rank</th>
            <th className="py-2">Last Updated</th>
            <th className="py-2">Last Match</th>
            <SignedIn>
              {user?.publicMetadata?.role === "admin" && (
                <th className="py-2">Actions</th>
                )}
            </SignedIn>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.riotId}>
              <td className="border px-4 py-2">{player.riotName}</td>
              <td className="border px-4 py-2">{player.lp}</td>
              <td className="border px-4 py-2">{player.wins}</td>
              <td className="border px-4 py-2">{player.losses}</td>
              <td className="border px-4 py-2">{player.winrate}</td>
              <td className="border px-4 py-2">{player.rank}</td>
              <td className="border px-4 py-2">{player.lastUpdated}</td>
              <td className="border px-4 py-2">{player.lastMatch}</td>
              <SignedIn>
                {user?.publicMetadata?.role === "admin" && (
                  <td className="border px-4 py-2">
                      <button onClick={() => deletePlayer(player.id)} className="bg-red-500 text-white p-2 rounded">
                        Delete
                      </button>
                  </td>
                )}
              </SignedIn>
            </tr>
          ))}
        </tbody>
      </table>
      <SignedIn>
      <div className="mb-4">
        <input type="text" placeholder="Riot Name" value={newPlayer.riotName || ""} onChange={(e) => setNewPlayer({ ...newPlayer, riotName: e.target.value })} className="mr-2 p-2 border border-gray-300 rounded" />
        <button onClick={addPlayer} className="p-2 bg-blue-500 text-white rounded">
          Add Player
        </button>
      </div>
    </SignedIn>
  </div>
  );
}

