import React from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

function Manage(props) {
  const { info } = props;
  const onHandleCopy = () => {
    swal({
      title: "Copied!",
      text: " ",
      icon: "success",
      button: false,
      timer: 1000,
    });
    navigator.clipboard.writeText(info.urlShorte);
  };

  const onHandleEdit = () => {
    const url_edit = `/api/info/url-shorte?id=${info.id}`;
    swal({
      text: "Edit your long URL.",
      content: "input",
    }).then((input) => {
      if (input) {
        axios.put(url_edit, { urlLong: input }).then(({ data }) =>
          data.state
            ? swal({
              title: "Edited",
              text: " ",
              icon: "success",
              button: false,
              timer: 1000,
            }).then(() => props.newfetch())
            : swal("Something went wrong!", {
              icon: "error",
              buttons: false,
              timer: 1000,
            })
        );
      }
    });
  };

  const onHandleDelete = () => {
    const url_edit = `/api/info/url-shorte?id=${info.id}`;
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
            ? swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
              buttons: false,
              timer: 1000,
            }).then(() => props.newfetch())
            : swal("Something went wrong!", {
              icon: "error",
              buttons: false,
              timer: 1000,
            })
        );
      }
    });
  };

  return (
    <div className="btn-manage">
      <Button
        onClick={onHandleCopy}
        as="input"
        variant="info"
        type="button"
        value="Copy"
      />
      <Button
        onClick={onHandleEdit}
        as="input"
        variant="warning"
        type="button"
        value="Edit"
      />
      <Button
        onClick={onHandleDelete}
        as="input"
        variant="danger"
        type="button"
        value="Delete"
      />
    </div>
  );
}

function Urllist(props) {
  const { urllist } = props;
  return (
    <Card className="card-list">
      {urllist.map((e, i) => (
        <ul className="main-list-item" key={i}>
          <li>
            <h6>{e.title ? e.title : "-"}</h6>
            <a href={e.urlLong} target="_blank">
              {e.urlLong}
            </a>
            <a href={e.urlShorte} target="_blank">
              {e.urlShorte}
            </a>
            <Manage info={e} newfetch={() => props.newfetch()} />
          </li>
        </ul>
      ))}
    </Card>
  );
}

export default Urllist;
