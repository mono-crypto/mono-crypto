import React from 'react'
import styled from 'styled-components'

const Button = styled.button.attrs(() => ({
  type: 'button'
}))`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

interface ButtonProps {
  clickEvent: Function
  children: React.ReactNode
}

const button: React.FC<ButtonProps> = (props) => {
  return <Button onClick={props.clickEvent}>{props.children}</Button>
}

export default button
