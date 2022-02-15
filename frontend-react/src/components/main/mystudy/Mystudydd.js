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
  Grid,
} from "@mui/material";
import ImageComponent from "./ImageComponent";

const MyStudydd = () => {
  const studyInfo = [
    {
      title: "파이썬",
      schedule: "월화수 8시",
    },
    {
      title: "파이썬",
      schedule: "월화수 8시",
    },
    {
      title: "파이썬",
      schedule: "월화수 8시",
    },
  ];

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
          <Box sx={{ mt: 8 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {studyInfo.map((study, index) => (
                <Grid item key={index}>
                  <ImageComponent
                    title={study.title}
                    schedule={study.schedule}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default MyStudydd;
