import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import swal from "sweetalert";

function Createurl(props) {
  const [urlLong, setUrlLong] = useState("");
  const onHandleSubmit = (e) => {
    e.preventDefault();
    swal({
      text: "Add a title.",
      content: "input",
    }).then((input) => {
      props.urllong({ urlLong, urlTitle: input });
      setUrlLong("");
    });
  };
  return (
    <Form className="main-create-url">
      <FormControl
        onChange={(e) => setUrlLong(e.target.value)}
        type="url"
        placeholder="http://rct-dev.com/"
        className="me-2"
        aria-label="text"
        value={urlLong}
        required
      />
      <Button
        onClick={onHandleSubmit}
        style={{ width: "9rem" }}
        // type="submit"
        variant="outline-success"
      >
        Create URL
      </Button>
    </Form>
  );
}

export default Createurl;
