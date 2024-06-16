import React, { useEffect, useState } from "react";
import "../styling/Profile.css";
import axios from "axios";
import EditProfileModal from "./EditProfileModal";

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    img: "",
    name: "",
    email: "",
    cv: "",
  });

  useEffect(() => {
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(""); // Replace with your API endpoint
        setUserData(response.data);
        setEditData(response.data); // Initialize editData with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editProfile = () => {
    setIsEditing(true);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(""); // Replace with your API endpoint
      setUserData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <>
      <section id="profile">
        <div>
          <img className="pro-img" src={userData.img} alt="profile" />
        </div>
        <div className="pro-name">
          <p>name: {userData.name}</p>
        </div>
        <div className="pro-email">
          <p>email: {userData.email}</p>
        </div>
        <div className="pro-cv">
          <p>CV: {userData.cv}</p>
        </div>
        <div className="row">
          <div className="col-lg-1 pro-goback">
            <button type="button" className="btn">
              <a href="./HomePageAfter">Go back</a>
            </button>
          </div>
          <div className="col-lg-1 pro-edit">
            <button type="button" className="btn" onClick={editProfile}>
              Edit
            </button>
          </div>
        </div>
      </section>

      <EditProfileModal
        show={isEditing}
        handleClose={() => setIsEditing(false)}
        handleSubmit={saveProfile}
        editData={editData}
        handleInputChange={handleInputChange}
      />
    </>
  );
}

export default Profile;
