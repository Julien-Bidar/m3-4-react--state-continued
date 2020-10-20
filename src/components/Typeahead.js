import React, { useState } from "react";
import styled from "styled-components";
import Suggestion from "./suggestion";

const Typeahead = ({ suggestions, handleSelect }) => {
  const [term, setTerm] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  //filtering the input to return matching titles:
  let matchingResults = suggestions.filter((book) => {
    const lowerCasedInput = term.toLowerCase();
    const lowerCasedTitle = book.title.toLowerCase();
    const match = lowerCasedTitle.includes(lowerCasedInput);
    return match && term.length >= 2;
  });

  let selectedBook = matchingResults[selectedSuggestionIndex];

  return (
    <>
      <InputWrapper>
        <Input
          type="text"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSelect(selectedBook.title);
            } else if (
              e.key === "ArrowUp" &&
              matchingResults.length > 0 &&
              selectedSuggestionIndex > 0
            ) {
              setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
            } else if (
              e.key === "ArrowDown" &&
              matchingResults.length > 0 &&
              selectedSuggestionIndex < matchingResults.length - 1
            ) {
              setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
            }
          }}
        />
        <Button onClick={() => setTerm("")}>Clear</Button>
      </InputWrapper>
      <SuggestionsWrapper>
        <Suggestions>
          {matchingResults.map((book, index) => {
            const isSelected = index === selectedSuggestionIndex;
            return (
              <>
                <Suggestion
                  isSelected={isSelected}
                  key={book.id}
                  term={term}
                  filteredList={matchingResults}
                  index={index}
                  book={book}
                  onMouseEnter={() => {
                    setSelectedSuggestionIndex(index);
                  }}
                  onClick={() => {
                    handleSelect(book.title);
                  }}
                />
              </>
            );
          })}
        </Suggestions>
      </SuggestionsWrapper>
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 7px;
  border-radius: 3px;
  width: 250px;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
`;

const Suggestions = styled.ul`
  width: 300px;
  box-shadow: 0px 9px 28px 0px rgba(0, 0, 0, 0.65);
  border-radius: 4px;
`;

const SuggestionsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Typeahead;
