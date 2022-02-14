import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudyCheckPwd from "./StudyCheckPwd";
import { useSelector, useDispatch } from "react-redux";
import { is_member_check } from "../../utils/api";
import axios from "axios";
import { loadStudy } from "../../redux/study";

const Study = ({ study }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (study) {
      const fetchStudyInfo = async () => {
        axios({
          method: "get",
          url: `https://i6d201.p.ssafy.io/api/v1/study/${study.id}`,
        })
          .then((res) => {
            // console.log(res);
            dispatch(loadStudy(res.data));
          })
          .catch((err) => console.log(err));
      };
      fetchStudyInfo();
    }
  }, []);
  const user = useSelector((state) => state.user.user);
  const studyInfo = useSelector((state) => state.study.study);
  const isMember = is_member_check(studyInfo, user);
  // console.log(studyInfo, user, isMember);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (study && isMember) {
      console.log(isMember);
      if (isMember) {
        window.location.href = `/study/${study.id}`;
      } else {
        if (study.is_private) {
          setShow(true);
        } else {
          window.location.href = `/study/${study.id}/info`;
        }
      }
    }
  };
  return (
    <div className="section-center">
      {/* {items.map((studyItem) => {
        const { id, title, img } = studyItem;
        return (
          <article key={id} className="study-item">
            <img src={img} alt={title} className="photo" />
          </article>
        );
      })} */}
      {/* <Link to={`/study/${study && study.id}/info`}> */}
      <div onClick={handleShow}>{study && study.name}</div>
      <StudyCheckPwd
        id={study && study.id}
        show={show}
        handleClose={handleClose}
      />
      {/* </Link> */}
    </div>
  );
};

export default Study;
