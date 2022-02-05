import React, { useState } from "react";
import styles from "./CheckPwd.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const CheckPwd = () => {
  const [inputPw, setInputPw] = useState();

  const check = () => {};

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  return (
    <div className="container">
      <Container className={styles.box}>
        <Form className={styles.form}>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="password"
                name="input_pw"
                value={inputPw}
                onChange={handleInputPw}
                placeholder="비밀번호를 입력해주세요."
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
        </Form>
      </Container>
    </div>
  );
};

export default CheckPwd;
