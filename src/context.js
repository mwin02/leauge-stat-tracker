import React, { useState, useContext, useEffect, useCallback } from "react";

const championURL =
  "https://ddragon.leagueoflegends.com/cdn/14.5.1/data/en_US/champion.json";
const imageURL = "http://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion";

const getFavoritePlayers = () => {
  let list = localStorage.getItem("favoritePlayers");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const getChampions = () => {
  let list = localStorage.getItem("champions");
  if (list) {
    return JSON.parse(list);
  } else {
    return new Map();
  }
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [champions, setChampions] = useState(getChampions());
  const [favoritePlayers, setFavoritePlayers] = useState(getFavoritePlayers());

  const fetchChampions = useCallback(async () => {
    try {
      const response = await fetch(championURL);
      const { data } = await response.json();
      const championsInfo = Object.values(data);
      const championData = {};
      championsInfo.forEach((champion) => {
        const {
          key,
          name,
          image: { full },
        } = champion;
        championData[parseInt(key)] = { name, image: `${imageURL}/${full}` };
      });
      setChampions(championData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addPlayer = (player) => {
    setFavoritePlayers([...favoritePlayers, player]);
  };
  const removePlayer = (player) => {
    setFavoritePlayers((prevList) => {
      return prevList.filter(
        (item) => item.summonerName !== player.summonerName
      );
    });
  };

  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  useEffect(() => {
    //the method takes in two strings so we need to make the list a string
    localStorage.setItem("favoritePlayers", JSON.stringify(favoritePlayers));
  }, [favoritePlayers]);

  useEffect(() => {
    //the method takes in two strings so we need to make the list a string
    localStorage.setItem("champions", JSON.stringify(champions));
  }, [champions]);

  return (
    <AppContext.Provider
      value={{ champions, favoritePlayers, addPlayer, removePlayer }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
