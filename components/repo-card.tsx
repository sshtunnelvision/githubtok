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
      <CardHeader className="space-y-2 md:space-y-3 p-4 md:p-6">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
            <Image
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s avatar`}
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg md:text-2xl font-bold truncate">
              {repo.name}
            </h2>
            <p className="text-sm md:text-base text-gray-500 truncate">
              {repo.owner.login}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 flex-grow p-4 md:p-6">
        <p className="text-base md:text-lg text-gray-700 line-clamp-4">
          {repo.description}
        </p>
        <div className="flex items-center justify-between md:justify-start md:space-x-6">
          <div className="flex items-center space-x-1 md:space-x-2">
            <StarIcon className="w-5 h-5 md:w-5 md:h-5 text-yellow-500" />
            <span className="text-base md:text-lg">
              {repo.stars.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <GitForkIcon className="w-5 h-5 md:w-5 md:h-5 text-gray-500" />
            <span className="text-base md:text-lg">
              {repo.forks.toLocaleString()}
            </span>
          </div>
          {repo.language && (
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-4 h-4 md:w-4 md:h-4 rounded-full bg-primary" />
              <span className="text-base md:text-lg">{repo.language}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 md:p-6">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 md:space-x-2 text-primary hover:underline text-base md:text-lg"
        >
          <span>View on GitHub</span>
          <ExternalLinkIcon className="w-5 h-5 md:w-5 md:h-5" />
        </a>
      </CardFooter>
    </Card>
  );
}
