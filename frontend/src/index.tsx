import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { BrowserRouter } from 'react-router-dom'

import App from '@/App'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/api/' : 'https://api.mono-cryto.com/'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
)
