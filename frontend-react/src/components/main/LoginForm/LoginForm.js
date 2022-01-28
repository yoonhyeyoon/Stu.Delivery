import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { login } from "../../../utils/api";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import SocialLogin from "./SocialLogin";

function LoginForm() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    /* 이메일 규칙의 정규식 표현 */
    login(inputId, inputPw);
  };

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  //   useEffect(
  //     () => {
  //       axios
  //         .get("/user_inform/login")
  //         .then((res) => console.log(res))
  //         .catch();
  //     },
  //     // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  //     []
  //   );

  return (
    <div>
      <Container className={styles.box}>
        <Form className={styles.form}>
          <h5>로그인</h5>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="text"
                name="input_id"
                value={inputId}
                onChange={handleInputId}
                placeholder="이메일 형식의 아이디를 입력해주세요."
              />
            </Col>
          </Form.Group>
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
              className={styles.submit}
              className="text-white"
              variant="warning"
              type="submit"
            >
              로그인
            </Button>
          </div>
          <SocialLogin />
        </Form>
      </Container>
    </div>
  );
}

export default LoginForm;
