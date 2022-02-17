import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Modal,
  TextField,
  List,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TodoItem from "./TodoItem";
import ProgressBar from "../../progressbar/ProgressBar";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { setHeader } from "../../../utils/api";

const Todolist = () => {
  const [goal, setGoal] = useState("");
  const [todos, setTodos] = useState([]);
  const [complete, setComplete] = useState(0);
  const [open, setOpen] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getTodo = () => {
      axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users/goal",
        headers: setHeader(),
      })
        .then((response) => {
          setTodos([...response.data]);
        })
        .catch((e) => {
          console.log("error");
        });
    };

    getTodo();
  }, []);

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

  const handleGoal = (event) => {
    setGoal(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTodo = () => {
    if (goal !== "") {
      setTodos([...todos, goal]);
      setPercent((percent) => complete / todos.length);
      setGoal("");

      upload(goal);
    }
    handleClose();
  };

  const upload = (goal) => {
    axios({
      method: "post",
      url: "https://i6d201.p.ssafy.io/api/v1/users/goal",
      headers: setHeader(),
      data: {
        content: goal,
      },
    })
      .then((response) => {
        alert("성공적으로 저장했어요!");
        window.location.reload();
      })
      .catch((e) => {
        alert("에러가 발생했어요. 다시 시도해주세요.");
      });
  };

  return (
    <Fragment>
      {/* percentage에 따라 progressBar update
       계산식 : 완료한 목표 개수 / 토탈 목표 개수 */}
      <ProgressBar percent={percent} />
      <Typography textAlign="center">{`${
        percent * 100
      }% Complete!`}</Typography>
      <Box>
        <Stack spacing={1} alignItems="center" direction="row" sx={{ mt: 4 }}>
          <IconButton aria-label="add" size="small" onClick={handleOpen}>
            <AddIcon />
          </IconButton>
          <Typography variant="body" gutterBottom>
            추가하기
          </Typography>
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={5} alignItems="center">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              margin="normal"
            >
              목표를 입력해주세요
            </Typography>
            <TextField
              margin="normal"
              label="목표"
              variant="outlined"
              value={goal}
              onChange={handleGoal}
            />
            <Button onClick={addTodo}>확인</Button>
          </Stack>
        </Box>
      </Modal>
      <Box sx={{ border: 2, mt: 1 }}>
        <List>
          {todos.map((myTodo, index) => (
            <TodoItem
              key={index}
              primary={myTodo.content}
              complete={complete}
              setComplete={setComplete}
              todos={todos}
              percent={percent}
              setPercent={setPercent}
            />
          ))}
        </List>
      </Box>
    </Fragment>
  );
};

export default Todolist;
