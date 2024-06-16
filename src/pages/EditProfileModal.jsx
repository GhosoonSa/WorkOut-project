// EditProfileModal.js
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function EditProfileModal({
  show,
  handleClose,
  handleSubmit,
  editData,
  handleInputChange,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formImg">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={editData.img}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCv">
            <Form.Label>CV</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="cv"
              value={editData.cv}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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

export default EditProfileModal;
