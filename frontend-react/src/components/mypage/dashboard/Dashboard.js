import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { setHeader } from "../../../utils/api";
import MyInfo from "./MyInfo";
import Todolist from "../Todolist/Todolist";

import { CssBaseline, Typography, Box, Container } from "@mui/material";

const Dashboard = () => {
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [interests, setInterests] = useState([]);
  const [aspire, setAspire] = useState("");

  useEffect(() => {
    const fetchUserInfo = () => {
      localStorage.getItem("interests");
      axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users",
        headers: setHeader(),
      })
        .then((res) => {
          setNickname(res.data.nick_name);
          setProfile(res.data.profile_img);
          setInterests([...res.data.categories]);
          setAspire(res.data.determination);

          console.log(res.data.categories);
        })
        .catch((err) => console.log(err.request.data));
    };
    fetchUserInfo();
  }, []);

  return (
    <Fragment>
      <Container fixed>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
          fullWidth
        >
          <Typography component="h1" variant="h4" gutterBottom>
            대시보드
          </Typography>
          <MyInfo
            nickname={nickname}
            profile={profile}
            interests={interests}
            aspire={aspire}
          />
          <Typography
            component="h6"
            variant="h6"
            gutterBottom
            sx={{ mt: 7, mb: 4 }}
          >
            목표
          </Typography>
          <Todolist />
        </Box>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
