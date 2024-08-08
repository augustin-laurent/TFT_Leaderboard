"use client";
import { ColumnDef } from "@tanstack/react-table";

import { IPlayer } from "@/models/player";

export const columns: ColumnDef<IPlayer>[] = [
    {
        header: "Nickname",
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