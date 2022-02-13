import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Footer from "../welcome/Footer";
import Study from "./Study";
import Categories from "./Categories";
import items from "./data";
import "./Study.css";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeSubContainer = styled.div`
  width: 100%;
`;

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

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

  const [studyItems, setStudyItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setStudyItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setStudyItems(newItems);
  };

  return (
    <Container>
      <section className="study section">
        <div className="title">
          <h2>Study List</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Study items={studyItems} />
        <div>
          {studyList &&
            studyList.map((study) => <Study key={study.id} study={study} />)}
        </div>
      </section>
      <HomeSubContainer>
        <Footer></Footer>
      </HomeSubContainer>
    </Container>
  );
}

export default StudyList;
