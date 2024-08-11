import { useState } from "react";
import { IPlayer } from "@/models/player";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlayerInputProps {
  players: IPlayer[];
  setPlayers: (players: IPlayer[]) => void;
  fetchPlayers: () => void;
}

export function PlayerInput({
  players,
  setPlayers,
  fetchPlayers,
}: PlayerInputProps) {
  const [newPlayer, setNewPlayer] = useState<Partial<IPlayer>>({});
  const [error, setError] = useState<string | null>(null);

  const validateInput = (input: string) => {
    const regex = /^[a-zA-Z0-9 ]+#[a-zA-Z0-9]+$/;
    return regex.test(input);
  };

  const addPlayer = async () => {
    if (!validateInput(newPlayer.riotName || "")) {
      setError(
        "Invalid format. Please enter a nickname of format Nickname#TAG."
      );
      return;
    }
    setError(null);
    const response = await axios.post("/api/players", newPlayer);
    setPlayers([...players, response.data]);
    setNewPlayer({});
    fetchPlayers();
  };

  return (
    <div className="w-full m-4">
      <div className="flex flex-row mb-4">
        <Input
          type="text"
          placeholder="Nickname#TAG"
          value={newPlayer.riotName || ""}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, riotName: e.target.value })
          }
          className="mr-2 bg-blue-300 text-white"
        />
        <Button onClick={addPlayer} className="ml-2 bg-blue-900">
          Add Player
        </Button>
      </div>
      <div className="flex flex-col">
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
