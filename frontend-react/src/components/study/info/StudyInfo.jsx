import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Members from "./Members";
import { Box, Stack, Chip } from "@mui/material";

function StudyInfo() {
  const study = useSelector((state) => state.study.study);
  // console.log(study.members.length);
  return (
    <div>
      {study ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          fullWidth
        >
          <div>
            <p>
              {study.start_at}~{study.finish_at}
            </p>
          </div>
          <div>
            <Stack spacing={2} direction="row">
              <Chip
                // size="large"
                sx={{
                  fontSize: 30,
                  backgroundColor: "#f2dcc2",
                }}
                label={study.categories && study.categories[0].name}
              />
            </Stack>
          </div>
          <div>
            <p>{study.introduction}</p>
          </div>
          <div>
            <h5>
              스터디 회원 ({study.members && study.members.length}/
              {study.max_user_num})
            </h5>
            <Members members={study.members} />
          </div>
        </Box>
      ) : null}
    </div>
  );
}
export default StudyInfo;
