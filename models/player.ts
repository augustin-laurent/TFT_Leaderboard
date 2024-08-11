import mongoose, { Document, Model } from "mongoose";

export interface IPlayer extends Document {
  puuid: string;
  riotId: string;
  riotName: string;
  lp: number;
  wins: number;
  losses: number;
  winrate: string;
  rank: string;
  lastUpdated: string;
  lastMatch: string;
}

const playerSchema = new mongoose.Schema({
  riotId: { type: String, required: true },
  puuid: { type: String, required: true },
  riotName: { type: String, required: true },
  lp: { type: Number, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  winrate: { type: String, required: true },
  rank: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  lastMatch: { type: String, required: true },
});

export const Player: Model<IPlayer> =
  mongoose.models.Player || mongoose.model<IPlayer>("Player", playerSchema);
