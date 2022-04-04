import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";

function Createmodal(props) {
  const user = props.user;
  const [title, setTitle] = useState("");
  const [urlLong, setUrlLong] = useState("");

  const onHandleCreate = () => {
    const url_create = "/api/info/url-shorte";
    axios
      .post(url_create, { user, urlTitle: title, urlLong })
      .then(({ data }) => {
        data.state
          ? swal("URL generated successfully!", {
            icon: "success",
            buttons: false,
            timer: 1000,
          }).then(() => {
            setTitle("");
            setUrlLong("");
            props.onHide();
          })
          : swal("Something went wrong!", {
            icon: "error",
            buttons: false,
            timer: 1000,
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Create Short URL</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            size="lg"
            type="text"
            placeholder="Title"
            required
          />
          <br />
          <Form.Control
            onChange={(e) => setUrlLong(e.target.value)}
            size="lg"
            type="text"
            placeholder="Enter your Long URL."
            required
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="secondary"
          onClick={onHandleCreate}
          disabled={urlLong == ""}
        >
          Create URL
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Createmodal;
