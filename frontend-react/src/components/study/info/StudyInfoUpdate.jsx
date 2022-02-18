import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { setHeader } from "../../../utils/api";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
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
  Chip,
  ButtonBase,
} from "@mui/material";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const images = [
  {
    url: "/images/thumbnail/study_thu_1.png",
    title: "1번",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_2.png",
    title: "2번",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_3.png",
    title: "3번",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_4.png",
    title: "4번",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_5.png",
    title: "5번",
    width: "50%",
  },
];

const StudyInfoUpdate = () => {
  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);

  console.log(study);
  console.log(user);

  const [title, setTitle] = useState(study.name); // 스터디명
  const [category, setCategory] = useState(study.categories); // 카테고리
  const [categoryList, setCategoryList] = useState([]); // 서버에서 받아온 카테고리 목록 저장
  const [date, setDate] = useState([study.start_at, study.finish_at]); // 시작일, 종료일 담은 배열
  const [introduce, setIntroduce] = useState(study.introduction); // 스터디 소개글
  const [password, setPassword] = useState(); // 스터디 비밀번호
  const [participant, setParticipant] = useState(study.participant);
  const [thumbnail, setThumbnail] = useState(""); // 썸네일
  const [thumbnailUrl, setThumbnailUrl] = useState(study.thumbnail_url); // 썸네일 Url

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
        setCategoryList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log("category update!");
  }, [category]);

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
    console.log(category);
  };

  const printCategory = () => {
    category.map((item) => {
      return item.name + ",";
    });
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

  const submit = async () => {
    console.log(title);
    console.log(date);
    console.log(introduce);
    console.log(password);
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
      // console.log(date[0].toISOString());
      // console.log(dayjs(date[0]).format("YYYY-MM-DD"));

      await axios({
        method: "put",
        url: "https://i6d201.p.ssafy.io/api/v1/study",
        headers: setHeader(),
        data: {
          name: title,
          introduction: introduce,
          is_private: isPrivate,
          password: password,
          thumbnail_url: thumbnailUrl,
          max_user_num: participant,
          start_at: date[0],
          finish_at: date[1],
          regular_schedules: [],
        },
      })
        .then((response) => {
          alert("스터디 정보 수정이 완료되었습니다.");
          window.location.href = `/study/${study.id}/info`;
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
  const onDelete = async () => {
    await axios({
      method: "DELETE",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${study.id}`,
      headers: setHeader(),
    })
      .then((res) => {
        console.log(res.data);
        window.location.href = "/";
      })
      .catch((err) => console.log(err.response));
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
              스터디 수정하기
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
                defaultValue={title}
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
                      setDate([
                        dayjs(newDate[0]).format("YYYY-MM-DD"),
                        dayjs(newDate[1]).format("YYYY-MM-DD"),
                      ]);
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
              <FormLabel component="legend" sx={{ color: "text.primary" }}>
                소개글
              </FormLabel>
              <TextField
                id="outlined-multiline-static"
                margin="dense"
                fullWidth
                name="introduce"
                label="소개글"
                defaultValue={introduce}
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
                  <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                    {category.map(({ id, name }, index) => {
                      console.log(id, name);
                      return (
                        <Chip
                          key={index}
                          label={name}
                          onDelete={() => {
                            category.splice(index, 1);
                            console.log(...category);
                          }}
                        />
                      );
                    })}
                  </Stack>
                  <Typography>{"스터디장: " + user.nickname}</Typography>
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
                            <Typography>
                              {isPrivate ? "비공개" : "공개"}
                            </Typography>
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
                            disabled={!isPrivate}
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
                            스터디 인원 설정
                          </Typography>
                          <TextField
                            margin="normal"
                            type="number"
                            InputProps={{ inputProps: { min: 2, max: 10 } }}
                            defaultValue={study.max_user_num}
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
                      {images.map((image, index) => (
                        <ImageButton
                          focusRipple
                          key={image.title}
                          style={{
                            width: image.width,
                          }}
                          onClick={() => {
                            setThumbnailUrl(image.url);
                            setThumbnail(image.title);
                          }}
                        >
                          <ImageSrc
                            style={{ backgroundImage: `url(${image.url})` }}
                          />
                          <ImageBackdrop className="MuiImageBackdrop-root" />
                          <Image>
                            <Typography
                              component="span"
                              variant="subtitle1"
                              color="inherit"
                              sx={{
                                position: "relative",
                                p: 4,
                                pt: 2,
                                pb: (theme) =>
                                  `calc(${theme.spacing(1)} + 6px)`,
                              }}
                            >
                              {image.title}
                              <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                          </Image>
                        </ImageButton>
                      ))}
                      <Typography variant="subtitle1">
                        선택된 이미지: {thumbnail}
                      </Typography>
                      <Button onClick={handleThumbnailClose} sx={{ mt: 5 }}>
                        확인
                      </Button>
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
                수정
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ background: "gray" }}
                sx={{ mb: 2 }}
                onClick={onDelete}
              >
                스터디 삭제
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default StudyInfoUpdate;
