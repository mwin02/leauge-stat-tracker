import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import UserInfo from "../components/UserInfo";
import MatchList from "../components/MatchList";

const regionMap = new Map();

regionMap.set('na1', 'americas');
regionMap.set('eu1', 'europe');
regionMap.set('oc1', 'asia');

const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

const getIDLink = (region, username) => {
  return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`;
};

const getAccountLink = (region, summonerID) => {
  return `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${API_KEY}`;
};

const getMatchesLink = (region, puuid) => {
  return `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`;
}

const getMatchLink = (region, matchID) => {
  return `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`;
};



const createUser = (summonerData, leaugeData) => {
  const newUser = {
    summonerName: leaugeData.summonerName,
    summonerID: summonerData.id,
    accountID: summonerData.accountId,
    puuid: summonerData.puuid,
    summonerLevel: summonerData.summonerLevel,
    profileIcon: summonerData.profileIconId,
    rank: { tier: leaugeData.tier, rank: leaugeData.rank },
    wins: leaugeData.wins,
    losses: leaugeData.losses,
  };
  return newUser;
};

const User = () => {
  const { region, username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);
  const { champions, addPlayer } = useGlobalContext();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const matchRegion = regionMap.get(region);
      const summonerResponse = await fetch(getIDLink(region, username));
      const summonerData = await summonerResponse.json();
      console.log(summonerData);
      if (
        summonerData.hasOwnProperty("status") &&
        summonerData.status.status_code === 404
      ) {
        throw new Error("User Not Found");
      }
      if (
        summonerData.hasOwnProperty("status") &&
        summonerData.status.status_code === 403
      ) {
        throw new Error("Access Token Expired");
      }

      const leaugeResponse = await fetch(
        getAccountLink(region, summonerData.id)
      );
      const [leaugeData] = await leaugeResponse.json();
      if (!leaugeData) {
        throw new Error("User Not Enough Information");
      }
      const newUser = createUser(summonerData, leaugeData);
      setUserInfo(newUser);

      const matchesResponse = await fetch(
        getMatchesLink(matchRegion, newUser.puuid)
      );
      const matchesData = await matchesResponse.json();
      console.log(matchesData);

      let matchHistory = []
      for (let i = 0; i < matchesData.length; i++) {
        const matchId = matchesData[i];
        const matchResponse = await fetch(getMatchLink(matchRegion, matchId));
        const matchData = await matchResponse.json();
        const player = matchData.info.participants.find((participant) => {
          return participant.puuid === newUser.puuid
        });
        const { championId, role, lane } = player;
        const newMatch = {
          id: matchId,
          champion: { ...champions[parseInt(championId)] },
          role,
          lane,
          time: new Date(matchData.info.gameEndTimestamp).toString(),
        };
        matchHistory.push(newMatch);
      }

      console.log(matchHistory);
      setMatches(matchHistory);
    } catch (error) {
      console.log("There was an error:" + error);
      setError(error);
    }
    setLoading(false);
  }, [region, username, champions]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <h1 className="title">Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <main className="userpage">
      <h1 className="title">{userInfo.summonerName}</h1>
      <UserInfo {...userInfo} />
      <button
        className="btn"
        onClick={() => {
          addPlayer({ ...userInfo, region });
        }}
      >
        Add To Favorite
      </button>
      <MatchList region={region} matches={matches} />
    </main>
  );
};

export default User;
