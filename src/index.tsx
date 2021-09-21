import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";
import { globalStyle } from "./styles";

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root"),
);
