import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Footer from "../welcome/Footer";
import Study from "./Study";
import Categories from "./Categories";
import items from "./data";
import "./Study.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeSubContainer = styled.div`
  width: 100%;
`;

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function StudyList() {
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
      </section>
      <HomeSubContainer>
        <Footer></Footer>
      </HomeSubContainer>
    </Container>
  );
}

export default StudyList;
