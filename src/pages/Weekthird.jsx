import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

function Weekthird({ show, onClose }) {
  const location = useLocation();
  const { token } = location.state || {};
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate();

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

  const next = () => {
    const formData = new FormData();
    formData.append("selectedExercises", JSON.stringify(selectedExercises));
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    navigate("/Weekfinal", { status: { formData, token } });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>First Week</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
            <Button variant="primary" type="submit" onClick={next}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Weekthird;
