import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import StudyCheckPwd from "./StudyCheckPwd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { loadStudy } from "../../redux/study";
import styled from "styled-components";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";

const StyledRoom = styled.div`
  width: 320px;
  height: 240px;
  padding: 10px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(200, 155, 38, 0.7);
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
    height: 148px;
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

const MyStudy = ({ myStudy }) => {
  // console.log({ myStudy });
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
  // const isMember = is_member_check(myStudy, user);
  // console.log(studyInfo, user, isMember);

  const handleShow = () => {
    window.location.href = `/study/${myStudy.id}`;
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
        {myStudy ? (
          <>
            <div className="room-title">
              <h3>{myStudy.name}</h3>
              {/* <p>{`by ${myStudy.master_id}`}</p> */}
            </div>
            <div className="room-info">
              <div className="active-time">
                {/* {myStudy.is_private ? <LockIcon fontSize="small" /> : null} */}
                <span>~{myStudy.finish_at}</span>
              </div>
              <div className="active-users">
                <PeopleIcon className="user-icon" />
                {myStudy.members ? (
                  <span>{`${myStudy.members.length} / ${myStudy.max_user_num}`}</span>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </StyledRoom>
      {/* <StudyCheckPwd
        id={myStudy && myStudy.id}
        show={show}
        handleClose={handleClose}
      /> */}
    </>
  );
};

export default MyStudy;
