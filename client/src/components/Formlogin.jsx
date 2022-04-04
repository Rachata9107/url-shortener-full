import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Form, Button } from "react-bootstrap";

function Formlogin() {
  const [userName, setuserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const urlLogin = "/api/users/login";

  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios.post(urlLogin, { userName, userPassword }).then(({ data }) => {
      data.state
        ? swal({
          title: "Login successful",
          text: " ",
          icon: "success",
          button: false,
          timer: 1000,
        }).then(() => {
          window.location =
            data.level === "admin" ? "/shortener/admin" : "/shortener/users";
        })
        : swal({
          title: "Oops!",
          text: "user or password incorrect!",
          icon: "error",
          button: false,
          timer: 1000,
        });
    });
  };

  return (
    <Form
      className="main-form-login p-3"
      align="start"
      onSubmit={onHandleSubmit}
    >
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>User or Email</Form.Label>
        <Form.Control
          onChange={(e) => setuserName(e.target.value)}
          type="users"
          placeholder="Enter email or username"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setUserPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button type="submit" value="Submit" variant="primary">
        Sign In
      </Button>
    </Form>
  );
}

export default Formlogin;
