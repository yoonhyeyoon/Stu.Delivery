import React, { useState } from "react";
import axios from "axios";
import styles from "./CheckPwd.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { setHeader } from "../../../../utils/api";
import { TextField } from "@mui/material";

const CheckPwd = () => {
  const [inputPw, setInputPw] = useState();

  const check = () => {
    axios({
      method: "post",
      url: "https://i6d201.p.ssafy.io/api/v1/users/password-valid",
      headers: setHeader(),
      data: {
        password: inputPw,
      },
    })
      .then((response) => {
        localStorage.setItem("is_authenticated", true);
        window.location.href = "/mypage/update";
      })
      .catch((e) => {
        alert("비밀번호를 다시 입력해주세요.");
        console.log(e.response);
      });
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  return (
    <div className="container">
      <Container className={styles.box}>
        <Container className={styles.form}>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <TextField
                type="password"
                label="비밀번호를 입력해주세요."
                required
                fullWidth
                onChange={handleInputPw}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("enter!");
                    check();
                  }
                }}
              />
            </Col>
          </Form.Group>
          <div className="d-grid gap-1">
            <Button
              className={`${styles.submit} text-white`}
              variant="warning"
              onClick={check}
            >
              비밀번호 확인
            </Button>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default CheckPwd;
