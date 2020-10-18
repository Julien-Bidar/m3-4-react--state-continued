import React, { useState } from "react";
import styled from "styled-components";

const Typeahead = ({ suggestions, handleSelect, categories }) => {
  const [input, setInput] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

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
  const keyDown = (e) => {
    switch (e.key) {
      case "Enter": {
        handleSelect(e.target.value);
        return;
      }
      case "ArrowUp": {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
        //userInput = suggestions[selectedSuggestionIndex].title;
        return;
      }
      case "ArrowDown": {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
        //userInput = suggestions[selectedSuggestionIndex].title;
        return e;
      }
    }
  };

  const select = (e) => {
    handleSelect(e);
  };

  return (
    <Super>
      <MainWrap>
        <InputWrapper>
          <Input
            value={input}
            type="text"
            onChange={inputText}
            onKeyDown={keyDown}
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
              .map((book, index) => {
                const isSelected = index === selectedSuggestionIndex;

                let catName = categories[book.categoryId].name;
                let str = input.toLowerCase();
                let bookTitle = book.title.toLowerCase();
                let position = bookTitle.indexOf(str);
                let firstPart = bookTitle.slice(0, position + str.length);
                let lastPart = bookTitle.slice(position + str.length);
                return (
                  <Li
                    key={book.id}
                    isSelected={isSelected}
                    style={{
                      background: isSelected
                        ? "hsla(50deg, 100%, 80%, 0.25)"
                        : "transparent",
                    }}
                    onClick={() => select(book.title)}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     window.alert("ok");
                    //   }
                    // }}
                    onMouseEnter={() => {
                      setSelectedSuggestionIndex(index);
                    }}
                  >
                    <span>
                      {firstPart}
                      <Prediction>{lastPart} </Prediction>
                      <In>
                        in <Cat>{catName}</Cat>
                      </In>
                    </span>
                  </Li>
                );
              })}
          </ul>
        </ListWrapper>
      </MainWrap>
    </Super>
  );
};

const Super = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const MainWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  width: 525px;
  height: 35px;
  margin: 10px;
  margin-right: 0px;
  margin-left: 0px;
  padding: 7px;
`;

const Button = styled.button`
  width: 75px;
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
  width: 600px;
`;

const Li = styled.li`
  &:hover {
    background-color: lightyellow;
    cursor: pointer;
  }
`;

const ListWrapper = styled.div`
  width: 600px;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const In = styled.span`
  font-style: italic;
`;

const Cat = styled.span`
  color: purple;
`;

export default Typeahead;
