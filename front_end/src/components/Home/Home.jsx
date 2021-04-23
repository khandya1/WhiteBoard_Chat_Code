import React, { useState } from "react";
import localclasses from "./Home.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [joinRoomModal, setJoinRoomModal] = useState(false);

  const handleCreateModalShow = () => setCreateRoomModal(true);
  const handleCreateModalClose = () => setCreateRoomModal(false);

  const handleJoinModalShow = () => setJoinRoomModal(true);
  const handleJoinModalClose = () => setJoinRoomModal(false);

  return (
    <div className={localclasses.home}>
      <Container fluid>
        <Row>
          <Col xs={12} md={8}></Col>
          <Col xs={12} md={3}>
            <Container className={localclasses.home__buttons}>
              <Row>
                <Button
                  block
                  style={{
                    backgroundColor: "#ffd500",
                    padding: "10px",
                    fontWeight: "800",
                    color: "#000a29",
                  }}
                  size="lg"
                  onClick={handleCreateModalShow}
                >
                  Create a room
                </Button>
              </Row>
              <br />
              <Row>
                <Button
                  block
                  style={{
                    backgroundColor: "#ffd500",
                    padding: "10px",
                    fontWeight: "800",
                    color: "#000a29",
                  }}
                  size="lg"
                  onClick={handleJoinModalShow}
                >
                  Join a room
                </Button>
              </Row>
            </Container>
            <Modal show={createRoomModal} onHide={handleCreateModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create a Room</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary">Save Changes</Button>
              </Modal.Footer>
            </Modal>
            <Modal show={joinRoomModal} onHide={handleJoinModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Join a room</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary">Save Changes</Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col xs={12} md={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
