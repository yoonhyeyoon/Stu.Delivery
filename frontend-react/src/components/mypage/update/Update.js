import React, { useState, useRef } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormLabel,
  Stack,
  Avatar,
  Grid,
  Modal,
  Button,
} from "@mui/material";

import { setHeader } from "../../../utils/api";
import axios from "axios";
import CheckPwd from "./checkpwd/CheckPwd";

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
  const [pwdMsg1, setPwdMsg1] = useState("");
  const [pwdMsg2, setPwdMsg2] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [pwdCheck, setPwdCheck] = useState(false);

  const [open, setOpen] = useState(false); // modal창 띄우는 용도

  const [curPassword, setCurPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCurPassword = (event) => {
    setCurPassword(event.target.value);
  };

  const handlePassword1 = (event) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const curPwd = event.target.value;
    setPassword1(curPwd);

    if (!passwordRegex.test(curPwd)) {
      setPwdMsg1(
        "숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하를 입력해주세요."
      );
      setIsValid(false);
    } else {
      setPwdMsg1("");
      setIsValid(true);
    }
  };

  const handlePassword2 = (event) => {
    const pwd2 = event.target.value;
    setPassword2(pwd2);

    if (pwd2 !== password1) {
      setPwdMsg2("비밀번호가 일치하지 않습니다.");
      setPwdCheck(false);
    } else {
      setPwdMsg2("");
      setPwdCheck(true);
    }
  };

  const changePassword = () => {
    if (isValid && pwdCheck) {
      axios({
        method: "patch",
        url: "https://i6d201.p.ssafy.io/api/v1/users/password",
        headers: setHeader(),
        data: {
          cur: curPassword,
          password: password1,
        },
      })
        .then((response) => {
          alert(response.data.message);
          handleClose();
        })
        .catch((e) => {
          alert(e.response);
        });
    } else if (isValid) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (pwdCheck) {
      alert("비밀번호 양식에 맞게 다시 입력해주세요.");
    }
  };

  const style = {
    // modal css
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    <Container fixed>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        fullWidth
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ mb: 5 }}
          textAlign="left"
        >
          회원정보수정
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 4, mb: 7 }}>
          <Grid item xs={4} md={1}>
            <input
              type="file"
              accept="image/*"
              className="profile_img"
              name="profile_img"
              ref={imgInput}
              onChange={onImgChange}
              style={{ display: "none" }}
            />
            <Avatar
              alt="Remy Sharp"
              src={previewUrl}
              sx={{ width: 56, height: 56 }}
              onClick={onImgButtonClick}
            />
          </Grid>
          <Grid item xs={4} md={9}>
            <Typography component="h6" variant="h6" gutterBottom>
              tenykim1109@kakao.com
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Button
              variant="contained"
              style={{
                background: "rgba(191, 122, 38, 0.7)",
                borderColor: "rgba(191, 122, 38, 0.7)",
              }}
              onClick={handleOpen}
            >
              비밀번호 변경
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={3} alignItems="center">
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                margin="normal"
                sx={{ mb: 3 }}
              >
                비밀번호 변경
              </Typography>
              <Stack spacing={1}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  현재 비밀번호
                </Typography>
                <TextField
                  margin="normal"
                  type="password"
                  label="비밀번호를 입력해주세요"
                  variant="outlined"
                  onChange={handleCurPassword}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  새 비밀번호
                </Typography>
                <TextField
                  margin="normal"
                  type="password"
                  label="비밀번호를 입력해주세요"
                  variant="outlined"
                  onChange={handlePassword1}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  비밀번호 확인
                </Typography>
                <TextField
                  margin="normal"
                  type="password"
                  label="비밀번호를 입력해주세요"
                  variant="outlined"
                  onChange={handlePassword2}
                />
              </Stack>
              <Button
                variant="contained"
                style={{
                  background: "rgba(191, 122, 38, 0.7)",
                  borderColor: "rgba(191, 122, 38, 0.7)",
                  color: "white",
                }}
                onClick={changePassword}
              >
                확인
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Box noValidate sx={{ mt: 1, width: "auto", alignItems: "center" }}>
          <FormLabel component="legend" sx={{ color: "text.primary" }}>
            닉네임
          </FormLabel>
          <TextField
            margin="dense"
            required
            fullWidth
            id="title"
            label="닉네임을 입력해주세요."
            name="title"
            sx={{ mb: 5 }}
            onChange={onNicknameHandler}
          />
          <FormLabel component="legend" sx={{ color: "text.primary", mb: 2 }}>
            생년월일
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ mb: 5 }}>
            <DatePicker
              label="생년월일을 선택해주세요."
              value={birthday}
              minDate={new Date("1900-01-01")}
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              onChange={(newValue) => {
                setBirthday(newValue);
              }}
              renderInput={(params) => <TextField sx={{ mb: 5 }} {...params} />}
            />
          </LocalizationProvider>
          <FormLabel component="legend" sx={{ color: "text.primary" }}>
            관심사
          </FormLabel>
          <TextField
            margin="dense"
            required
            fullWidth
            id="title"
            label="관심사를 입력해주세요."
            name="title"
            sx={{ mb: 5 }}
          />
          <FormLabel component="legend" sx={{ color: "text.primary" }}>
            나의 한마디
          </FormLabel>
          <TextField
            margin="dense"
            required
            fullWidth
            id="title"
            label="하고 싶은 말을 적어주세요."
            name="title"
            sx={{ mb: 5 }}
            onChange={onAspireHandler}
          />
        </Box>
        <Button
          variant="contained"
          style={{
            background: "rgba(191, 122, 38, 0.7)",
            borderColor: "rgba(191, 127, 38, 0.7)",
          }}
          sx={{ mt: 3, mb: 2 }}
        >
          프로필 변경
        </Button>
      </Box>

      {/* <h2 className="title">회원정보수정</h2>
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
      </Form> */}
    </Container>
  );
};

export default Update;
