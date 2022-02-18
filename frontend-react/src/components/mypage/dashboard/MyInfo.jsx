import React, { Fragment } from "react";
import { Box, Stack, Avatar, Typography, Chip, Divider } from "@mui/material";

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
          <Avatar alt="Remy Sharp" src={props.profile} />
          <Typography component="h6" variant="h6" gutterBottom>
            {props.nickname}
          </Typography>
        </Stack>
        <Divider sx={{ mb: 4 }} />
        <Typography component="h6" variant="h6" gutterBottom>
          나의 관심사
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 7 }}>
          {props.interests.map((anchor, index) => (
            <Chip key={index} label={anchor.name} />
          ))}
        </Stack>
        <Divider sx={{ mb: 4 }} />
        <Typography component="h6" variant="h6" gutterBottom sx={{ mb: 3 }}>
          나의 한마디
        </Typography>
        <Typography gutterBottom>{props.aspire}</Typography>
        <Divider sx={{ mt: 4, mb: 4 }} />
      </Box>
    </Fragment>
  );
};

export default MyInfo;
