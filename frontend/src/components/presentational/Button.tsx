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

const button = ({ children, ...rest }) => {
  const htmlProps = rest as any
  return <Button {...htmlProps}>{children}</Button>
}
export default button
