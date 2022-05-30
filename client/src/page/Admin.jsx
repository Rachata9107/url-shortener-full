import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import swal from "sweetalert";

import Listmodal from "../components/Listmodal";

function Admin() {
  const [usersAll, setUersAll] = useState([]);
  const [infoModal, setInfoModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const url_all = "/api/users/all";
  const url_chk_session = "/api/users/chk-session";

  const fetchUsers = () => {
    axios
      .get(url_all)
      .then(({ data }) => {
        setUersAll(data.results);
      })
      .catch((err) => console.error(err));
  };

  const onChkSession = () => {
    axios.get(url_chk_session).then(({ data }) => {
      if (data.level !== "admin" && !data.state) {
        window.location = "/";
      }
    });
  };

  const onHandleDelete = (id) => {
    const url_edit = `/api/users/delete-user?id=${id}`;
    swal({
      title: "Are you sure?",
      text: " ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((state) => {
      if (state) {
        axios.delete(url_edit).then(({ data }) =>
          data.state
            ? swal("Deleted!", {
                icon: "success",
                buttons: false,
                timer: 1000,
              }).then(() => fetchUsers())
            : swal("Something went wrong!", {
                icon: "error",
                buttons: false,
                timer: 1000,
              })
        );
      }
    });
  };

  const onHandleMore = (e) => {
    setInfoModal(e);
    setModalShow(true);
    const url_list = `/api/info/url-shorte?user=${e}`;
    axios
      .get(url_list)
      .then(({ data }) => setUrlList(data.results))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => fetchUsers(), 500);
    onChkSession();
  }, []);

  return (
    <div className="main-admin-page">
      <Table striped bordered hover variant="dark" responsive="sm" size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Level</th>
            <th>Registration Date</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {usersAll.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.user}</td>
              <td>{e.email}</td>
              <td>{e.level}</td>
              <td>{e.datetime.slice(0, 10)}</td>
              <td className="admin-manage-btn">
                <Button onClick={() => onHandleMore(e.user)} size="sm" variant="info" disabled={e.level === "admin"}>
                  More
                </Button>
                <Button onClick={() => onHandleDelete(e.id)} size="sm" variant="danger" disabled={e.level === "admin"}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Listmodal show={modalShow} onHide={() => setModalShow(false)} urllist={urlList} user={infoModal} />
    </div>
  );
}

export default Admin;
