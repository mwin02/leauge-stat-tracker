import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import MatchInfo from "../components/MatchInfo";

const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

const getMatchURL = (region, matchID) => {
  return `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`;
};

const Match = () => {
  const { region, matchID } = useParams();
  const [matchInfo, setMatchInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { champions } = useGlobalContext();

  const fetchMatch = useCallback(async () => {
    setLoading(true);
    const response = await fetch(getMatchURL(region, matchID));
    const data = await response.json();
    console.log(data);
    const { participants, teams, gameMode } = data.info;
    const participantIdentities = data.metadata.participants;
    let teamOneKills = 0;
    let teamTwoKills = 0;
    let newMatchInfo = {
      mode: gameMode,
      participants: participants.map((participant, index) => {
        const {
          participantId,
          championId,
          teamId,
          kills,
          deaths,
          assists,
        } = participant;
        if (teamId === 100) teamOneKills += kills;
        if (teamId === 200) teamTwoKills += kills;
        return {
          id: participantId,
          name: participant.summonerName,
          champion: { ...champions[parseInt(championId)] },
          team: teamId === 100 ? 1 : 2,
          kill: kills,
          death: deaths,
          assist: assists,
        };
      }),
    };
    console.log(teams);
    newMatchInfo.teamOne = { win: teams[0].win, kills: teamOneKills };
    newMatchInfo.teamTwo = { win: teams[1].win, kills: teamTwoKills };
    setMatchInfo(newMatchInfo);
    setLoading(false);
  }, [champions, matchID, region]);

  useEffect(() => {
    fetchMatch();
  }, [fetchMatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="match-page">
      <MatchInfo {...matchInfo} region={region} />
    </main>
  );
};

export default Match;
