import React, { useState, useRef, useEffect } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import {
  Autocomplete,
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
  Chip,
} from "@mui/material";

import { setHeader } from "../../../utils/api";
import axios from "axios";
import CheckPwd from "./checkpwd/CheckPwd";
import dayjs from "dayjs";

const Update = () => {
  const [email, setEmail] = useState(""); // 이메일
  const [img, setImg] = useState(""); // 프로필 사진
  const [previewUrl, setPreviewUrl] = useState(""); // 프로필 사진 URL
  const [nickname, setNickname] = useState(""); // 닉네임
  const [birthday, setBirthday] = useState(""); // 생년월일
  const [interest, setInterest] = useState(""); // 관심사
  const [interestList, setInterestList] = useState([]);
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

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    // 페이지가 처음 로드될 때 서버에서 유저 정보 받아옴
    const getUserInfo = () => {
      axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users",
        headers: setHeader(),
      })
        .then((response) => {
          const resNick = response.data.nick_name;
          const resProfile = response.data.profile_img;
          const resBirthday = response.data.birth;
          const resAspire = response.data.determination;
          const resInterest = response.data.categories;

          setEmail(response.data.email);
          setNickname(resNick !== null ? resNick : "");
          setPreviewUrl(resProfile !== null ? resProfile : "");
          setBirthday(resBirthday !== null ? resBirthday : "");
          setAspire(resAspire !== null ? resAspire : "");
          setInterestList(resInterest !== null ? resInterest : []);
        })
        .catch((e) => {
          console.log(e.response);
        });
    };

    const getCategories = () => {
      // 관심사 카테고리도 같이 받아오기
      axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/category",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setCategoryList(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    };

    getUserInfo();
    getCategories();
  }, []);

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
    // 비밀번호 변경
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

  const updateInfo = () => {
    // 회원정보수정
    console.log(nickname);
    console.log(previewUrl);
    console.log(dayjs(birthday).format("YYYY-MM-DD"));
    console.log(JSON.stringify(interestList));
    console.log(aspire);

    axios({
      method: "put",
      url: "https://i6d201.p.ssafy.io/api/v1/users",
      headers: setHeader(),
      data: {
        nick_name: nickname,
        profile_img: previewUrl,
        birth: dayjs(birthday).format("YYYY-MM-DD"),
        determination: aspire,
        categories: JSON.parse(JSON.stringify(interestList)),
      },
    })
      .then((response) => {
        alert("회원정보가 정상적으로 수정되었습니다.");
        window.location.href = "/mypage/dashboard";
      })
      .catch((e) => {
        console.log(e.response);
      });
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

  // 프로필 사진 변경
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

  // 관심사 정보 추가
  const onInterestHandler = (event) => {
    if (event.type === "click") {
      // 목록에서 클릭했을 때
      const inter = categoryList.filter(
        (value) => value.name === event.target.innerText
      );

      if (inter.length !== 0 && !interestList.includes(inter)) {
        setInterestList([...interestList, ...inter]);
      }
      console.log(interestList);
    } else if (event.type === "change") {
      // 직접 타이핑하는 경우
      const inter = categoryList.filter(
        (value) => value.name === event.target.value
      );

      if (inter.length !== 0 && !interestList.includes(inter)) {
        setInterestList([...interestList, ...inter]);
      }
      console.log(interestList);
    }
  };

  // 나의 한마디 설정
  const onAspireHandler = (event) => {
    const currentAspire = event.target.value;
    setAspire(currentAspire);
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
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          sx={{ mb: 5, width: "100%" }}
        >
          <DatePicker
            label="생년월일을 선택해주세요."
            value={birthday}
            minDate={new Date("1900-01-01")}
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
            onChange={(newValue) => {
              setBirthday(newValue);
            }}
            renderInput={(params) => (
              <TextField sx={{ mb: 5, width: "100%" }} {...params} />
            )}
          />
        </LocalizationProvider>
        <FormLabel component="legend" sx={{ color: "text.primary" }}>
          관심사
        </FormLabel>
        <Autocomplete
          disablePortal
          options={categoryList}
          sx={{ width: "100%" }}
          getOptionLabel={(option) => {
            return option.name;
          }}
          onInputChange={onInterestHandler}
          renderInput={(params) => (
            <TextField
              margin="dense"
              required
              fullWidth
              id="interest"
              sx={{ mb: 5 }}
              {...params}
              label="관심사를 입력해주세요"
            />
          )}
        />
        {/* <Stack direction="row" spacing={1}>
          {interestList.map(({ id, name }, index) => {
            console.log(id, name);
            return (
              <Chip
                key={index}
                label={name}
                onDelete={() => {
                  interestList.splice(index, 1);
                  console.log(interestList);
                }}
              />
            );
          })}
        </Stack> */}
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
        <Button
          variant="contained"
          style={{
            background: "rgba(191, 122, 38, 0.7)",
            borderColor: "rgba(191, 127, 38, 0.7)",
          }}
          sx={{ mt: 3, mb: 2 }}
          onClick={updateInfo}
        >
          프로필 변경
        </Button>
      </Box>
    </Container>
  );
};

export default Update;
