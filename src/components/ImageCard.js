import React, { useState, useEffect, useRef } from "react";

const ImageCard = (props) => {
  const [spans, setSpans] = useState(0);

  const imgRef = useRef(React.createRef);
  const { description, urls } = props.image;

  useEffect(() => {
    imgRef.current.addEventListener("load", getSpans);
  });

  const getSpans = () => {
    const height = imgRef.current.clientHeight;
    const spans = Math.ceil(height / 10) + 2;
    setSpans(spans);
  };

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imgRef} src={urls.regular} alt={description} />
    </div>
  );
};

export default ImageCard;
