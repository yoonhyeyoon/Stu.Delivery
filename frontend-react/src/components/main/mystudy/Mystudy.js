import React, { Fragment } from "react";

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

const MyStudy = () => {
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
            내 스터디 조회
          </Typography>
        </Box>
      </Container>
    </Fragment>
  );
};

export default MyStudy;
