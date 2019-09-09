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

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click</button>
      <h3>Counter started from: {input}</h3>
      <input type="number" value={input} onChange={handleChange} />
      <h1>Character: {letter}</h1>
    </>
  );
}
