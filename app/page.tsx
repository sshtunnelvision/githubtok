"use client";

import { useEffect, useState } from "react";
import { SwipeContainer } from "@/components/swipe-container";
import { Repository } from "@/types/github";
import { AboutDialog } from "@/components/about-dialog";
import { LikedReposDialog } from "@/components/liked-repos-dialog";
import { useLikedRepos } from "@/hooks/use-liked-repos";
import { HeartIcon } from "lucide-react";

async function fetchRepositories() {
  try {
    const response = await fetch("/api/repositories");
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { likedRepos, addLikedRepo, removeLikedRepo } = useLikedRepos();

  useEffect(() => {
    fetchRepositories()
      .then(setRepositories)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="h-screen flex flex-col items-center justify-center px-4">
          {/* Logo/Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            GitHubTok
          </h1>
          {/* Card Skeleton */}
          <div className="w-full md:max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-4">
            {/* Avatar and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
            {/* Stats */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
            </div>
          </div>
          {/* Loading Text */}
          <p className="text-sm text-gray-500 mt-4">
            Finding trending repositories...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16 md:pt-0">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white z-40" />

      <AboutDialog />
      {/* Save Button */}
      <button
        onClick={() => addLikedRepo(repositories[currentIndex])}
        className="fixed top-4 right-16 z-50 p-2 hover:opacity-80 transition-opacity bg-white rounded-md shadow-sm"
        aria-label="Save repository"
      >
        <HeartIcon
          className={`w-6 h-6 ${
            likedRepos.some(
              (repo) => repo.id === repositories[currentIndex]?.id
            )
              ? "text-red-500 fill-red-500"
              : "text-red-500"
          }`}
        />
      </button>
      {/* Liked Repos Dialog in bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <LikedReposDialog likedRepos={likedRepos} onRemove={removeLikedRepo} />
      </div>
      <SwipeContainer
        repositories={repositories}
        onSwipe={() => {
          // Just update the index regardless of swipe direction
          setCurrentIndex((prev) => (prev + 1) % repositories.length);
        }}
      />
    </main>
  );
}
