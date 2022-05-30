import React, { useEffect, useState } from "react";
import axios from "axios";

import Createmodal from "../components/Createmodal";
import Urllist from "../components/Urllist";
import { Button } from "react-bootstrap";

function Users() {
  const [urlList, setUrlList] = useState([]);
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  // const url_list = `/api/info/url-shorte?user=${user}`;
  const url_chk_session = "/api/users/chk-session";

  const onChkSession = new Promise((resolve, reject) => {
    axios.get(url_chk_session).then(({ data }) => {
      if (data.level !== "user" && !data.state) {
        window.location = "/";
      }
      setUser(data.user);
      resolve(data.user);
    });
  });

  const fetchList = () => {
    onChkSession.then((e) => {
      const url_list = `/api/info/url-shorte?user=${e}`;
      axios
        .get(url_list)
        .then(({ data }) => setUrlList(data.results))
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    setTimeout(() => fetchList(), 100);
  }, []);

  const buttonStyle = { width: "100%", border: "0.2rem solid black", backgroundColor: "orange", color: "black" };

  return (
    <div className="main-users">
      <Button onClick={() => setShow(true)} style={buttonStyle} size="lg">
        Create Short URL
      </Button>
      <Urllist urllist={urlList} newfetch={fetchList} />
      <Createmodal
        show={show}
        onHide={() => {
          setShow(false);
          fetchList();
        }}
        user={user}
      />
    </div>
  );
}

export default Users;
