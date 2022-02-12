import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { setHeader } from "../../../utils/api";
import MyInfo from "./MyInfo";
import ProgressBar from "../../progressbar/ProgressBar";
import Todolist from "../Todolist/Todolist";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  CssBaseline,
  Typography,
  Button,
  Stack,
  Box,
  TextField,
  Container,
  IconButton,
  Modal,
  Checkbox,
} from "@mui/material";

const Dashboard = () => {
  useEffect(() => {
    const fetchUserInfo = async () => {
      await axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users/me",
        headers: setHeader(),
      })
        .then((res) => {
          localStorage.setItem("user", res.data.id);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("nickname", res.data.nickname);
          localStorage.setItem("profile", res.data.profile_img);
        })
        .catch((err) => console.log(err.request.data));
    };
    fetchUserInfo();
  }, []);

  let nickname = localStorage.getItem("nickname");
  let interests = ["리액트", "Vue.js"];
  let aspire = "아자아자";
  let percent = 0;

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
          <MyInfo nickname={nickname} interests={interests} aspire={aspire} />
          <Typography
            component="h6"
            variant="h6"
            gutterBottom
            sx={{ mt: 7, mb: 4 }}
          >
            목표
          </Typography>
          <ProgressBar />
          <Todolist />
        </Box>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
