import React from "react";
import Match from "./Match";
const MatchList = ({ region, matches }) => {
  return (
    <div className="match-container">
      <h1 className="title">Last 10 Games</h1>
      <table className="matches">
        {/* {matches} */}
        {matches.map((match, index) => {
          console.log(match);
          return (
            <Match match={match} key={match.id} index={index} region={region} />
          );
        })}
      </table>
    </div>
  );
};

export default MatchList;
