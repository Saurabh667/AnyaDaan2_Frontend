import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContributionBoard.css";
import Footer from "../Footer";

const ContributionBoard = () => {
  const [board, setBoard] = useState([]);

  const fetchBoard = () => {
    axios
      .get("https://anyadaan2-backend-1.onrender.com/api/contributions/board")
      .then((res) => setBoard(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBoard();
    const interval = setInterval(fetchBoard, 60000);
    return () => clearInterval(interval);
  }, []);

  const top3 = board.slice(0, 3);
  const rest = board.slice(3);

  return (<>
    <div className="CBpage">
      <div className="CBboard-page">
        <h2>TEAM LEADERBOARD</h2>

        {/* ========= TOP 3 CONTRIBUTORS ========= */}
        <div className="CBtop3">
          {top3.map((item, index) => (
            <div className="CBtop-card" key={index}>
              <div className="CBavatar" />
              <h3>{item.name}</h3>
              <p className="CBdesignation">{item.company_name}</p>
              <div className="CBamount">
                {item.total_donations} Donations
              </div>
            </div>
          ))}
        </div>

        {/* ========= LEADERBOARD LIST ========= */}
        <div className="CBtable">
          <div className="CBrow CBheader">
            <span>#</span>
            <span>Contributor</span>
            <span>Company</span>
            <span>Donations</span>
          </div>

          {rest.map((item, index) => (
            <div className="CBrow" key={index}>
              <span>{index + 4}</span>

              <div className="CBuser">
                {/* <div className="CBuser-avatar" /> */}
                <strong>{item.name}</strong>
              </div>

              <span className="CBmuted">{item.company_name}</span>
              <strong>{item.total_donations}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
      <Footer/>
</>
  );
};

export default ContributionBoard;
