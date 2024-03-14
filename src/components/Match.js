import React, { useState } from "react";
import { Link } from "react-router-dom";

const Match = ({ match, index, region }) => {
  const { id, champion, role, lane, time } = match;
  const [showTime, setShowTime] = useState(false);
  return (
    <tr className="match">
      <th>Game {index + 1}</th>
      <div className="match-info">
        <th>
          <img src={champion.image} alt={champion.name} className="hero-icon" />
        </th>
        <th>{champion.name}</th>
        <th>Role: {role}</th>
        <th>Lane: {lane}</th>
        <th>Time: </th>
        <th>
          {showTime ? time : ""}
          <button onClick={() => setShowTime(!showTime)}>
            {showTime ? "Hide" : "Show"}
          </button>
        </th>
      </div>
      <div className="button-container">
        <button className="more-info-btn">
          <Link to={`/match/${region}/${id}`}>More Info</Link>
        </button>
      </div>
    </tr>
  );
};

export default Match;
