import React, { Fragment, useState, useRef } from "react";
import {
  Box,
  Stack,
  Checkbox,
  Typography,
  Button,
  IconButton,
  Modal,
  Container,
  TextField,
  TableContainer,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Todolist = () => {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);
  const [complete, setComplete] = useState(0);
  const [open, setOpen] = useState(false);

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

  const inputRef = useRef();

  const handleGoal = (event) => {
    setGoal(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const controlTodo = (event) => {
    if (event.target.checked) {
      console.log("+1");
      setComplete((complete) => complete + 1);
    } else {
      console.log("-1");
      setComplete((complete) => complete - 1);
    }
  };

  const addGoal = () => {
    if (goal !== "") {
      setGoals([...goals, goal]);
      setGoal("");
    }
    handleClose();
  };

  return (
    <Fragment>
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
            <Button onClick={addGoal}>확인</Button>
          </Stack>
        </Box>
      </Modal>
      <Box sx={{ border: 2, mt: 1 }}>
        <Stack spacing={1} direction="column">
          <Stack spacing={1} direction="row" alignItems="center">
            {goals.map((mygoal, index) => (
              <Fragment key={index}>
                <Checkbox onChange={controlTodo} />
                <Typography variant="body" gutterBottom>
                  {mygoal}
                </Typography>
              </Fragment>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Todolist;
