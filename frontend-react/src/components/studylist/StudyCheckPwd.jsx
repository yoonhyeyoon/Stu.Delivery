import React, { useState } from "react";
import { Modal } from "@mui/material";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { setHeader } from "../../utils/api";

function StudyCheckPwd({ id, show, handleClose }) {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const style = {
    // modal css
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f2f2e8",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    axios({
      method: "post",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${id}/password`,
      header: setHeader(),
      data: {
        password: values.password,
      },
    })
      .then((res) => {
        window.location.href = `/study/${id}`;
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={style}>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            스터디 비밀번호를 입력해주세요
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={onSubmit} size="small">
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
export default StudyCheckPwd;
