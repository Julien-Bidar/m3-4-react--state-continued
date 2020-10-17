import React from "react";
import styled from "styled-components";
import data from "../data";

import GlobalStyles from "./GlobalStyles";
import Typeahead from "./Typeahead";

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
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

const Wrapper = styled.div``;

export default App;
