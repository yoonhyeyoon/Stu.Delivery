import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { setHeader } from "../../../utils/api";
import dayjs from "dayjs";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Autocomplete,
  CssBaseline,
  Typography,
  Modal,
  Button,
  Stack,
  Box,
  TextField,
  Container,
  Switch,
  FormLabel,
} from "@mui/material";

const CreateStudy = () => {
  const [title, setTitle] = useState(""); // 스터디명
  const [category, setCategory] = useState([]); // 카테고리
  const [categoryList, setCategoryList] = useState([]); // 서버에서 받아온 카테고리 목록 저장
  const [date, setDate] = useState([null, null]); // 시작일, 종료일 담은 배열
  const [introduce, setIntroduce] = useState(""); // 스터디 소개글
  const [password, setPassword] = useState(null); // 스터디 비밀번호
  const [participant, setParticipant] = useState(0);
  const [url, setUrl] = useState(""); // 스터디 URL
  const [thumbnail, setThumbnail] = useState("asdf"); // 썸네일
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // 썸네일 Url
  const imgInput = useRef();

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

  const onImgButtonClick = () => {
    imgInput.current.click();
  };

  const onImgChange = async (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setThumbnail(file);
      console.log(reader.result);
      setThumbnailUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://i6d201.p.ssafy.io/api/v1/category",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setCategoryList([...categoryList, ...response.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
    if (event.type === "click") {
      // 목록에서 클릭했을 때
      const inter = categoryList.filter(
        (value) => value.name === event.target.innerText
      );

      if (
        inter.length !== 0 &&
        !JSON.stringify(category).includes(JSON.stringify(inter))
      ) {
        setCategory([...category, ...inter]);
      }
    } else if (event.type === "change") {
      // 직접 타이핑하는 경우
      const inter = categoryList.filter(
        (value) => value.name === event.target.value
      );

      if (
        inter.length !== 0 &&
        !JSON.stringify(category).includes(JSON.stringify(inter))
      ) {
        setCategory([...category, ...inter]);
      }
    }
  };

  const onIntroduceHandler = (event) => {
    setIntroduce(event.target.value);
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      setIntroduce(introduce + "\n");
      console.log(introduce);
    }
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onParticipantHandler = (event) => {
    setParticipant(event.target.value);
  };

  const onUrlHandler = (event) => {
    console.log(event);
    setUrl(event.target.value);
  };

  const submit = async () => {
    console.log(title);
    console.log(date);
    console.log(introduce);
    console.log(password);
    console.log(url);
    console.log(thumbnail);
    console.log(thumbnailUrl);
    console.log(isPrivate);

    if (title === "") {
      alert("스터디 이름을 입력해주세요.");
    } else if (introduce === "") {
      alert("스터디 소개글을 입력해주세요.");
    } else if (participant === 0) {
      alert("스터디 참가 인원을 선택해주세요.");
    } else {
      console.log(date[0].toISOString());
      console.log(dayjs(date[0]).format("YYYY-MM-DD"));

      let link_url = "https://i6d201.p.ssafy.io/study/" + url;

      await axios({
        method: "post",
        url: "https://i6d201.p.ssafy.io:8443/openvidu/api/sessions",
        headers: {
          Authorization: `Basic btoa("OPENVIDUAPP:" + "STUDELIVERY")`,
        },
      })
        .then((response) => {
          console.log("Video conference is created.");
        })
        .catch((error) => {
          console.log(error.response);
        });

      await axios({
        method: "post",
        url: "https://i6d201.p.ssafy.io/api/v1/study",
        headers: setHeader(),
        data: {
          name: title,
          introduction: introduce,
          is_private: isPrivate,
          password: "password",
          thumbnail_url: "thumbnailUrl",
          link_url: link_url,
          max_user_num: participant,
          start_at: dayjs(date[0]).format("YYYY-MM-DD"),
          finish_at: dayjs(date[1]).format("YYYY-MM-DD"),
          regular_schedules: [],
        },
      })
        .then((response) => {
          alert("스터디 생성이 완료되었습니다.");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
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
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                onblur={setKoreanDate}
              >
                <Stack spacing={3} sx={{ mb: 5 }} alignItems="center">
                  <DesktopDateRangePicker
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categoryList}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                onInputChange={onCategoryHandler}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="category"
                    fullWidth
                    sx={{ mb: 5 }}
                  />
                )}
              />
              {/* <FormLabel component="legend" sx={{ color: "text.primary" }}>
                일정
              </FormLabel>
              <TextField
                margin="dense"
                required
                fullWidth
                id="title"
                label="스터디 일정을 입력해주세요."
                name="title"
                sx={{ mb: 5 }}
                onChange={onTitleHandler}
              /> */}
              {/* <TextField
                margin="dense"
                fullWidth
                name="category"
                label="카테고리"
                id="password"
                autoComplete="current-password"
                sx={{ mb: 5 }}
              /> */}
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
                onChange={onIntroduceHandler}
                onKeyPress={onCheckEnter}
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
                  <Typography>
                    {"시작일: " + dayjs(date[0]).format("YYYY-MM-DD")}
                  </Typography>
                  <Typography>{"일정: "}</Typography>
                  <Typography>{"카테고리: "}</Typography>
                  <Typography>{"스터디장: "}</Typography>
                  <Typography>소개글</Typography>
                  <Typography>{introduce}</Typography>
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
                            onChange={onPasswordHandler}
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
                            onChange={onUrlHandler}
                          />
                        </Stack>
                        <Stack spacing={1}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            스터디 인원 설정
                          </Typography>
                          <TextField
                            margin="normal"
                            type="number"
                            InputProps={{ inputProps: { min: 2, max: 10 } }}
                            label="참여 가능 인원을 선택해주세요."
                            variant="outlined"
                            onChange={onParticipantHandler}
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
                      <Stack spacing={5} alignItems="center">
                        <input
                          type="file"
                          accept="image/*"
                          className="profile_img"
                          name="profile_img"
                          ref={imgInput}
                          onChange={onImgChange}
                          style={{ display: "none" }}
                        />
                        {thumbnail !== "" ? (
                          <img
                            className="profile_preview"
                            src={thumbnailUrl}
                            alt="profile"
                            loading="lazy"
                            style={{ width: "50%", height: "50%" }}
                          />
                        ) : null}
                        <Button onClick={onImgButtonClick}>
                          썸네일 업로드
                        </Button>
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
                onClick={submit}
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

export default CreateStudy;
