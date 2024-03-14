import React from "react";
import { Link } from "react-router-dom";

const MatchInfo = ({ mode, participants, teamOne, teamTwo, region }) => {
  return (
    <div className="match-container">
      <h1 className="title">Mode: {mode}</h1>
      <table className="match-participants">
        {participants.map((participant, index) => {
          const { id, champion, name, kill, death, assist } = participant;
          return (
            <div key={id}>
              {index === 0 && (
                <h1 className="team-score">
                  Team One {teamOne.win ? "(Win)" : "(Lose)"} Kills:
                  {teamOne.kills}
                </h1>
              )}
              {index === 5 && (
                <h1 className="team-score">
                  Team Two {teamTwo.win ? "(Win)" : "(Lose)"} Kills:
                  {teamTwo.kills}
                </h1>
              )}
              <tr className="participant">
                <th>
                  <img
                    className="match-icon"
                    src={champion.image}
                    alt={champion.name}
                  />
                </th>
                <th>{champion.name}</th>
                <th>
                  Player:
                  <Link to={`/user/${region}/${name}`}>{name}</Link>
                </th>
                <th>
                  K: {kill} D: {death} A:
                  {assist}
                </th>
              </tr>
            </div>
          );
        })}
      </table>
    </div>
  );
};

export default MatchInfo;
