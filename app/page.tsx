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
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
        <div className="animate-pulse h-[calc(100vh-4rem)]">
          <div className="max-w-md mx-auto h-full px-4 flex items-center justify-center">
            <div className="w-full h-[80vh] bg-gray-200 rounded-lg" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
      <header className="hidden md:block text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">GitHubTok</h1>
        <p className="text-gray-600">
          Discover trending repositories with a swipe
        </p>
      </header>

      <SwipeContainer
        repositories={repositories}
        onSwipe={(direction) => {
          console.log(`Swiped ${direction}`);
        }}
      />
    </main>
  );
}
