import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
  const {search, setSearch} = useContext(DataContext)
  return (
   <nav className='Nav'>
    <form  className='searchForm' onSubmit={(e)=>e.preventDefault()}>
       <label htmlFor="search"> Search Posts</label>
       <input
       id='search'
        type="text"
        placeholder='search posts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
    </form>
    <ul>
      <li><Link to='/'> Home </Link></li> 
      <li><Link to='Post'> Post </Link></li>
      <li><Link to='About'> About </Link></li>
    </ul>
   </nav>
  )
}

export default Nav