import React from "react";
import styled from "styled-components";
import data from "../data";
import { categories } from "../data";

import GlobalStyles from "./GlobalStyles";
import Typeahead from "./Typeahead";

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
          categories={categories}
          suggestions={data.books}
          handleSelect={(suggestion) => {
            window.alert(suggestion);
          }}
        />
      </Wrapper>
      {/* TODO */}
    </>
  );
};

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center; */
  margin-top: 25px;
`;

export default App;
