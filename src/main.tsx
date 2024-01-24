import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './api/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
