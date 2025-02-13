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
        <div className="animate-pulse h-screen">
          <div className="max-w-md mx-auto h-full px-4 flex items-center justify-center">
            <div className="w-full h-[80vh] bg-gray-200 rounded-lg" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <AboutDialog />
      {/* Save Button */}
      <button
        onClick={() => addLikedRepo(repositories[currentIndex])}
        className="fixed top-4 right-16 z-50 p-2 hover:opacity-80 transition-opacity"
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
      <div className="fixed bottom-8 right-8 z-50">
        <LikedReposDialog likedRepos={likedRepos} onRemove={removeLikedRepo} />
      </div>
      <SwipeContainer
        repositories={repositories}
        onSwipe={(direction) => {
          if (direction === "right") {
            // Add current repository to liked repos when swiping right
            addLikedRepo(repositories[currentIndex]);
          }
          // Update current index
          setCurrentIndex((prev) => (prev + 1) % repositories.length);
        }}
      />
    </main>
  );
}
