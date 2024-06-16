import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/Trainers.css";
import Trainer from "./Trainer";

function Trainers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      level: "beginner",
      img: "./trainer1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      level: "intermediate",
      img: "./trainer1.jpg",
    },
    // Add more users as needed
  ]);
  const [selectedTrainer, setSelectedTrainer] = useState([
    {
      id: 1,
      name: "John Doe",
      level: "beginner",
      img: "https://example.com/john-doe.jpg",
      weight: "75kg",
      height: "180cm",
      email: "john@example.com",
      bmi: "3",
    },
    {
      id: 2,
      name: "Jane Smith",
      level: "intermediate",
      img: "https://example.com/jane-smith.jpg",
      weight: "65kg",
      height: "170cm",
      email: "jane@example.com",
      bmi: "44",
    },
  ]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://your-api-endpoint.com/users"); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleTrainerClick = async (trainer) => {
    try {
      const response = await axios.get(
        `https://your-api-endpoint.com/trainers/${trainer.id}`
      ); // Replace with your API endpoint
      setSelectedTrainer(response.data);
    } catch (error) {
      console.error("Error fetching trainer details:", error);
      setError("Error fetching trainer details.");
    }
  };
  const closeModal = () => {
    setSelectedTrainer(null);
  };

  const levels = ["beginner", "intermediate", "advanced"];

  return (
    <section id="trianers">
      <div className="coach-view-container">
        <h2>Trainers</h2>
        {levels.map((level) => (
          <div key={level} className="level-section">
            <h3>{level.charAt(0).toUpperCase() + level.slice(1)}</h3>
            <div className="users-container">
              {users
                .filter((user) => user.level === level)
                .map((user) => (
                  <div
                    key={user.id}
                    className="user-card"
                    onClick={() => handleTrainerClick(user)}
                  >
                    <img
                      src={user.img}
                      alt={`${user.name}'s profile`}
                      className="user-img"
                    />
                    <h4>{user.name}</h4>
                  </div>
                ))}
            </div>
          </div>
        ))}
        <Trainer
          show={!!selectedTrainer}
          onClose={closeModal}
          trainer={selectedTrainer}
        />
      </div>
    </section>
  );
}
export default Trainers;
