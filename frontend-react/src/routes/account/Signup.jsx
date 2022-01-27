import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { Link, NavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [nameMessage, setNameMessage] = useState(
    "2글자 이상 6글자 이하로 입력해주세요."
  );
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(
    "숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하를 입력해주세요."
  );
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const onEmailHandler = (event) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const onPasswordHandler = (event) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하를 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onConfirmPasswordHandler = (event) => {
    const confirmPasswordCurrent = event.target.value;
    setConfirmPassword(confirmPasswordCurrent);

    if (password === confirmPasswordCurrent) {
      setConfirmPasswordMessage("");
      setIsConfirmPassword(true);
    } else {
      setConfirmPasswordMessage("비밀번호가 일치하지 않습니다.");
      setIsConfirmPassword(false);
    }
  };

  const onNicknameHandler = (event) => {
    const nicknameCurrent = event.target.value;
    setNickname(nicknameCurrent);

    if (event.target.value.length < 2 || event.target.value.length >= 6) {
      setNameMessage("2글자 이상 6글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "https://i6d201.p.ssafy.io/api/api/v1/users",
      data: {
        id: email,
        password: password,
        nickname: nickname,
      },
    })
      .then((res) => {
        console.log(res);
        alert("회원가입이 완료되었습니다.");
      })
      .catch((err) => {
        console.log(err.response.data.statusCode);
        if (err.response.data.statusCode === 409) {
          setEmailMessage("이메일이 중복되었습니다.");
          setIsEmail(true);
        }
      });
  };

  return (
    <div>
      <Container>
        <Form onSubmit={onSubmit} className={styles.form}>
          <h5>회원가입</h5>

          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="email"
                placeholder="이메일"
                value={email}
                onChange={onEmailHandler}
              />
              {email.length > 0 && (
                <Form.Text className={isEmail ? styles.success : styles.error}>
                  {emailMessage}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onPasswordHandler}
              />
              <Form.Text className={isPassword ? styles.success : styles.error}>
                {passwordMessage}
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={onConfirmPasswordHandler}
              />
              {confirmPassword.length > 0 && (
                <Form.Text
                  className={isConfirmPassword ? styles.success : styles.error}
                >
                  {confirmPasswordMessage}
                </Form.Text>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={onNicknameHandler}
              />
              <Form.Text className={isName ? styles.success : styles.error}>
                {nameMessage}
              </Form.Text>
            </Col>
          </Form.Group>
          <div className="d-grid gap-1">
            <Button
              className={styles.submit}
              className="text-white"
              variant="warning"
              type="submit"
              disabled={!(isName && isEmail && isPassword && isConfirmPassword)}
            >
              회원가입
            </Button>
          </div>
        </Form>
      </Container>
      <NavLink to="/">back</NavLink>
    </div>
  );
}
export default Signup;
