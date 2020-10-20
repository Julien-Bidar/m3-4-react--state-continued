import React from "react";
import styled from "styled-components";
import { categories } from "../data";

const Suggestion = ({ book, term, onClick, isSelected, onMouseEnter }) => {
  const lowerCasedTitle = book.title.toLowerCase();
  const startIndex = lowerCasedTitle.indexOf(term);
  const firstPart = book.title.slice(0, startIndex + term.length);
  const lastPart = book.title.slice(startIndex + term.length);

  return (
    <SuggWrapper
      onClick={onClick}
      id={`option-${book.id}`}
      className={isSelected ? "selected" : undefined}
      onMouseEnter={onMouseEnter}
    >
      <span>{firstPart}</span>
      <Prediction>{lastPart} </Prediction>
      <CatWrapper>
        in <Cat>{categories[book.categoryId].name}</Cat>
      </CatWrapper>
    </SuggWrapper>
  );
};

const Cat = styled.span`
  color: purple;
`;

const CatWrapper = styled.span`
  font-style: italic;
`;

const SuggWrapper = styled.li`
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: hsla(50deg, 100%, 80%, 0.25);
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default Suggestion;
