"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/profile/loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterPrompt = (searchTerm) => {
    return posts.filter((item) => {
      const {
        creator: { username },
        prompt,
        tag,
      } = item;
      return (
        username.toLowerCase().includes(searchTerm) ||
        prompt.toLowerCase().includes(searchTerm) ||
        tag.toLowerCase().includes(searchTerm)
      );
    });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value.toLowerCase());
        setSearchResult(searchResult);
      })
    );
  };

  const handleTag = (tag) => {
    setSearchText(tag);
    const searchResult = posts.filter((item) => item.tag === tag);
    setSearchResult(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <Loading />
      ) : searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTag} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTag} />
      )}
    </section>
  );
};

export default Feed;
