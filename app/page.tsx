"use client";

import { useEffect, useState } from "react";
import { SwipeContainer } from "@/components/swipe-container";
import { Repository } from "@/types/github";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRepositories()
      .then(setRepositories)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto" />
            <div className="h-4 w-64 bg-gray-200 rounded mb-8 mx-auto" />
            <div className="max-w-md mx-auto">
              <div className="h-64 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GitHubTok</h1>
          <p className="text-gray-600">
            Discover trending repositories with a swipe
          </p>
        </header>

        <SwipeContainer
          repositories={repositories}
          onSwipe={(direction) => {
            // In a real app, we might want to:
            // - Save user preferences
            // - Load more repositories
            // - Track analytics
            console.log(`Swiped ${direction}`);
          }}
        />
      </div>
    </main>
  );
}
