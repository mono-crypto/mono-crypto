import React from "react";

// reset CSS
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import TradingView from './components/TradingView'

// compoenets
const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing:border-box;
  }
  body{
    font-size:16px;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  a{
      text-decoration:none;
      color:inherit;
      cursor: pointer;
  }
  ol, ul, li {
      list-style: none;
  }
  img {
      display: block;
      width: 100%;
      height: 100%;
  }
  input, button {
      background-color: transparent;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family:'Maven Pro', sans-serif;
  }
`;

const App:React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <TradingView />
    </React.Fragment>
  );
};

export default App;