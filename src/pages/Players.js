import React from "react";
import { useGlobalContext } from "../context";
import UserInfo from "../components/UserInfo";
import { Link } from "react-router-dom";
const Players = () => {
  const { favoritePlayers, removePlayer } = useGlobalContext();
  console.log(favoritePlayers);
  return (
    <div className="player-container">
      <h1 className="title">Favorite Players</h1>
      {favoritePlayers.map((player) => {
        return (
          <div className="favorite-player">
            <h1>{player.summonerName}</h1>
            <UserInfo {...player} />
            <div className="buttons">
              <button className="btn">
                <Link to={`/user/${player.region}/${player.summonerName}`}>
                  More Info
                </Link>
              </button>
              <button className="btn" onClick={() => removePlayer(player)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
