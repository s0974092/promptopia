'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit
            handleDelete
          />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return allPosts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    console.log(e);
    setSearchTimeout(clearTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        console.log('searchResult', searchResult);
        
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setAllPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {/* All Prompts */}
      { searchText ?
        (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) :
        (
          <PromptCardList
            data={allPosts}
            handleTagClick={handleTagClick}
          />
        )
      }

    </section>
  )
}

export default Feed