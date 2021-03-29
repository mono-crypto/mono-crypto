import React from 'react'

// reset CSS
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import Wallet from '@/pages/Wallet'

const GlobalStyle = createGlobalStyle`        
  ${reset} 
  * {
    box-sizing:border-box;
  }
  body {
    font-size:16px;
    font-family: 'Spoqa Han Sans Neo', -apple-system, system-ui, BlinkMacSystemFont,"Malgun Gothic","맑은 고딕",helvetica,"Apple SD Gothic Neo",sans-serif;
  }
  a {
    color:inherit;
    text-decoration:none;
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
`

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Wallet />
    </React.Fragment>
  )
}

export default App
