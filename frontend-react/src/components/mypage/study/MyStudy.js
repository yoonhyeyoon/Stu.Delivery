import React, { useState } from "react";
import axios from "axios";
import styles from "./MyStudy.module.css";
import dayjs from "dayjs";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Typography,
  Modal,
  Button,
  Stack,
  Box,
  TextField,
  Container,
  Switch,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";

// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MyStudy = () => {
  const [title, setTitle] = useState(""); // 스터디명
  const [category, setCategory] = useState([]); // 카테고리
  const [date, setDate] = useState([null, null]);
  const [password, setPassword] = useState(""); // 스터디 비밀번호
  const [url, setUrl] = useState("https://i6d201.p.ssafy.io/study"); // 스터디 URL
  const [thumbnail, setThumbnail] = useState(""); // 썸네일

  // control details modal
  const [detailOpen, setDetailOpen] = useState(false);
  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose = () => setDetailOpen(false);

  // control thumbnail nodal
  const [thumbnailOpen, setThumbnailOpen] = useState(false);
  const handleThumbnailOpen = () => setThumbnailOpen(true);
  const handleThumbnailClose = () => setThumbnailOpen(false);

  // 스터디 공개 여부
  const [isPrivate, setIsPrivate] = useState(false);
  const handlePrivate = (event) => {
    setIsPrivate(event.target.checked);
    console.log(isPrivate);
  };

  let startDateKor = "";

  const setKoreanDate = () => {
    startDateKor = dayjs(date[0]).format("YYYY-MM-DD");
    console.log(startDateKor);
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

  const theme = createTheme();

  const onTitleHandler = (event) => {
    const input = event.target.value;
    setTitle(input);
  };

  const onCategoryHandler = (event) => {
    const input = event.target.value;
    setCategory([...category, input]);
  };

  const submit = () => {
    console.log("submit!");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
            <Typography component="h1" variant="h4" gutterBottom>
              스터디 만들기
            </Typography>
            <Box onSubmit={submit} noValidate sx={{ mt: 1, width: "auto" }}>
              <FormLabel component="legend" sx={{ color: "text.primary" }}>
                스터디 이름
              </FormLabel>
              <TextField
                margin="dense"
                required
                fullWidth
                id="title"
                label="스터디 이름을 입력해주세요."
                name="title"
                autoFocus
                sx={{ mb: 5 }}
                onChange={onTitleHandler}
              />
              <FormLabel component="legend" sx={{ color: "text.primary" }}>
                스터디 일정
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} sx={{ mb: 5 }} alignItems="center">
                  <DesktopDateRangePicker
                    fullWidth
                    startText="스터디 시작일"
                    endText="스터디 종료일"
                    value={date}
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    onChange={(newDate) => {
                      setDate(newDate);
                      console.log(date);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField fullwidth {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField fullwidth {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </Stack>
              </LocalizationProvider>
              <FormLabel component="legend" sx={{ color: "text.primary" }}>
                카테고리
              </FormLabel>
              <TextField
                margin="dense"
                fullWidth
                name="category"
                label="카테고리"
                id="password"
                autoComplete="current-password"
                sx={{ mb: 5 }}
              />
              <FormLabel component="legend" sx={{ color: "text.primary" }}>
                소개글
              </FormLabel>
              <TextField
                id="outlined-multiline-static"
                margin="dense"
                fullWidth
                name="introduce"
                label="소개글"
                multiline
                rows={4}
                type="password"
                autoComplete="current-password"
                sx={{ mb: 5 }}
              />
              <FormLabel component="legend" sx={{ color: "text.primary" }}>
                미리보기
              </FormLabel>
              <Box
                component="div"
                sx={{
                  mt: 1,
                  mb: 2,
                  width: "auto",
                  alignItems: "center",
                  border: 1,
                  borderRadius: 2,
                }}
              >
                <Typography
                  component="h1"
                  variant="h6"
                  gutterBottom
                  textAlign="center"
                  marginTop={2}
                  marginBottom={5}
                >
                  스터디 만들기
                </Typography>
                <Container maxWidth="sm" sx={{ mb: 5 }}>
                  <Typography>{"스터디명: " + title}</Typography>
                  <Typography>{"시작일: "}</Typography>
                  <Typography>{"일정: "}</Typography>
                  <Typography>{"카테고리: "}</Typography>
                  <Typography>{"스터디장: "}</Typography>
                  <Typography>소개글</Typography>
                  <Typography>
                    {"어떻게 언어 이름이 엄준식이냐 ㄹㅇㅋㅋ"}
                  </Typography>
                </Container>
              </Box>
              <Stack spacing={2} direction="row">
                <Button onClick={handleDetailOpen}>세부 설정</Button>
                <Button onClick={handleThumbnailOpen}>썸네일 업로드</Button>
              </Stack>
              <Modal
                className="details"
                open={detailOpen}
                onClose={handleDetailClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Stack spacing={5}>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                      margin="normal"
                    >
                      세부설정
                    </Typography>
                    <Container maxWidth="sm">
                      <Stack spacing={5}>
                        <Stack spacing={1}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            공개 설정
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>비공개</Typography>
                            <Switch
                              checked={isPrivate}
                              onChange={handlePrivate}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </Stack>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            비밀번호 설정
                          </Typography>
                          <TextField
                            margin="normal"
                            type="password"
                            label="비밀번호를 입력해주세요"
                            variant="outlined"
                          />
                        </Stack>
                        <Stack spacing={1}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            URL 설정
                          </Typography>
                          <TextField
                            margin="normal"
                            label="만들고 싶은 URL을 입력해주세요"
                            variant="outlined"
                          />
                        </Stack>
                        <Button onClick={handleDetailClose}>확인</Button>
                      </Stack>
                    </Container>
                  </Stack>
                </Box>
              </Modal>
              <Modal
                className="thumbnail"
                open={thumbnailOpen}
                onClose={handleThumbnailClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Stack spacing={5}>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                      margin="normal"
                    >
                      세부설정
                    </Typography>
                    <Container maxWidth="sm">
                      <Stack spacing={5}>
                        <Button>썸네일 업로드</Button>
                        <Button onClick={handleThumbnailClose}>확인</Button>
                      </Stack>
                    </Container>
                  </Stack>
                </Box>
              </Modal>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ background: "rgba(191, 122, 38, 0.7)" }}
                sx={{ mt: 3, mb: 2 }}
              >
                확인
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default MyStudy;
