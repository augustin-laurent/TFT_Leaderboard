# TFT Leaderboard

This is a [Next.js](https://nextjs.org/) project for managing and displaying a leaderboard for Teamfight Tactics (TFT) players. The application allows users to view player statistics, and admin users to add, update, and delete players.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- Components
- [API Endpoints](#api-endpoints)
- [Player Management Functions](#player-management-functions)
- [Environment Variables](#environment-variables)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
.env.local
.eslintrc.json
.gitignore
.next/
app/
    api/
    columns/
    globals.css
    layout.tsx
    page.tsx
components/
    DataTable.tsx
    Footer.tsx
    Header.tsx
    PlayerInput.tsx
    ui/
components.json
lib/
    callRiot.ts
    db.ts
middleware.ts
models/
    player.ts
next-env.d.ts
next.config.mjs
package.json
postcss.config.mjs
public/
README.md
tailwind.config.ts
tsconfig.json
```

## Components

### [`app/page.tsx`]

The main page of the application. It fetches and displays the list of players and includes the [`PlayerInput`] component for adding new players.

### [`components/DataTable.tsx`]

Displays the player data in a table format. It uses the [`Table`](command:_github.copilot.openSymbolFromReferences?%5B%22Table%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faugustin%2Ftft-leaderboard%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faugustin%2Ftft-leaderboard%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faugustin%2Ftft-leaderboard%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A3%7D%7D%5D%5D "Go to definition") components from [`components/ui/table.tsx`] (ShadCN).

### [`components/Footer.tsx`]

A simple footer component.

### [`components/Header.tsx`]

A simple header component, contain the button to log in and manage account via Clerk.

### [`components/PlayerInput.tsx`]

Allows admin users to add and delete players. It includes an input field for adding new players that is restricted to Username#TAG format for Riot account.

## API Endpoints

### [`app/api/players/route.ts`]

- **GET**: Fetches the list of players.
- **POST**: Adds a new player.
- **DELETE**: Deletes a player.

### [`app/api/updatePlayers/route.ts`]

- **GET**: Updates the player data by fetching the latest information from the Riot API.

## Player Management Functions

### Create Player

To create a player, send a POST request to `/api/players` with the player's information.

```ts
export async function POST(req: Request) {
  const { username } = await req.json();
  const playerData = await getPlayerData(username);
  const newPlayer = new Player(playerData);
  await newPlayer.save();
  return NextResponse.json(newPlayer);
}
```

### Update Player

To update players, send a GET request to `/api/updatePlayers`. This will fetch the latest data from the Riot API and update the player records in the database.

```ts
export async function GET() {
  try {
    await connectDB();
    const players = await Player.find();

    for (const player of players) {
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
        winrate: `${(
          (data[0].wins / (data[0].wins + data[0].losses)) *
          100
        ).toFixed(2)}%`,
        rank: data[0].tier + " " + data[0].rank,
        lastUpdated: lastUpdate,
        lastMatch: lastMatch,
      });
    }
    console.log("Players updated");
    return NextResponse.json({ message: "Players updated" });
  } catch (error) {
    console.error("Error updating players", error);
    return NextResponse.json({ message: "Error updating players" });
  }
}
```

### Delete Player

To delete a player, send a DELETE request to `/api/players` with the player's ID.

```ts
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await Player.findByIdAndDelete(id);
  return NextResponse.json({ message: "Player deleted" });
}
```

## Environment Variables

To initialize the project, you need to fill out the [`.env.local`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Faugustin%2Ftft-leaderboard%2F.env.local%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/augustin/tft-leaderboard/.env.local") file with the necessary environment variables. Create a [`.env.local`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Faugustin%2Ftft-leaderboard%2F.env.local%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/augustin/tft-leaderboard/.env.local") file in the root directory of your project and add the following variables:

```
# Riot API Key
RIOT_API_KEY=your_riot_api_key

# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# Clerk API Key (if using Clerk for authentication)
CLERK_API_KEY=your_clerk_api_key
```

Replace `your_riot_api_key`, `your_mongodb_connection_string`, and `your_clerk_api_key` with your actual keys.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.