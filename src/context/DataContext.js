
import React, { useState, useEffect, createContext } from 'react';
import abi from '../abi/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await abi.get('/posts');
        setPosts(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await abi.post('/posts', newPost);
      setPosts([...posts, response.data]);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await abi.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await abi.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        searchResults,
        fetchError,
        isLoading,
        posts,
        handleEdit,
        editBody,
        editTitle,
        setEditTitle,
        setEditBody,
        handleDelete,
        search,
        setSearch
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
