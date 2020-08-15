import React from "react";
import "./ImageList.css";
import ImageCard from "./ImageCard";

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <ImageCard key={image.id} image={image} />;
  });

  return (
    <div className="image-list">
      {images}
      <div ref={props.bottomBoundaryRef} id="page-bottom-boundary"></div>
    </div>
  );
};

export default ImageList;
