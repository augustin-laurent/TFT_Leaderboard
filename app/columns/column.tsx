"use client";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
    riotName: string;
    lp: number;
    wins: number;
    losses: number;
    winrate: string;
    rank: string;
    lastUpdated: string;
    lastMatch: string;
}

export const columns: ColumnDef<User>[] = [
    {
        header: "Riot Name",
        accessorKey: "riotName",
    },
    {
        header: "LP",
        accessorKey: "lp",
    },
    {
        header: "Wins",
        accessorKey: "wins",
    },
    {
        header: "Losses",
        accessorKey: "losses",
    },
    {
        header: "Winrate",
        accessorKey: "winrate",
    },
    {
        header: "Rank",
        accessorKey: "rank",
    },
    {
        header: "Last Updated",
        accessorKey: "lastUpdated",
    },
    {
        header: "Last Match",
        accessorKey: "lastMatch",
    },
];