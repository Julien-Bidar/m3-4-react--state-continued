import React, { useState } from "react";
import styled from "styled-components";

const Typeahead = ({ suggestions, handleSelect }) => {
  const [input, setInput] = useState("");

  //input, enter, clear and select functions
  let userInput = "";
  const inputText = (e) => {
    userInput = e.target.value;
    setInput(userInput);
  };
  const clear = () => {
    userInput = "";
    setInput(userInput);
  };
  const submit = (e) => {
    if (e.key === "Enter") {
      handleSelect(e.target.value);
    }
  };

  const select = (e) => {
    handleSelect(e.target.innerText);
  };

  return (
    <>
      <InputWrapper>
        <Input
          value={input}
          type="text"
          onChange={inputText}
          onKeyDown={submit}
        />
        <Button onClick={clear}>Clear</Button>
      </InputWrapper>
      <ListWrapper>
        <ul>
          {/* suggestions is the book array. We filter through it to match the input value (str) and then map over the result */}
          {suggestions
            .filter((book) => {
              let str = input;
              if (
                book.title.toLowerCase().includes(str.toLowerCase()) &&
                str.length >= 2
              ) {
                return true;
              }
            })
            .map((book) => {
              let str = input.toLowerCase();
              let bookTitle = book.title.toLowerCase();
              let position = bookTitle.indexOf(str);
              let firstPart = bookTitle.slice(0, position + str.length);
              let lastPart = bookTitle.slice(position + str.length);
              return (
                <Li key={book.id} onClick={select}>
                  <span>
                    {firstPart}
                    <Prediction>{lastPart}</Prediction>
                  </span>
                </Li>
              );
            })}
        </ul>
      </ListWrapper>
    </>
  );
};

const Input = styled.input`
  height: 35px;
  margin: 10px;
  margin-right: 0px;
  padding: 7px;
`;

const Button = styled.button`
  margin: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 17px;
  padding: 7px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Li = styled.li`
  &:hover {
    background-color: lightyellow;
    cursor: pointer;
  }
`;

const ListWrapper = styled.div`
  position: absolute;
  left: 40%;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default Typeahead;
