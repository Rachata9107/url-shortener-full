import React from "react";
import { Modal } from "react-bootstrap";

function Listmodal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.user}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "23rem", overflow: "auto" }}>
        {props.urllist.map((e, i) => (
          <ul className="main-list-item" key={i}>
            <li>
              <h6>{e.title ? e.title : "-"}</h6>
              <a href={e.urlLong} target="_blank">
                {e.urlLong}
              </a>
              <a href={e.urlShorte} target="_blank">
                {e.urlShorte}
              </a>
            </li>
          </ul>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default Listmodal;
