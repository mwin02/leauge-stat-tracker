import React, { useState } from "react";
import { Link } from "react-router-dom";

const regions = ["na1", "eu1", "oc1"];

const Searchbar = () => {
  const [user, setUser] = useState("");
  const [region, setRegion] = useState("na1");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            className="input-text"
          />
        </div>
        <div className="input">
          <label htmlFor="region" className="label">
            Region:
          </label>
          <select
            className="input-select"
            id="region"
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((region) => {
              return (
                <option key={region} value={region}>
                  {region}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input">
          <button type="submit" className="btn">
            <Link to={`user/${region}/${user}`}>Submit</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
