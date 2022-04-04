import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";

function Formregis() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRePassword, setUserRePassword] = useState("");
  const [massage, setMassage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const onHandleChange = () => {
    if (userName || userEmail) {
      const url_chk = "/api/users/chk-user";
      axios.post(url_chk, { userName, userEmail }).then(({ data }) => {
        if (data.state) {
          if (
            userPassword === userRePassword &&
            userPassword &&
            userRePassword
          ) {
            setMassage("can register now.");
            setDisableSubmit(true);
          } else {
            setMassage("Passwords do not match.");
            setDisableSubmit(false);
          }
        } else {
          setMassage(data.massage);
          setDisableSubmit(false);
        }
      });
    } else {
      setMassage("Please fill out the information for registration.");
    }
  };

  const onHandleSubmit = (e) => {
    const url_add = "/api/users/add-user";
    e.preventDefault();
    axios
      .post(url_add, { userName, userEmail, userPassword, userLavel: "user" })
      .then(({ data }) => {
        if (data.state) {
          swal({
            title: "Successful registration!",
            text: " ",
            icon: "success",
            button: false,
            timer: 1000,
          }).then(() => {
            setUserName("");
            setUserEmail("");
            setUserPassword("");
            setUserRePassword("");
          });
        } else {
          swal({
            title: "Oops!",
            text: "Something went wrong!",
            icon: "error",
            button: false,
            timer: 1000,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setTimeout(() => onHandleChange(), 500);
  }, [userName, userEmail, userPassword, userRePassword]);

  return (
    <Form
      className="main-form-login p-3"
      align="start"
      onSubmit={onHandleSubmit}
    >
      <Form.Label>Create Account</Form.Label>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Control
          onChange={(e) => setUserEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          value={userEmail}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUser">
        <Form.Control
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Your Username"
          value={userName}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          onChange={(e) => setUserPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={userPassword}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRePassword">
        <Form.Control
          onChange={(e) => setUserRePassword(e.target.value)}
          type="password"
          placeholder="Repeat your Password"
          value={userRePassword}
          required
        />
      </Form.Group>
      <Button
        className="me-2"
        variant="primary"
        type="submit"
        value="Submit"
        disabled={!disableSubmit}
      >
        Sign Up
      </Button>
      <Form.Label className="me-3">{massage}</Form.Label>
    </Form>
  );
}

export default Formregis;
