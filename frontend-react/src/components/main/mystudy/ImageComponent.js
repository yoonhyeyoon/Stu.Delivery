import React, { Fragment } from "react";

import { Box, Typography } from "@mui/material";

const ImageComponent = ({ src, title, schedule }) => {
  return (
    <Fragment>
      <Box>
        <img src={src} alt="../../../assets/logo/logomain.png" loading="lazy" />
        <Typography>{title}</Typography>
        <Typography>{schedule}</Typography>
      </Box>
    </Fragment>
  );
};

export default ImageComponent;
