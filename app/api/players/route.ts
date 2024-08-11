import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Player } from "@/models/player";

import {
  getPlayerPUUID,
  getPlayerID,
  getPlayerInformation,
  getMatches,
  getInformationLastMatches,
} from "@/lib/callRiot";

import { format } from "date-fns";

export async function GET() {
  await connectDB();
  const players = await Player.find({});
  return NextResponse.json(players);
}

export async function POST(req: Request) {
  await connectDB();
  const username = await req.json();
  const newPlayer = await getPlayerData(username.riotName);

  if (!newPlayer) {
    return NextResponse.json({ message: "Player data not found" });
  }

  try {
    await newPlayer.save();
  } catch (error) {
    return NextResponse.json({ message: "Error saving player" });
  }
  return NextResponse.json("newPlayer");
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Player.findByIdAndDelete(id);
  return NextResponse.json({ message: "Player deleted" });
}

async function getPlayerData(username: string) {
  const [riotName, riotTag] = username.split("#");
  try {
    const puuid = await getPlayerPUUID(riotName, riotTag);
    const id = await getPlayerID(puuid);
    const data = await getPlayerInformation(id);
    const matches = await getMatches(puuid);
    const lastMatches = await getInformationLastMatches(matches[0]);

    const currentDate = new Date();
    const lastUpdate = format(currentDate, "dd/MM/yyyy");

    const lastMatchDate = new Date(lastMatches.info.game_datetime);
    const lastMatch = format(lastMatchDate, "dd/MM/yyyy");

    const newPlayer = new Player({
      riotId: data[0].summonerId,
      puuid: puuid,
      riotName: username,
      lp: data[0].leaguePoints,
      wins: data[0].wins,
      losses: data[0].losses,
      winrate: `${(
        (data[0].wins / (data[0].wins + data[0].losses)) *
        100
      ).toFixed(2)}%`,
      rank: data[0].tier + " " + data[0].rank,
      lastUpdated: lastUpdate,
      lastMatch: lastMatch,
    });

    return newPlayer;
  } catch (error) {
    console.error(
      "Failed to fetch player data, error might be related to Riot API check if the service is online",
      error
    );
  }
}
