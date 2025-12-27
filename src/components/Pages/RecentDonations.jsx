import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentDonations.css";
import Footer from "../Footer";

const RecentDonations = () => {
  const [donations, setDonations] = useState([]);
  const [acceptingId, setAcceptingId] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");



  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    axios
      .get("http://127.0.0.1:8000/api/donations/recent/")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error(err));
  };
  
  //   const handleAccept = (id) => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     alert("Please log in to accept contributions.");
  //     return;
  //   }

  //   axios
  //     .patch(
  //       `http://127.0.0.1:8000/api/donations/${id}/accept/`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       fetchDonations();
  //     })
  //     .catch((err) => { 
  //       console.error(err);
  //       if (err.response?.status === 401) {
  //         alert("Unauthorized. Please log in again.");
  //       } else if (err.response?.status === 403) {
  //         alert("Forbidden. You do not have permission to accept this donation.");
  //       } else {
  //         alert("An error occurred. Please try again.");
  //       }
  //     });
  // };
  const handleAcceptClick = (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in to accept contributions.");
      return;
    }

    setAcceptingId(id); 
  };
  const handleAcceptSubmit = (e, id) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in again.");
      return;
    }

    axios
      .patch(
        `http://127.0.0.1:8000/api/donations/${id}/accept/`,
        {
          message_to_donor: submitMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAcceptingId(null);
        setSubmitMessage("");
        fetchDonations();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to accept donation.");
      });
  };


  // const handleDelete = (id) => {
  //   if (!window.confirm("Are you sure you want to delete this donation?")) return;

  //   axios
  //     .delete(`http://127.0.0.1:8000/api/donations/${id}/delete/`)
  //     .then(() => {
  //       setDonations((prev) => prev.filter((item) => item.id !== id));
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <>
      <div className="page">
        <div className="recent-wrapper">
          <h2>Contributions in Last 24 Hours</h2>

          {donations.length === 0 && (
            <p>No contributions in the last 24 hours.</p>
          )}

          {donations.map((item) => (
            <div className="donation-card" key={item.id}>
              <h3>{item.name}</h3>
              <p><b>Type:</b> {item.contributionType}</p>
              <p><b>Description:</b> {item.description}</p>
              <p><b>Message:</b> {item.message}</p>

              <p className="time">
                ⏰ {new Date(item.created_at).toLocaleString()}
              </p>

              <div className="action-buttons">
                {/* <button
                  className="accept-btn"
                  disabled={item.status === "accepted"}
                  onClick={() => handleAccept(item.id)}
                >
                  {item.status === "accepted" ? "Accepted" : "Accept"}
                </button> */}
                <button
                  className="accept-btn"
                  disabled={item.status === "accepted"}
                  onClick={() => handleAcceptClick(item.id)}
                >
                  {item.status === "accepted" ? "Accepted" : "Accept"}
                </button>
                {acceptingId === item.id && (
                  <div className="messageBox">
                    <form onSubmit={(e) => handleAcceptSubmit(e, item.id)}>
                      <label>Message to Donor</label>

                      <textarea
                        required
                        placeholder="Write a message you want to send to donor"
                        value={submitMessage}
                        onChange={(e) => setSubmitMessage(e.target.value)}
                      />

                      <div className="Mform-actions">
                        <button type="submit">Send & Accept</button>
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={() => setAcceptingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}


                {item.status === "accepted" && (
                  <p className="accepted-text">
                    ✅ This order is accepted by the company <b>{item.company_name}</b>
                  </p>
                )}


                {/* <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecentDonations;
