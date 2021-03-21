import React from 'react'

// reset CSS
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const Div = styled.div`
  font-size: 16px;
`

const H1 = styled.h1`
  box-sizing: border-box;
  width: 100px;
  height: 1200px;
  color: #000;
  font-weight: bold;
  font-size: 32px;
`

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
      <Div>
        <H1>안녕하세요</H1>
        <h2>헤딩2</h2>
      </Div>
    </React.Fragment>
  )
}

export default App
