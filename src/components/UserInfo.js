import React from "react";

const UserInfo = ({ summonerName, summonerLevel, rank, wins, losses }) => {
  return (
    <div className="userinfo">
      <h3 className="stats">
        Level: {summonerLevel} Rank: {rank.tier} {rank.rank}
      </h3>
      <h3 className="stats">
        Wins: {wins} Losses: {losses}
      </h3>
    </div>
  );
};

export default UserInfo;
