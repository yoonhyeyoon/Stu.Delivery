import React, { useState, useRef } from "react";
import Datepicker from "react-datepicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./Update.css";
import styles from "./Update.module.css";

const Update = () => {
  const [img, setImg] = useState(""); // 프로필 사진
  const [previewUrl, setPreviewUrl] = useState(""); // 프로필 사진 URL
  const [nickname, setNickname] = useState(""); // 닉네임
  const [birthday, setBirthday] = useState(""); // 생년월일
  const [interest, setInterest] = useState(""); // 관심사
  const [aspire, setAspire] = useState(""); // 나의 한마디
  const imgInput = useRef();

  const [isName, setIsName] = useState(true);
  const [nameMessage, setNameMessage] = useState(
    "2글자 이상 6글자 이하로 입력해주세요."
  );

  const [open, setOpen] = useState(false); // modal창 띄우는 용도

  const onImgChange = async (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImg(file);
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onImgButtonClick = () => {
    imgInput.current.click();
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

  const onBirthdayHandler = (event) => {
    setBirthday(event.target.value);
  };

  const onInterestHandler = (event) => {
    const currentInterest = event.target.value;
    setInterest(currentInterest);
  };

  const onAspireHandler = (event) => {
    const currentAspire = event.target.value;
    setAspire(currentAspire);
  };

  const onSubmit = () => {
    console.log("submit!");
  };

  return (
    <Container>
      <h2 className="title">회원정보수정</h2>
      <div className="container-group">
        <div className="profilePic">
          <input
            type="file"
            accept="image/*"
            className="profile_img"
            name="profile_img"
            ref={imgInput}
            onChange={onImgChange}
          />
          <button type="button" onClick={onImgButtonClick}>
            프로필 사진 선택
          </button>
          {img !== "" ? (
            <img className="profile_preview" src={previewUrl} alt="profile" />
          ) : null}
        </div>
      </div>
      <Form onSubmit={onSubmit} className={styles.form}>
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
        <Form.Group as={Row} className="mb-3">
          <Col sm>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="생년월일"
                value={birthday}
                minDate={new Date("1900-01-01")}
                inputFormat={"yyyy-MM-dd"}
                mask={"____-__-__"}
                onChange={(newValue) => {
                  setBirthday(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm>
            <Form.Control
              type="text"
              placeholder="관심사"
              value={interest}
              onChange={onInterestHandler}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm>
            <Form.Control
              type="text"
              placeholder="나의 한마디"
              value={aspire}
              onChange={onAspireHandler}
            />
          </Col>
        </Form.Group>
        <div className="d-grid gap-1">
          <Button
            className={`${styles.submit} text_white`}
            variant="warning"
            type="submit"
          >
            프로필 변경 완료
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Update;
