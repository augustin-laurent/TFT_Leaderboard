import { format } from "date-fns";

import { NextResponse } from "next/server";

import { Player } from "@/models/player"; 
import { connectDB } from "@/lib/db";
import { getRiotName, getPlayerInformation, getMatches, getInformationLastMatches } from "@/lib/callRiot";

export async function GET() {
    try {
        await connectDB();
        const players = await Player.find();

        for(const player of players) {
            console.log("Player: ", player);
            const riotName = await getRiotName(player.puuid);

            const data = await getPlayerInformation(player.riotId);
            const matches = await getMatches(player.puuid);
            const lastMatches = await getInformationLastMatches(matches[0]);
            
            const currentDate = new Date();
            const lastUpdate = format(currentDate, "dd/MM/yyyy");

            const lastMatchDate = new Date(lastMatches.info.game_datetime);
            const lastMatch = format(lastMatchDate, "dd/MM/yyyy");

            await Player.findByIdAndUpdate(player._id, { 
                riotName: riotName,
                lp: data[0].leaguePoints,
                wins: data[0].wins,
                losses: data[0].losses,
                winrate: `${((data[0].wins / (data[0].wins + data[0].losses)) * 100).toFixed(2)}%`,
                rank: data[0].tier + " " + data[0].rank,
                lastUpdated: lastUpdate,
                lastMatch: lastMatch
            });
        }
        console.log("Players updated");
        return NextResponse.json({ message: "Players updated" });
    }
    catch (error) {
        console.error("Error updating players", error);
        return NextResponse.json({ message: "Error updating players" });
    };
};