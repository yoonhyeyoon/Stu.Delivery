import React, { useState } from "react";
// import { insertMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Schedule.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddSchedule() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  return;
}
export default AddSchedule;
