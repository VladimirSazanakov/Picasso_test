import Main_page from '../pages/MainPage/main_page';
import styles from './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Article_page from '../pages/PostPage/Post_page';


function App() {

  return (
    <div className={styles.App}>
      <Routes>
        <Route path='/' element={<Main_page />} />
        <Route path='/post/:id' element={<Article_page />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App
