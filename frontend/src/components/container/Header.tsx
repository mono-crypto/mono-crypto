import React from 'react'
import styled from 'styled-components'

// import Main from './Main'

import { NavLink } from 'react-router-dom'

const Header = styled.header`
  font-size: 1em;

  .blog-logo {
    color: blue;
  }

  .github-log {
    color: black;
  }

  .active-menu {
    color: red;
  }
`

const header: React.FC = () => {
  return (
    <Header>
      <div className='blog-logo'>blog-logo</div>
      <ul className=''>
        <li className=''>
          <NavLink to='/' activeClassName='active-menu'>
            Home
          </NavLink>
        </li>
        <li className=''>
          <NavLink to='/main' activeClassName='active-menu'>
            main
          </NavLink>
        </li>
        <li className=''>
          <NavLink to='/post' activeClassName='active-menu'>
            post
          </NavLink>
        </li>
      </ul>
      <div className='github-log'>github</div>
    </Header>
  )
}

export default header
