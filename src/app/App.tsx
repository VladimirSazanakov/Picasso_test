import React from 'react';
import Main_page from '../pages/main_page';
import styles from './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Article_page from '../pages/Article_page';


function App() {

  return (
    <div className={styles.App}>

      <h1>Hello World</h1>
      <Routes>
        <Route path='/' element={<Main_page />} />
        <Route path='/article/:id' element={<Article_page />} />
        <Route path='/*' element={<Navigate to='/' replace />} />

      </Routes>

    </div>

  )
}

export default App
