import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { BrowserRouter } from 'react-router-dom'

import App from '@/App'

import {
  RecoilRoot
} from 'recoil';
import initialze from '@/atoms/initialize'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/api/' : 'https://api.mono-cryto.com/'

ReactDOM.render(
  <RecoilRoot initializeState={initialze}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.querySelector('#root')
)
