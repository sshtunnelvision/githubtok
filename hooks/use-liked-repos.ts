"use client";

import { useState, useEffect } from "react";
import { Repository } from "@/types/github";

const STORAGE_KEY = "githubtok_liked_repos";

export function useLikedRepos() {
  const [likedRepos, setLikedRepos] = useState<Repository[]>([]);

  // Load liked repos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLikedRepos(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse liked repos:", error);
      }
    }
  }, []);

  // Save to localStorage whenever likedRepos changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedRepos));
  }, [likedRepos]);

  const addLikedRepo = (repo: Repository) => {
    setLikedRepos((prev) => {
      // Don't add if already liked
      if (prev.some((r) => r.id === repo.id)) return prev;
      return [...prev, repo];
    });
  };

  const removeLikedRepo = (repoId: string) => {
    setLikedRepos((prev) => prev.filter((repo) => repo.id !== repoId));
  };

  const isRepoLiked = (repoId: string) => {
    return likedRepos.some((repo) => repo.id === repoId);
  };

  return {
    likedRepos,
    addLikedRepo,
    removeLikedRepo,
    isRepoLiked,
  };
} 