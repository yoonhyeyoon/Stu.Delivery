import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import { loadStudy } from "../../redux/study";
import styled from "styled-components";
import PeopleIcon from "@mui/icons-material/People";
import { setHeader } from "../../../utils/api";

const StyledRoom = styled.div`
  width: 450px;
  height: 370px;
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

const MyStudy = ({ myStudy }) => {
  // console.log({ myStudy });
  const [show, setShow] = useState(false);
  const [mystudy, setMystudy] = useState([]);
  //   const dispatch = useDispatch();

  useEffect(() => {
    const getStudy = () => {
      axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users/mystudy",
        headers: setHeader(),
      })
        .then((res) => {
          setMystudy([...res.data]);
        })
        .catch((err) => console.log(err));
    };

    getStudy();
  }, []);

  const user = useSelector((state) => state.user.user);

  const handleShow = () => {
    window.location.href = `/study/${myStudy.id}/info`;
  };

  return (
    <>
      <StyledRoom onClick={handleShow}>
        {myStudy ? (
          <>
            <div
              className="room-title"
              style={{
                background: `url(${myStudy.thumbnail_url})`,
                backgroundSize: "100%",
              }}
            ></div>
            <div className="room-info">
              <div className="active-time">
                <span>{myStudy.name}</span>
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
    </>
  );
};

export default MyStudy;
