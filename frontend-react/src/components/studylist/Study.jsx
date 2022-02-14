import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudyCheckPwd from "./StudyCheckPwd";

const Study = ({ study }) => {
  const [show, setShow] = useState(false);
  console.log(study);
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
