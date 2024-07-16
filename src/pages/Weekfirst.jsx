import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function Weekfirst({ show, onClose, token }) {
  const [points, setPoints] = useState("");
  const [selectedFile, setSelectedFile] = useState({
    image: "",
  });
  const [exercises, setExercises] = useState([]);
  const [challengeLevel, setChallengeLevel] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [muscle, setMuscle] = useState();
  const navigate = useNavigate();
  const formData = new FormData();

  useEffect(() => {
    console.log("Received token: ", token);
  }, [token]);

  useEffect(() => {
    // fetch exercises
    const fetchExercises = async () => {
      try {
        console.log("token before get exercises " + token);
        const response = await axios.get(
          "http://localhost:8000/api/trainer/getAllExercises",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + token,
            },
          }
        );
        console.log("response " + response);
        // console.log("response " + JSON.stringify(response.data, null, 2));
        setExercises(response.data);
        console.log("exercises " + exercises);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchExercises();
  }, [token]);

  const handleExerciseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add exercise to selectedExercises
      setSelectedExercises([...selectedExercises, value]);
      console.log("selected exercise: " + selectedExercises);
    } else {
      // Remove exercise from selectedExercises
      setSelectedExercises(
        selectedExercises.filter((exercise) => exercise !== value)
      );
    }
  };

  const handleFileChange = (e) => {
    console.log("File selected: ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleLevelChange = (e) => {
    setChallengeLevel(e.target.value);
    console.log("level " + challengeLevel);
  };

  const handleMuscleChange = (e) => {
    setMuscle(e.target.value);
    console.log("muscle " + muscle);
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("points", points);
    formData.append("challengeLevel", challengeLevel);
    formData.append("selectedExercises", JSON.stringify(selectedExercises));
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log("i am saving new data ");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/trainer/addChallenge",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ` + token,
          },
        }
      );
      console.log("response" + response.message);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const next = () => {
    navigate("/Weeksecond", { status: { formData, token } });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>First Week</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveProfile}>
          <Form.Group controlId="formFile">
            <Form.Label>Choose an image as challange profile/icon</Form.Label>
            <Form.Control type="file" name="img" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group controlId="formPoints">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              name="points"
              onChange={(e) => setPoints(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMuscle">
            {/* <Dropdown
              label="CHOOSE A MUSCLE"
              options={[
                { label: "abs", value: "abs" },
                { label: "chest", value: "chest" },
                { label: "arm", value: "arm" },
                { label: "leg", value: "leg" },
                { label: "shoulder and back", value: "shoulder and back" },
              ]}
              value={muscle}
              onChange={handleMuscleChange}
            /> */}
            <Form.Label>choose a muscle</Form.Label>
            <Form.Control as="select" onChange={handleMuscleChange}>
              <option value="">Select a muscle</option>
              <option value="abs">abs</option>
              <option value="chest">chest</option>
              <option value="">arm</option>
              <option value="leg">leg</option>
              <option value="shoulderAndBack">shoulder and back</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formChallengeLevel">
            <Form.Label>Challenge Level</Form.Label>
            <Form.Control as="select" onChange={handleLevelChange}>
              <option value="">Select a level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formExercises">
            <Form.Label>Choose first week exercises (up to 7):</Form.Label>
            <div className="exercise-checkboxes">
              {/* {exercises.map((exercise) => ( */}
              <div key={exercises.id} className="exercise-item">
                <Form.Check
                  type="checkbox"
                  label={exercises.name}
                  value={exercises.id}
                  onChange={handleExerciseChange}
                  disabled={
                    selectedExercises.length >= 7 &&
                    !selectedExercises.includes(exercises.id)
                  }
                />
                <img
                  className="col-lg-2"
                  src={exercises.image}
                  alt={exercises.name}
                  width="50"
                  height="50"
                />
                <p className="col-lg-2">{exercises.description}</p>
                <p className="col-lg-2">Calories: {exercises.calories}</p>
              </div>
              {/* ))} */}
            </div>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="info" type="submit" onClick={next}>
              Next
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Weekfirst;
