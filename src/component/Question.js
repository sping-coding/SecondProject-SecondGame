import React from "react";

const Question = (props) => {
  return (
    <div>
      <h1>{props.item && props.item.question}</h1>
    </div>
  );
};

export default Question;
