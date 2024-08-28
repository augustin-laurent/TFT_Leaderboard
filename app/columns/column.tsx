"use client";
import { ColumnDef } from "@tanstack/react-table";

import { IPlayer } from "@/models/player";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const rankValues: { [key: string]: number } = {
  "IRON IV": 1,
  "IRON III": 2,
  "IRON II": 3,
  "IRON I": 4,
  "BRONZE IV": 5,
  "BRONZE III": 6,
  "BRONZE II": 7,
  "BRONZE I": 8,
  "SILVER IV": 9,
  "SILVER III": 10,
  "SILVER II": 11,
  "SILVER I": 12,
  "GOLD IV": 13,
  "GOLD III": 14,
  "GOLD II": 15,
  "GOLD I": 16,
  "PLATINUM IV": 17,
  "PLATINUM III": 18,
  "PLATINUM II": 19,
  "PLATINUM I": 20,
  "EMERALD IV": 21,
  "EMERALD III": 22,
  "EMERALD II": 23,
  "EMERALD I": 24,
  "DIAMOND IV": 25,
  "DIAMOND III": 26,
  "DIAMOND II": 27,
  "DIAMOND I": 28,
  MASTER: 29,
  GRANDMASTER: 30,
  CHALLENGER: 31,
  UNRANKED: 32,
};

const rankSortingFn = (rowA: any, rowB: any, columnId: any) => {
  const rankA = rankValues[rowA.getValue(columnId)] || 0;
  const rankB = rankValues[rowB.getValue(columnId)] || 0;
  return rankA - rankB;
};

export function Columns(fetchPlayers: () => void) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const columns: ColumnDef<IPlayer>[] = [
    {
      header: "Nickname",
      accessorKey: "riotName",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            LP
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "lp",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Wins
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "wins",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Losses
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "losses",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Winrate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "winrate",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rank
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "rank",
      sortingFn: rankSortingFn,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "lastUpdated",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Match
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "lastMatch",
    }
  ];

  if (isAdmin) {
    columns.push({
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            await axios.delete("/api/players", { data: { id: row.original._id } });
            fetchPlayers();
          } catch (error) {
            console.error("Failed to delete player:", error);
          }
        };
        return (
          <Button onClick={handleDelete}>
            Delete
          </Button>
        );
      },
    });
  }

  return columns;
}
