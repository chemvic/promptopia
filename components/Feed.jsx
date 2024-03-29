'use client';
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}

    </div>
  )

}


const Feed = () => {
const [searchText, setSearchText] = useState('');
const [posts, setPosts] = useState([]);

const handleSearchChange = (event) =>{
     setSearchText(event.target.value)
};

const handleTagClick = (tagText) => {
    setSearchText(tagText);
};



useEffect(() =>{
  const fetchPosts = async () =>{
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  };

  fetchPosts();
},[]);

const filter = () => {
    return  posts.filter(({prompt, tag, creator})=>prompt.toLowerCase().includes(searchText.toLowerCase())
     || tag.toLowerCase().includes(searchText.toLowerCase())
     || creator.username.toLowerCase().includes(searchText.toLowerCase()));
};
  const filteredBySearchText = filter();
  return (
    <section className='feed'>
      <form  className="relative w-full flex-center ">
        <input
         type="text"
         placeholder='Search for an username or tag'
         value={searchText}
         onChange={handleSearchChange}
         required
         className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
      data={filteredBySearchText}
      handleTagClick={handleTagClick}
      />
      ) : (
        <PromptCardList
      data={posts}
      handleTagClick={handleTagClick}
      />
      )}

      
    </section>
  )
}

export default Feed