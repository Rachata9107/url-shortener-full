import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Formlogin from "../components/Formlogin";
import Formregis from "../components/Formregis";

function Login() {
  const navigate = useNavigate();
  const url_chk_session = "/api/users/chk-session";
  const chkAuth = () => {
    axios(url_chk_session).then(({ data }) => {
      if (data.level === "admin") navigate("/admin");
      if (data.level === "user") navigate("/users");
    });
  };

  useEffect(() => chkAuth(), []);
  return (
    <div className="main-login-page">
      <Formlogin />
      <Formregis />
    </div>
  );
}

export default Login;
