/* Import statements */
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-bootstrap/Spinner'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <div className='spinnerdiv'>
          <Spinner animation='grow' variant='warning' role='status' size='lg'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      }>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
