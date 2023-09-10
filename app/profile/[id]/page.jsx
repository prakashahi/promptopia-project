"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const userProfile = ({ params }) => {
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <Profile
      name={searchParams.get("name")}
      desc={`Welcome to ${searchParams.get(
        "name"
      )}'s personalized profile page. Explore ${searchParams.get(
        "name"
      )}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default userProfile;
