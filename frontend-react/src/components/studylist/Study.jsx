import React from "react";

const Study = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((studyItem) => {
        const { id, title, img } = studyItem;
        return (
          <article key={id} className="study-item">
            <img src={img} alt={title} className="photo" />
          </article>
        );
      })}
    </div>
  );
};

export default Study;
