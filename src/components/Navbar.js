import React from "react";
import { Link } from "react-router-dom";
const logo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/1280px-League_of_Legends_2019_vector.svg.png";
const links = ["home", "players", "about", "help"];
const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img className="logo" src={logo} alt="Leauge Of Legend Logo" />
        </div>
        <div className="links-container">
          <ul className="links">
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link className="link" to={`/${link}`}>
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
