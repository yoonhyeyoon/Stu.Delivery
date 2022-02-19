import React from "react";

const Categories = ({ categories, myStudyList, filterItems }) => {
  return (
    <div className="btn-container">
      {categories &&
        categories.map((category, index) => {
          return (
            <button
              // type="button"
              className="filter-btn"
              key={index}
              onClick={() => filterItems(category)}
            >
              {category}
            </button>
          );
        })}
    </div>
  );
};

export default Categories;
