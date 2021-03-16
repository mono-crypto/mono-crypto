import React from "react";
import styled from 'styled-components';

const Button = styled.button.attrs(() => ({
  type: 'button'
}))`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

type ButtonProps = {
  text: string,
  clickEvent: Function,
  children: React.ReactNode
};

const button = (props:ButtonProps) => {
  return <Button onClick={props.clickEvent}>{props.children}</Button>;
};

button.defaultProps = {
  text: 'Button'
};

export default button;
