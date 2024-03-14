import React from "react";
import Searchbar from "../components/Searchbar";

const Home = () => {
  return (
    <main className="home-page">
      <div className="title">
        <h1>Search for Player</h1>
      </div>
      <Searchbar />
    </main>
  );
};

export default Home;
