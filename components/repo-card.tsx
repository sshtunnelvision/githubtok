"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StarIcon, GitForkIcon, ExternalLinkIcon } from "lucide-react";
import { Repository } from "@/types/github";
import Image from "next/image";

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="w-full h-full md:h-auto md:max-w-lg mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-3 md:space-y-3 p-5 md:p-6">
        <div className="flex items-center space-x-4 md:space-x-4">
          <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
            <Image
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s avatar`}
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 48px, 56px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl md:text-2xl font-bold truncate">
              {repo.name}
            </h2>
            <p className="text-base md:text-lg text-gray-500 truncate">
              {repo.owner.login}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 md:space-y-6 flex-grow p-5 md:p-6">
        <p className="text-lg md:text-xl text-gray-700 break-words whitespace-pre-wrap line-clamp-4">
          {repo.description}
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-3">
            <StarIcon className="w-6 h-6 text-yellow-500 shrink-0" />
            <span className="text-lg md:text-xl">
              {repo.stars.toLocaleString()} stars
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <GitForkIcon className="w-6 h-6 text-gray-500 shrink-0" />
            <span className="text-lg md:text-xl">
              {repo.forks.toLocaleString()} forks
            </span>
          </div>
          {repo.language && (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary shrink-0" />
              <span className="text-lg md:text-xl">
                Built with {repo.language}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 md:p-6">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-primary hover:underline text-lg md:text-xl"
        >
          <span>View on GitHub</span>
          <ExternalLinkIcon className="w-6 h-6 shrink-0" />
        </a>
      </CardFooter>
    </Card>
  );
}
