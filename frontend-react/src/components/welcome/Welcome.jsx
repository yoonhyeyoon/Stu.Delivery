import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import recafe1 from "../../assets/images/welcome/recafe1.png";
import recafe2 from "../../assets/images/welcome/recafe2.png";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className="container">
      <div className={styles.main_cover}></div>
      <div className={styles.main_cover_black}></div>
      <div className={styles.carousel}>
        <Carousel fade>
          <Carousel.Item>
            <img
              style={{ height: "600px" }}
              className="d-block w-100"
              src={recafe1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "600px" }}
              className="d-block w-100"
              src={recafe2}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Welcome;
