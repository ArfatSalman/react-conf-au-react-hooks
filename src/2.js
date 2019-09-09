"use strict";
import React from './not-react';

function Counter() {
  const [count, setCount] = React.useState(65);
  const [letter, setLetter] = React.useState("A");
  const [input, setInput] = React.useState("");

  const handleClick = () => {
    setCount(count + 1);
    setLetter(String.fromCodePoint(count + 1));
  };

  const handleChange = ({ target: { value } }) => {
    setInput(value);
    setCount(Number(value));
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("h1", null, count),
    React.createElement(
      "button",
      {
        onClick: handleClick
      },
      "Click"
    ),
    React.createElement("h3", null, "Counter started from: ", input),
    React.createElement("input", {
      type: "number",
      value: input,
      onChange: handleChange
    }),
    React.createElement("h1", null, "Character: ", letter)
  );
}
