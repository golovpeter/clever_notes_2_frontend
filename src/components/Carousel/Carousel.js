import React from "react";
import { Carousel } from "antd";
import "./Carousel.css";

const ImageCarousel = () => (
  <Carousel autoplay>
    <div>
      <h3 className="carousel-text-top">Sign Up</h3>
      <div className="container">
        <img src={require("../../images/signUp1.png")} alt="error" />
      </div>
      <h3 className="carousel-text-bottom">Create you own account</h3>
    </div>
    <div>
      <h3 className="carousel-text-top">Create</h3>
      <div className="container">
        <img src={require("../../images/note.png")} alt="error" />
      </div>
      <h3 className="carousel-text-bottom">Create new note</h3>
    </div>
    <div>
      <h3 className="carousel-text-top">Save</h3>
      <div className="container">
        <img src={require("../../images/cloud2.png")} alt="error" />
      </div>
      <h3 className="carousel-text-bottom">
        Save your note and it will be available in the cloud!
      </h3>
    </div>
  </Carousel>
);

export default ImageCarousel;
