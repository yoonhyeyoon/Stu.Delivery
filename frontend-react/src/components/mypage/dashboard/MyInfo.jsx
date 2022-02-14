import React, { Fragment } from "react";
import { Box, Stack, Avatar, Typography, Chip } from "@mui/material";

const MyInfo = (props) => {
  return (
    <Fragment>
      <Box
        noValidate
        sx={{ mt: 1, width: "auto", justifyContent: "flex-start" }}
      >
        <Stack
          spacing={2}
          direction="row"
          alignItems="left"
          sx={{ mt: 4, mb: 7 }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          <Typography component="h6" variant="h6" gutterBottom>
            {props.nickname}
          </Typography>
        </Stack>
        <Typography component="h6" variant="h6" gutterBottom>
          나의 관심사
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 7 }}>
          {props.interests.map((anchor) => (
            <Chip key={anchor} label={anchor} />
          ))}
        </Stack>
        <Typography component="h6" variant="h6" gutterBottom>
          나의 한마디
        </Typography>
        <Typography component="h6" variant="h6" gutterBottom>
          {props.aspire}
        </Typography>
      </Box>
    </Fragment>
  );
};

export default MyInfo;
