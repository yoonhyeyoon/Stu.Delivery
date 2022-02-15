import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Footer from "../welcome/Footer";
import Study from "./Study";
import Categories from "./Categories";
import items from "./data";
import "./Study.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  @media only screen and (max-width: 1010px) {
    width: 95%;
  }
`;

const HomeSubContainer = styled.div`
  width: 100%;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 100%;
`;

function StudyList() {
  const [studyList, setStudyList] = useState();
  useEffect(() => {
    const fetchStudyList = async () => {
      await axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/study",
      })
        .then((res) => {
          // console.log(res.data);
          setStudyList(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchStudyList();
  }, []);

  const [categories, setCategories] = useState();
  // const [cateNames, setCateNames] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      await axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/category",
      })
        .then((res) => {
          // console.log(res.data);
          setCategories(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchCategories();
    // if (categories) {
    //   const allCategories = [
    //     "all",
    //     ...new Set(categories.map((categorie) => categorie.name)),
    //   ];
    //   setCateNames(allCategories);
    // }
  }, []);
  // useEffect(() => {
  //   if (categories) {
  //     const allCategories = [
  //       "all",
  //       ...new Set(categories.map((categorie) => categorie.name)),
  //     ];
  //     setCateNames(allCategories);
  //   }
  // }, []);

  const [studyItems, setStudyItems] = useState(studyList);
  console.log(categories);
  const filterItems = (category) => {
    // if (category === "all") {
    //   setStudyItems(studyList);
    //   return;
    // }
    const newItems = studyList.filter((study) =>
      study.categories.map((categorie) => categorie.name === category)
    );
    setStudyItems(newItems);
  };

  return (
    <Container>
      <section className="study section">
        <div className="title">
          <h2>Study List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          studyList={studyList}
          filterItems={filterItems}
        />
        {/* <Study items={studyItems} /> */}
        <RoomContainer>
          {studyItems &&
            studyItems.map((study) => <Study key={study.id} study={study} />)}
        </RoomContainer>
      </section>
      <HomeSubContainer>
        <Footer></Footer>
      </HomeSubContainer>
    </Container>
  );
}

export default StudyList;
