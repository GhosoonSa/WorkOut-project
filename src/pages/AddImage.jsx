import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function AddImage({ show, onClose, token }) {
  const [selectedFile, setSelectedFile] = useState({
    image: "",
  });

  useEffect(() => {
    console.log("Received token: ", token);
  }, [token]);

  const handleFileChange = (e) => {
    console.log("File selected: ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log("i am saving new data ");
    try {
      await axios.post(
        "http://localhost:8000/api/trainer/add_user_profile_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ` + token,
          },
        }
      );
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add profiel image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveProfile}>
          <Form.Group controlId="formFile">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="img" onChange={handleFileChange} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddImage;
