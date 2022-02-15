import React, { useEffect, useState } from "react";

const Categories = ({ categories, studyList, filterItems }) => {
  // const [cateNames, setCateNames] = useState();

  // const cateNameMaker = () => {
  //   if (categories) {
  //     const allCategories = [
  //       "all",
  //       ...new Set(categories.map((categorie) => categorie.name)),
  //     ];
  //     setCateNames(allCategories);
  //   }
  // };

  // const [studyItems, setStudyItems] = useState(studyList);
  // console.log(cateNames);
  // const filterItems = (category) => {
  //   if (category === "all") {
  //     setStudyItems(studyList);
  //     return;
  //   }
  //   const newItems = studyList.filter((study) =>
  //     study.categories.map((categorie) => categorie.name === category)
  //   );
  //   setStudyItems(newItems);
  // };
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
              {category.name}
            </button>
          );
        })}
    </div>
  );
};

export default Categories;
