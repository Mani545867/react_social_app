
import { Route, Routes, } from 'react-router-dom';
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import EditPost from './EditPost';
import { DataProvider } from './context/DataContext';

const App = () => {

  return (
    <div className='App'>
          <DataProvider>
            <Header title='Soial Media'  />
            <Nav/>
        <Routes>
            <Route path='/' element={<Home/> }/> 
            <Route path='post' >
              <Route index element={<NewPost/>} />
              <Route path=':id' element={<PostPage/>}/>
            </Route>
            <Route path='/edit/:id' element={<EditPost />} />
          <Route path='About' element={ <About/> } />
            <Route path='*' element={<Missing/>} />
        </Routes>
            <Footer/> 
      </DataProvider>  
    </div>
  )
}

export default App