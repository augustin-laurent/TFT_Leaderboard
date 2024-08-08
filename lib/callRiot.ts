async function getPlayerPUUID(nickname: string, tag: string) {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nickname}/${tag}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        return data.puuid;
    }
    catch (error) {
        console.error("Failed to fetch user", error);
    }
}

async function getPlayerID(puuid: string) {
    const url = `https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("Failed to fetch user", error);
    }
}

async function getPlayerInformation(id: string) {
    const url = `https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        if(data.length === 0) {
            return [{ summonerId: id, leaguePoints: 0, wins: 0, losses: 0, tier: "UNRANKED", rank: "" }];
        }
        return data;
    } catch (error) {
        console.error("Failed to fetch user", error);
    }
}

async function getMatches(puuid: string) {
    const url = `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch matches of the user");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Failed to fetch matches of the user", error);
    }
}

async function getInformationLastMatches(matchesID: string) {
    const url = `https://europe.api.riotgames.com/tft/match/v1/matches/${matchesID}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch last matche of the user");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Failed to fetch last matche of the user", error);
    }
}

async function getRiotName(puuid: string) {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        return data.gameName+"#"+data.tagLine;
    }
    catch (error) {
        console.error("Failed to fetch user", error);
    }
}

export { getPlayerPUUID, getPlayerID, getPlayerInformation, getMatches, getInformationLastMatches, getRiotName };