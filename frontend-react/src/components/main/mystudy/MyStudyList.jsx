import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Categories from "./Categories";
import "./Study.css";
import axios from "axios";
import Footer from "../../welcome/Footer";
import { setHeader } from "../../../utils/api";
import MyStudy from "./Mystudy";

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

function MyStudyList() {
  const [myStudyList, setMyStudyList] = useState();
  useEffect(() => {
    const fetchStudyList = async () => {
      await axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users/mystudy",
        headers: setHeader(),
      })
        .then((res) => {
          // console.log(res.data);
          setMyStudyList(res.data);
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
          const allCategories = [
            "all",
            ...new Set(res.data.map((categorie) => categorie.name)),
          ];
          // setCateNames(allCategories);
          setCategories(allCategories);
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

  const [studyItems, setStudyItems] = useState(myStudyList);
  // console.log(myStudyList);
  const filterItems = (category) => {
    if (category === "all") {
      setStudyItems(myStudyList);
      return;
    }
    const newItems = myStudyList.filter((study) =>
      study.categories.map((categorie) => categorie.name === category)
    );
    setStudyItems(newItems);
  };

  return (
    <Container>
      <section className="study section">
        <div className="title">
          <h2>My Study List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          myStudyList={myStudyList}
          filterItems={filterItems}
        />
        {/* <Study items={studyItems} /> */}
        {myStudyList ? (
          <RoomContainer>
            {(studyItems ? studyItems : myStudyList).map((myStudy) => (
              <MyStudy key={myStudy.id} myStudy={myStudy} />
            ))}
          </RoomContainer>
        ) : null}
      </section>
      <HomeSubContainer>
        <Footer></Footer>
      </HomeSubContainer>
    </Container>
  );
}

export default MyStudyList;
