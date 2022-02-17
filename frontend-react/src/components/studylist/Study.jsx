import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudyCheckPwd from "./StudyCheckPwd";
import { useSelector, useDispatch } from "react-redux";
import { is_member_check } from "../../utils/api";
import axios from "axios";
import { loadStudy } from "../../redux/study";
import styled from "styled-components";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";

const StyledRoom = styled.div`
  width: 450px;
  height: 370px;
  padding: 10px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(191, 122, 38, 0.7);
  transition: 0.3s ease;
  row-gap: 4px;
  &:hover {
    transform: translateY(-10px);
  }
  .category-tag {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  .room-title {
    width: 100%;
    height: 350px;
    box-shadow: 0 5px 6px -6px rgba(191, 122, 38, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h3 {
      text-align: center;
    }
    p {
      text-align: end;
    }
  }
  .room-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 32px;
    .active-time {
      display: flex;
      align-items: center;
      column-gap: 5px;
      .time-icon {
        font-size: 1.1em;
      }
    }
    .active-users {
      display: flex;
      align-items: center;
      column-gap: 5px;
      .user-icon {
        font-size: 1.1em;
      }
    }
  }
`;

const Study = ({ study }) => {
  console.log({ study });
  const [show, setShow] = useState(false);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     if (study) {
  //       const fetchStudyInfo = async () => {
  //         axios({
  //           method: "get",
  //           url: `https://i6d201.p.ssafy.io/api/v1/study/${study.id}`,
  //         })
  //           .then((res) => {
  //             // console.log(res);
  //             dispatch(loadStudy(res.data));
  //           })
  //           .catch((err) => console.log(err));
  //       };
  //       fetchStudyInfo();
  //     }
  //   }, []);
  const user = useSelector((state) => state.user.user);
  // const studyInfo = useSelector((state) => state.study.study);
  const isMember = is_member_check(study, user);
  // console.log(studyInfo, user, isMember);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (study) {
      if (study.is_private) {
        setShow(true);
      } else {
        window.location.href = `/study/${study.id}/info`;
      }
    }
  };
  // const getTime = (time) => {
  //   if (time < 1) return "1분미만";
  //   if (time < 60) return `${parseInt(time, 10)}분`;
  //   if (time >= 60) return `${parseInt(time / 60, 10)}시간`;
  // };
  // const time = new Date(study.start_at) - new Date(study.finish_at);
  // console.log(getTime(time));
  return (
    <>
      <StyledRoom onClick={handleShow}>
        {/* <div className="category-tag">
          <CategoryTag category={room.category} />
        </div> */}
        <div
          className="room-title"
          style={{
            background: `url(${study.thumbnail_url})`,
            backgroundSize: "100%",
          }}
        >
          <h3>{study.name}</h3>
          {/* <p>{`by ${study.master_id}`}</p> */}
        </div>
        <div className="room-info">
          <div className="active-time">
            {study.is_private ? <LockIcon fontSize="small" /> : null}
            <span>~{study.finish_at}</span>
          </div>
          <div className="active-users">
            <PeopleIcon className="user-icon" />
            {study.members ? (
              <span>{`${study.members.length} / ${study.max_user_num}`}</span>
            ) : null}
          </div>
        </div>
      </StyledRoom>
      <StudyCheckPwd
        id={study && study.id}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};

export default Study;
