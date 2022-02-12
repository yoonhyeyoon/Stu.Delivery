import React from "react";
import { Link } from "react-router-dom";

const Study = ({ study }) => {
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
      <Link to={`/study/${study && study.id}`}>{study && study.name}</Link>
    </div>
  );
};

export default Study;
