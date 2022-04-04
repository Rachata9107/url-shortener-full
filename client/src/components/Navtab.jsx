import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function Navtab() {
  const [user, setUser] = useState("");
  const [level, setlevel] = useState("");
  const url_logout = "/api/users/logout";
  const url_chk_session = "/api/users/chk-session";

  const onHandleLogout = () => {
    axios.get(url_logout).then(() => {
      window.location = "/shortener/";
    });
  };

  const onClickName = () => {
    if (level === "admin") {
      window.location = "/shortener/admin";
    } else {
      window.location = "/shortener/users";
    }
  };

  const onChkSession = () => {
    axios.get(url_chk_session).then(({ data }) => {
      setUser(data.user);
      setlevel(data.level);
    });
  };

  useEffect(() => {
    onChkSession();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/shortener/">URL Shortener</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Nav.Link onClick={onClickName}>{user}</Nav.Link>
            <Nav.Link onClick={onHandleLogout} disabled={!user}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navtab;
